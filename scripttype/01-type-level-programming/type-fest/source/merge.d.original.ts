/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/merge.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OmitIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PickIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SimpleMerge<Destination, Source> = Simplify<{
	[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
} & Source>;

export type _Merge<Destination, Source> =
	Simplify<
		SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>>
		& SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>
	>;

export type Merge<Destination, Source> =
	Destination extends unknown // For distributing `Destination`
		? Source extends unknown // For distributing `Source`
			? If<IsEqual<Destination, Source>, Destination, _Merge<Destination, Source>>
			: never // Should never happen
		: never;
