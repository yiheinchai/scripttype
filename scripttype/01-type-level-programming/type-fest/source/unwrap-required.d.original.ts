/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/unwrap-required.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MapsSetsOrArrays<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _UnwrapRequired<RequiredObjectType> =
	RequiredObjectType extends Required<infer ObjectType>
		? ObjectType
		: RequiredObjectType;

export type UnwrapRequired<RequiredObjectType> =
	RequiredObjectType extends NonRecursiveType | MapsSetsOrArrays
		? RequiredObjectType
		: _UnwrapRequired<RequiredObjectType>;
