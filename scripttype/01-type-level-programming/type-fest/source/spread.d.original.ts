/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/spread.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequiredKeysOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SpreadObject<FirstType extends object, SecondType extends object> = {
	[Key in keyof FirstType]: Key extends keyof SecondType
		? FirstType[Key] | Required<SecondType>[Key]
		: FirstType[Key];
} & Pick<
	SecondType,
RequiredKeysOf<SecondType> | Exclude<keyof SecondType, keyof FirstType>
>;

export type TupleOrArray = readonly [...unknown[]];

export type SpreadTupleOrArray<
	FirstType extends TupleOrArray,
	SecondType extends TupleOrArray,
> = Array<FirstType[number] | SecondType[number]>;

export type Spreadable = object | TupleOrArray;

export type Spread<
	FirstType extends Spreadable,
	SecondType extends Spreadable,
> = FirstType extends TupleOrArray
	? SecondType extends TupleOrArray
		? SpreadTupleOrArray<FirstType, SecondType>
		: Simplify<SpreadObject<FirstType, SecondType>>
	: Simplify<SpreadObject<FirstType, SecondType>>;
