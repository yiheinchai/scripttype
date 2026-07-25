/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/extract-strict.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ExtractStrict<
	T,
	U extends [U] extends [
		// Ensure every member of `U` extracts something from `T`
		U extends unknown ? (Extract<T, U> extends never ? never : U) : never,
	]
		? unknown
		: never,
> = Extract<T, U>;
