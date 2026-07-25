/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/less-than-or-equal.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type GreaterThan<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type LessThanOrEqual<A extends number, B extends number> =
	GreaterThan<A, B> extends infer Result
		? Result extends true
			? false
			: true
		: never;
