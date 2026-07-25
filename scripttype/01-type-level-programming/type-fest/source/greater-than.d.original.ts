/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/greater-than.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Absolute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type And<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNegative<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NegativeInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Or<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PositiveInfinity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PositiveNumericStringGt<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
