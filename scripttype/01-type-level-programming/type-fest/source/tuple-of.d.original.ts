/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/tuple-of.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DigitCharacter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfNotAnyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNegative<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RepeatTupleTenTimes<Tuple extends UnknownArray> = [
	...Tuple, ...Tuple, ...Tuple, ...Tuple, ...Tuple,
	...Tuple, ...Tuple, ...Tuple, ...Tuple, ...Tuple,
];

export type DigitTupleOf<Digit extends DigitCharacter, Fill> = [
	[],
	[Fill],
	[Fill, Fill],
	[Fill, Fill, Fill],
	[Fill, Fill, Fill, Fill],
	[Fill, Fill, Fill, Fill, Fill],
	[Fill, Fill, Fill, Fill, Fill, Fill],
	[Fill, Fill, Fill, Fill, Fill, Fill, Fill],
	[Fill, Fill, Fill, Fill, Fill, Fill, Fill, Fill],
	[Fill, Fill, Fill, Fill, Fill, Fill, Fill, Fill, Fill],
][Digit];

export type BuildTupleDigitByDigit<Length extends string, Fill, Accumulator extends UnknownArray = []> =
	Length extends `${infer First extends DigitCharacter}${infer Rest}`
		? BuildTupleDigitByDigit<Rest, Fill, [...RepeatTupleTenTimes<Accumulator>, ...DigitTupleOf<First, Fill>]>
		: Accumulator;

export type _TupleOf<Length extends number, Fill> = number extends Length
	? Fill[]
	: BuildTupleDigitByDigit<`${Length}`, Fill>;

export type TupleOf<Length extends number, Fill = unknown> = IfNotAnyOrNever<Length, {
	ifNot: _TupleOf<If<IsNegative<Length>, 0, Length>, Fill>;
	ifAny: Fill[];
	ifNever: [];
}>;
