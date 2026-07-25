/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/union-member.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UnionMember<T> =
	IsNever<T> extends true
		? never
		: UnionToIntersection<T extends any ? () => T : never> extends () => (infer R)
			? R
			: never;
