/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/greater-than.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Absolute<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type And<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNegative<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NegativeInfinity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Or<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PositiveInfinity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PositiveNumericStringGt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type GreaterThan<A extends number, B extends number> =
	A extends number // For distributing `A`
		? B extends number // For distributing `B`
			? number extends A | B
				? boolean
				: [
					IsEqual<A, PositiveInfinity>, IsEqual<A, NegativeInfinity>,
					IsEqual<B, PositiveInfinity>, IsEqual<B, NegativeInfinity>,
				] extends infer R extends [boolean, boolean, boolean, boolean]
					? Or<
						And<IsEqual<R[0], true>, IsEqual<R[2], false>>,
						And<IsEqual<R[3], true>, IsEqual<R[1], false>>
					> extends true
						? true
						: Or<
							And<IsEqual<R[1], true>, IsEqual<R[3], false>>,
							And<IsEqual<R[2], true>, IsEqual<R[0], false>>
						> extends true
							? false
							: true extends R[number]
								? false
								: [IsNegative<A>, IsNegative<B>] extends infer R extends [boolean, boolean]
									? [true, false] extends R
										? false
										: [false, true] extends R
											? true
											: [false, false] extends R
												? PositiveNumericStringGt<`${A}`, `${B}`>
												: PositiveNumericStringGt<`${Absolute<B>}`, `${Absolute<A>}`>
									: never
					: never
			: never // Should never happen
		: never;
