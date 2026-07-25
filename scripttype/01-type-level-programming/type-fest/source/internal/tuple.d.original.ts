/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/internal/tuple.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type GreaterThan<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LessThan<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NegativeInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PositiveInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TupleLength<T extends UnknownArray> =
	// `extends unknown` is used to convert `T` (if `T` is a union type) to
	// a [distributive conditional type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types))
	T extends unknown
		? number extends T['length']
			? never // Return never if the given type is an non-flexed-length array like `Array<string>`
			: T['length']
		: never;

export type TupleMax<A extends number[], Result extends number = NegativeInfinity> = number extends A[number]
	? never
	: A extends [infer F extends number, ...infer R extends number[]]
		? GreaterThan<F, Result> extends true
			? TupleMax<R, F>
			: TupleMax<R, Result>
		: Result;

export type TupleMin<A extends number[], Result extends number = PositiveInfinity> = number extends A[number]
	? never
	: A extends [infer F extends number, ...infer R extends number[]]
		? LessThan<F, Result> extends true
			? TupleMin<R, F>
			: TupleMin<R, Result>
		: Result;
