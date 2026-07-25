/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/test-d/delimiter-case.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DelimiterCase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OddCasedProperties<T> = {
	[K in keyof T as DelimiterCase<K, '#'>]: T[K];
};
