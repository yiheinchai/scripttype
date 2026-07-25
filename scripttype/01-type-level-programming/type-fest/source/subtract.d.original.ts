/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/subtract.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Absolute<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNegative<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LessThan<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NegativeInfinity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PositiveInfinity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReverseSign<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TupleOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SubtractIfAGreaterThanB<A extends number, B extends number> =
	// This is where we always want to end up and do the actual subtraction
	TupleOf<A> extends [...TupleOf<B>, ...infer R]
		? R['length']
		: never;

export type SubtractPositives<A extends number, B extends number> =
	LessThan<A, B> extends true
		// When A < B we can reverse the result of B - A
		? ReverseSign<SubtractIfAGreaterThanB<B, A>>
		: SubtractIfAGreaterThanB<A, B>;

export type SubtractPostChecks<A extends number, B extends number, AreNegative = [IsNegative<A>, IsNegative<B>]> =
	AreNegative extends [false, false]
		? SubtractPositives<A, B>
		: AreNegative extends [true, true]
			// When both numbers are negative we subtract the absolute values and then reverse the sign
			? ReverseSign<SubtractPositives<Absolute<A>, Absolute<B>>>
			// When the signs are different we can add the absolute values and then reverse the sign if A < B
			: [...TupleOf<Absolute<A>>, ...TupleOf<Absolute<B>>] extends infer R extends unknown[]
				? LessThan<A, B> extends true ? ReverseSign<R['length']> : R['length']
				: never;

export type Subtract<A extends number, B extends number> =
	// Handle cases when A or B is the actual "number" type
	number extends A | B ? number
		// Handle cases when A and B are both +/- infinity
		: A extends B & (PositiveInfinity | NegativeInfinity) ? number
			// Handle cases when A is - infinity or B is + infinity
			: A extends NegativeInfinity ? NegativeInfinity : B extends PositiveInfinity ? NegativeInfinity
				// Handle cases when A is + infinity or B is - infinity
				: A extends PositiveInfinity ? PositiveInfinity : B extends NegativeInfinity ? PositiveInfinity
					// Handle case when numbers are equal to each other
					: A extends B ? 0
						// Handle cases when A or B is 0
						: A extends 0 ? ReverseSign<B> : B extends 0 ? A
							// Handle remaining regular cases
							: SubtractPostChecks<A, B>;
