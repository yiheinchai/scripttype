/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/is-integer.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsFloat<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NegativeInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Not<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PositiveInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsInteger<T> =
	T extends bigint
		? true
		: T extends number
			? number extends T
				? false
				: T extends PositiveInfinity | NegativeInfinity
					? false
					: Not<IsFloat<T>>
			: false;
