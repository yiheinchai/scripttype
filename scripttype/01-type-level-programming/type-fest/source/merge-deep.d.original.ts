/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/merge-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EnforceOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FirstArrayElement<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsBothExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonEmptyTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OmitIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PickIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SimplifyDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArrayOrTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _ArrayTail<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Writable<TArray extends UnknownArray> = {-readonly [Key in keyof TArray]: TArray[Key]};

export type ArrayTail<TArray extends UnknownArray> = TArray extends unknown // For distributing `TArray`
	? keyof TArray & `${number}` extends never
		? []
		: Writable<_ArrayTail<TArray>>
	: never;

export type SimplifyDeepExcludeArray<T> = SimplifyDeep<T, UnknownArray>;

export type ArrayMergeMode = 'spread' | 'replace';

export type MergeDeepOptions = {
	/**
	Merge mode for array and tuple.

	When we walk through the properties of the objects and the same key is found and both are array or tuple, a merge mode must be chosen:
	- `replace`: Replaces the destination value by the source value. This is the default mode.
	- `spread`: Spreads the destination and the source values.

	See {@link MergeDeep} for usages and examples.

	Note: Top-level arrays and tuples are always spread.

	@default 'replace'
	*/
	arrayMergeMode?: ArrayMergeMode;

	/**
	Whether to affect the individual elements of arrays and tuples.

	If this option is set to `true` the following rules are applied:
	- If the source does not contain the key, the value of the destination is returned.
	- If the source contains the key and the destination does not contain the key, the value of the source is returned.
	- If both contain the key, try to merge according to the chosen {@link MergeDeepOptions.arrayMergeMode arrayMergeMode} or return the source if unable to merge.

	@default false
	*/
	recurseIntoArrays?: boolean;
};

export type MergeDeepInternalOptions = Merge<MergeDeepOptions, {spreadTopLevelArrays?: boolean}>;

export type DoMergeDeepRecord<
	Destination extends UnknownRecord,
	Source extends UnknownRecord,
	Options extends MergeDeepInternalOptions,
> =
// Case in rule 1: The destination contains the key but the source doesn't.
	{
		[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
	}
// Case in rule 2: The source contains the key but the destination doesn't.
	& {
		[Key in keyof Source as Key extends keyof Destination ? never : Key]: Source[Key];
	}
// Case in rule 3: Both the source and the destination contain the key.
	& {
		[Key in keyof Source as Key extends keyof Destination ? Key : never]: MergeDeepRecordProperty<Required<Destination>[Key], Required<Source>[Key], Options>;
	};

export type MergeDeepRecord<
	Destination extends UnknownRecord,
	Source extends UnknownRecord,
	Options extends MergeDeepInternalOptions,
> = DoMergeDeepRecord<OmitIndexSignature<Destination>, OmitIndexSignature<Source>, Options>
	& Merge<PickIndexSignature<Destination>, PickIndexSignature<Source>>;

export type MergeDeepArrayOrTupleElements<
	Destination,
	Source,
	Options extends MergeDeepInternalOptions,
> = Source extends []
	? Destination
	: Destination extends []
		? Source
		: MergeDeepOrReturn<Source, Destination, Source, Options>;

export type MergeArrayTypeAndTuple<
	ArrayType,
	Tuple extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = Tuple extends []
	? Tuple
	: [
		MergeDeepArrayOrTupleElements<ArrayType, FirstArrayElement<Tuple>, Options>,
		...MergeArrayTypeAndTuple<ArrayType, ArrayTail<Tuple>, Options>,
	];

export type MergeTupleAndArrayType<
	Tuple extends UnknownArrayOrTuple,
	ArrayType,
	Options extends MergeDeepInternalOptions,
> = Tuple extends []
	? Tuple
	: [
		MergeDeepArrayOrTupleElements<FirstArrayElement<Tuple>, ArrayType, Options>,
		...MergeTupleAndArrayType<ArrayTail<Tuple>, ArrayType, Options>,
	];

export type DoMergeDeepTupleAndTupleRecursive<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	DestinationRestType,
	SourceRestType,
	Options extends MergeDeepInternalOptions,
> = Destination extends []
	? Source extends []
		? []
		: MergeArrayTypeAndTuple<DestinationRestType, Source, Options>
	: Source extends []
		? MergeTupleAndArrayType<Destination, SourceRestType, Options>
		: [
			MergeDeepArrayOrTupleElements<FirstArrayElement<Destination>, FirstArrayElement<Source>, Options>,
			...DoMergeDeepTupleAndTupleRecursive<ArrayTail<Destination>, ArrayTail<Source>, DestinationRestType, SourceRestType, Options>,
		];

export type OmitRestTypeHelper<
	Tail extends UnknownArrayOrTuple,
	Type extends UnknownArrayOrTuple,
	Result extends UnknownArrayOrTuple = [],
> = Tail extends []
	? Result
	: OmitRestType<Tail, [...Result, FirstArrayElement<Type>]>;

export type OmitRestType<Type extends UnknownArrayOrTuple, Result extends UnknownArrayOrTuple = []> = number extends Type['length']
	? OmitRestTypeHelper<ArrayTail<Type>, Type, Result>
	: Type;

export type TypeNumberOrType<Type extends UnknownArrayOrTuple> = Type[number] extends never ? Type : Type[number];

export type PickRestTypeHelper<Tail extends UnknownArrayOrTuple, Type> = Tail extends [] ? Type : PickRestType<Tail>;

export type PickRestType<Type extends UnknownArrayOrTuple> = number extends Type['length']
	? PickRestTypeHelper<ArrayTail<Type>, Type>
	: [];

export type PickRestTypeFlat<Type extends UnknownArrayOrTuple> = TypeNumberOrType<PickRestType<Type>>;

export type MergeDeepTupleAndTupleRecursive<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = [
	...DoMergeDeepTupleAndTupleRecursive<OmitRestType<Destination>, OmitRestType<Source>, PickRestTypeFlat<Destination>, PickRestTypeFlat<Source>, Options>,
	...MergeDeepArrayOrTupleElements<PickRestType<Destination>, PickRestType<Source>, Options>,
];

export type MergeDeepTupleAndArrayRecursive<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = [
	...MergeTupleAndArrayType<OmitRestType<Destination>, Source[number], Options>,
	...MergeDeepArrayOrTupleElements<PickRestType<Destination>, PickRestType<Source>, Options>,
];

export type MergeDeepArrayAndTupleRecursive<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = [
	...MergeArrayTypeAndTuple<Destination[number], OmitRestType<Source>, Options>,
	...MergeDeepArrayOrTupleElements<PickRestType<Destination>, PickRestType<Source>, Options>,
];

export type ShouldSpread<Options extends MergeDeepInternalOptions> = Options['spreadTopLevelArrays'] extends false
	? Options['arrayMergeMode'] extends 'spread' ? true : false
	: true;

export type DoMergeArrayOrTuple<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = ShouldSpread<Options> extends true
	? Array<Exclude<Destination, undefined>[number] | Exclude<Source, undefined>[number]>
	: Source;

export type MergeDeepArrayRecursive<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = Destination[number] extends UnknownArrayOrTuple
	? Source[number] extends UnknownArrayOrTuple
		? Array<MergeDeepArrayOrTupleRecursive<Destination[number], Source[number], Options>>
		: DoMergeArrayOrTuple<Destination, Source, Options>
	: Destination[number] extends UnknownRecord
		? Source[number] extends UnknownRecord
			? Array<SimplifyDeepExcludeArray<MergeDeepRecord<Destination[number], Source[number], Options>>>
			: DoMergeArrayOrTuple<Destination, Source, Options>
		: DoMergeArrayOrTuple<Destination, Source, Options>;

export type MergeDeepArrayOrTupleRecursive<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = IsBothExtends<NonEmptyTuple, Destination, Source> extends true
	? MergeDeepTupleAndTupleRecursive<Destination, Source, Options>
	: Destination extends NonEmptyTuple
		? MergeDeepTupleAndArrayRecursive<Destination, Source, Options>
		: Source extends NonEmptyTuple
			? MergeDeepArrayAndTupleRecursive<Destination, Source, Options>
			: MergeDeepArrayRecursive<Destination, Source, Options>;

export type MergeDeepArrayOrTuple<
	Destination extends UnknownArrayOrTuple,
	Source extends UnknownArrayOrTuple,
	Options extends MergeDeepInternalOptions,
> = Options['recurseIntoArrays'] extends true
	? MergeDeepArrayOrTupleRecursive<Destination, Source, Options>
	: DoMergeArrayOrTuple<Destination, Source, Options>;

export type MergeDeepOrReturn<
	DefaultType,
	Destination,
	Source,
	Options extends MergeDeepInternalOptions,
> = SimplifyDeepExcludeArray<[undefined] extends [Destination | Source]
	? DefaultType
	: Destination extends UnknownRecord
		? Source extends UnknownRecord
			? MergeDeepRecord<Destination, Source, Options>
			: DefaultType
		: Destination extends UnknownArrayOrTuple
			? Source extends UnknownArrayOrTuple
				? MergeDeepArrayOrTuple<Destination, Source, EnforceOptional<Merge<Options, {spreadTopLevelArrays: false}>>>
				: DefaultType
			: DefaultType>;

export type MergeDeepRecordProperty<
	Destination,
	Source,
	Options extends MergeDeepInternalOptions,
> = undefined extends Source
	? MergeDeepOrReturn<Source, Exclude<Destination, undefined>, Exclude<Source, undefined>, Options> | (undefined extends Destination ? undefined : never)
	: MergeDeepOrReturn<Source, Destination, Source, Options>;

export type DefaultMergeDeepOptions<Options extends MergeDeepOptions> = Merge<{
	arrayMergeMode: 'replace';
	recurseIntoArrays: false;
	spreadTopLevelArrays: true;
}, Options>;

export type MergeDeepWithDefaultOptions<Destination, Source, Options extends MergeDeepOptions> = SimplifyDeepExcludeArray<
	[undefined] extends [Destination | Source]
		? never
		: Destination extends UnknownRecord
			? Source extends UnknownRecord
				? MergeDeepRecord<Destination, Source, DefaultMergeDeepOptions<Options>>
				: never
			: Destination extends UnknownArrayOrTuple
				? Source extends UnknownArrayOrTuple
					? MergeDeepArrayOrTuple<Destination, Source, DefaultMergeDeepOptions<Options>>
					: never
				: never
>;

export type MergeDeep<Destination, Source, Options extends MergeDeepOptions = {}> = MergeDeepWithDefaultOptions<
	SimplifyDeepExcludeArray<Destination>,
	SimplifyDeepExcludeArray<Source>,
	Options
>;
