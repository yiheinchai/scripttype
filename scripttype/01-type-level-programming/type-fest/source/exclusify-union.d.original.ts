/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/exclusify-union.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IfNotAnyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KeysOfUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapsSetsOrArrays<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _ExclusifyUnion<Union, UnionCopy = Union> = Union extends unknown // For distributing `Union`
	? Simplify<
		Union & Partial<
			Record<
				Exclude<KeysOfUnion<UnionCopy>, keyof Union>,
				never
			>
		>
	>
	: never;

export type ExclusifyUnion<Union> = IfNotAnyOrNever<Union, {
	ifNot: If<IsUnknown<Union>, Union,
		Extract<Union, NonRecursiveType | MapsSetsOrArrays> extends infer SkippedMembers
			? SkippedMembers | _ExclusifyUnion<Exclude<Union, SkippedMembers>>
			: never
	>;
}>;
