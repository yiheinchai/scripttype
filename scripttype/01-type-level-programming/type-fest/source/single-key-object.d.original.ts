/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/single-key-object.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEmptyObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SingleKeyObject<ObjectType> =
	IsUnion<keyof ObjectType> extends true
		? never
		: If<IsEmptyObject<ObjectType>, never, ObjectType>;
