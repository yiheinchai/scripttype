/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/array-splice.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type GreaterThanOrEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StaticPartOfArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Subtract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TupleOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type VariablePartOfArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SplitFixedArrayByIndex<T extends UnknownArray, SplitIndex extends number> =
	SplitIndex extends 0
		? [[], T]
		: T extends readonly [...TupleOf<SplitIndex>, ...infer V]
			? T extends readonly [...infer U, ...V]
				? [U, V]
				: [never, never]
			: [never, never];

export type SplitVariableArrayByIndex<T extends UnknownArray,
	SplitIndex extends number,
	T1 = Subtract<SplitIndex, StaticPartOfArray<T>['length']>,
	T2 = T1 extends number
		? TupleOf<GreaterThanOrEqual<T1, 0> extends true ? T1 : number, VariablePartOfArray<T>[number]>
		: [],
> =
	SplitIndex extends 0
		? [[], T]
		: GreaterThanOrEqual<StaticPartOfArray<T>['length'], SplitIndex> extends true
			? [
				SplitFixedArrayByIndex<StaticPartOfArray<T>, SplitIndex>[0],
				[
					...SplitFixedArrayByIndex<StaticPartOfArray<T>, SplitIndex>[1],
					...VariablePartOfArray<T>,
				],
			]
			: [
				[
					...StaticPartOfArray<T>,
					...(T2 extends UnknownArray ? T2 : []),
				],
				VariablePartOfArray<T>,
			];

export type SplitArrayByIndex<T extends UnknownArray, SplitIndex extends number> =
	SplitIndex extends 0
		? [[], T]
		: number extends T['length']
			? SplitVariableArrayByIndex<T, SplitIndex>
			: SplitFixedArrayByIndex<T, SplitIndex>;

export type ArraySplice<
	T extends UnknownArray,
	Start extends number,
	DeleteCount extends number,
	Items extends UnknownArray = [],
> =
	SplitArrayByIndex<T, Start> extends [infer U extends UnknownArray, infer V extends UnknownArray]
		? SplitArrayByIndex<V, DeleteCount> extends [infer _Deleted extends UnknownArray, infer X extends UnknownArray]
			? [...U, ...Items, ...X]
			: never // Should never happen
		: never;
