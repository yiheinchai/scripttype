/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/spread.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredKeysOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
