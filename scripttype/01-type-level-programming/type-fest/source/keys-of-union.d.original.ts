/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/keys-of-union.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type KeysOfUnion<ObjectType> =
	// Hack to fix https://github.com/sindresorhus/type-fest/issues/1008
	keyof UnionToIntersection<ObjectType extends unknown ? Record<keyof ObjectType, never> : never>;
