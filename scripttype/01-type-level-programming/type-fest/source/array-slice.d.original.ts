/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/array-slice.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ArraySplice<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GreaterThan<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GreaterThanOrEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNegative<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LessThanOrEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Not<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Sum<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TupleMin<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ArraySliceByPositiveIndex<
	Array_ extends readonly unknown[],
	Start extends number,
	End extends number,
	Result extends Array<Array_[number]> = [],
> = Start extends End
	? Result
	: ArraySliceByPositiveIndex<Array_, Sum<Start, 1>, End, [...Result, Array_[Start]]>;

export type VariableLengthArraySliceHelper<
	Array_ extends readonly unknown[],
	Start extends number,
	End extends number,
> = And<Not<IsNegative<Start>>, IsEqual<End, never>> extends true
	? ArraySplice<Array_, 0, Start>
	: And<
		And<Not<IsNegative<Start>>, Not<IsNegative<End>>>,
		IsEqual<GreaterThan<End, Start>, true>
	> extends true
		? ArraySliceByPositiveIndex<Array_, Start, End>
		: [];

export type ArraySliceHelper<
	Array_ extends readonly unknown[],
	Start extends number = 0,
	End extends number = Array_['length'],
	TraversedElement extends Array<Array_[number]> = [],
	Result extends Array<Array_[number]> = [],
	ArrayLength extends number = Array_['length'],
	PositiveS extends number = IsNegative<Start> extends true
		? Sum<ArrayLength, Start> extends infer AddResult extends number
			? number extends AddResult // (ArrayLength + Start) < 0
				? 0
				: GreaterThan<AddResult, 0> extends true ? AddResult : 0
			: never
		: Start,
	PositiveE extends number = IsNegative<End> extends true ? Sum<ArrayLength, End> : End,
> = true extends [IsNegative<PositiveS>, LessThanOrEqual<PositiveE, PositiveS>, GreaterThanOrEqual<PositiveS, ArrayLength>][number]
	? []
	: ArraySliceByPositiveIndex<Array_, TupleMin<[PositiveS, ArrayLength]>, TupleMin<[PositiveE, ArrayLength]>>;

export type _ArraySlice<
	Array_ extends readonly unknown[],
	Start extends number = 0,
	End extends number = Array_['length'],
> = And<IsEqual<Start, never>, IsEqual<End, never>> extends true
	? Array_
	: number extends Array_['length']
		? VariableLengthArraySliceHelper<Array_, Start, End>
		: ArraySliceHelper<Array_, IsEqual<Start, never> extends true ? 0 : Start, IsEqual<End, never> extends true ? Array_['length'] : End>;

export type ArraySlice<
	Array_ extends readonly unknown[],
	Start extends number = never,
	End extends number = never,
> = Array_ extends unknown // To distributive type
	? IsNever<Start> extends true
		? IsNever<End> extends true
			? _ArraySlice<Array_, Start, End>
			: End extends unknown // To distribute `End`
				? _ArraySlice<Array_, Start, End>
				: never // Never happens
		: IsNever<End> extends true
			? Start extends unknown // To distribute `Start`
				? _ArraySlice<Array_, Start, End>
				: never // Never happens
			: Start extends unknown // To distribute `Start`
				? End extends unknown // To distribute `End`
					? _ArraySlice<Array_, Start, End>
					: never // Never happens
				: never // Never happens
	: never;
