/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/object-merge.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsExactOptionalPropertyTypesEnabled<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsOptionalKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapsSetsOrArrays<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NormalizedKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OmitIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PickIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredKeysOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _ObjectMerge<
	First extends object,
	Second extends object,
	NormalizedFirstLiteralKeys extends PropertyKey,
	NormalizedSecondLiteralKeys extends PropertyKey,
	NormalizedFirst extends object,
	NormalizedSecond extends object,
> = Simplify<{
	// Map over literal keys of `Second`, except those that are optional and also present in `First`.
	-readonly [P in keyof Second as P extends NormalizedSecondLiteralKeys
		? P extends NormalizedFirstLiteralKeys
			? If<IsOptionalKeyOf<Second, P>, never, P>
			: P
		: never]:
			| Second[P]
			| (P extends NormalizedKeys<keyof PickIndexSignature<First>>
				? If<IsOptionalKeyOf<Second, P>, First[NormalizedKeys<P> & keyof First], never>
				: never)
} & {
	// Map over literal keys of `First`, except those that are not present in `Second`.
	-readonly [P in keyof First as P extends NormalizedFirstLiteralKeys
		? P extends NormalizedSecondLiteralKeys
			? never
			: P
		: never]:
			| First[P]
				// If there's a matching index signature in `Second`, then add the type for it as well,
				// for example, in `ObjectMerge<{a: string}, {[x: string]: number}>`, `a` is of type `string | number`.
			| (P extends NormalizedKeys<keyof Second>
				? Second[NormalizedKeys<P> & keyof Second]
				: never);
} & {
	// Map over non-literal keys of `Second`.
	-readonly [P in keyof Second as P extends NormalizedSecondLiteralKeys ? never : P]:
		| Second[P]
			// If there's a matching key in `First`, then add the type for it as well,
			// for example, in `ObjectMerge<{a: number}, {[x: string]: string}>`,
			// the resulting type is `{[x: string]: number | string; a: number | string}`.
			// But, exclude keys from `First` that would surely get overwritten,
			// for example, in `ObjectMerge<{a: number}, {[x: string]: string; a: string}>`,
			// `a` from `First` would get overwritten by `a` from `Second`, so don't add type for it.
		| (NormalizedKeys<P> & Exclude<keyof First, NormalizedKeys<RequiredKeysOf<OmitIndexSignature<Second>>>> extends infer NonOverwrittenKeysOfFirst
			? If<IsNever<NonOverwrittenKeysOfFirst>, // This check is required because indexing with `never` doesn't always yield `never`, for example, `{[x: string]: number}[never]` results in `number`.
				never,
				NormalizedFirst[NonOverwrittenKeysOfFirst & keyof NormalizedFirst]>
			: never); // Should never happen
} & {
	// Map over non-literal keys of `First`.
	-readonly [P in keyof First as P extends NormalizedFirstLiteralKeys ? never : P]:
		| First[P]
		| If<IsNever<NormalizedKeys<P> & keyof Second>, // This check is required because indexing with `never` doesn't always yield `never`, for example, `{[x: string]: number}[never]` results in `number`.
			never,
			NormalizedSecond[NormalizedKeys<P> & keyof NormalizedSecond]>;
} & {
	// Handle optional keys of `Second` that are also present in `First`.
	// Map over `First` instead of `Second` because the modifier is in accordance with `First`.
	-readonly [P in keyof First as P extends NormalizedFirstLiteralKeys
		? P extends NormalizedSecondLiteralKeys
			? If<IsOptionalKeyOf<Second, NormalizedKeys<P> & keyof Second>, P, never>
			: never
		: never]:
			| First[P]
			| NormalizedSecond[NormalizedKeys<P> & keyof NormalizedSecond]
}>;

export type NormalizedLiteralKeys<Type> = Type extends unknown // For distributing `Type`
	? NormalizedKeys<keyof OmitIndexSignature<Type>>
	: never;

export type ObjectMerge<First extends object, Second extends object> =
	IfNotAnyOrNever<First, {
		ifNot: IfNotAnyOrNever<Second, {
			ifNot: First extends unknown // For distributing `First`
				? Second extends unknown // For distributing `Second`
					? First extends MapsSetsOrArrays
						? unknown
						: Second extends MapsSetsOrArrays
							? unknown
							: _ObjectMerge<
								First,
								Second,
								NormalizedLiteralKeys<First>,
								NormalizedLiteralKeys<Second>,
								IsExactOptionalPropertyTypesEnabled extends true ? Required<First> : First,
								IsExactOptionalPropertyTypesEnabled extends true ? Required<Second> : Second
							>
					: never // Should never happen
				: never; // Should never happen
		}>;
		ifAny: First & Second;
	}>;
