/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/partial-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BuiltIns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HasMultipleCallSignatures<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PartialDeepOptions = {
	/**
	Whether to affect the individual elements of arrays and tuples.

	@default false
	*/
	readonly recurseIntoArrays?: boolean;

	/**
	Allows `undefined` values in non-tuple arrays.

	- When set to `true`, elements of non-tuple arrays can be `undefined`.
	- When set to `false`, only explicitly defined elements are allowed in non-tuple arrays, ensuring stricter type checking.

	@default false

	@example
	You can allow `undefined` values in non-tuple arrays by passing `{recurseIntoArrays: true; allowUndefinedInNonTupleArrays: true}` as the second type argument:

	```
	import type {PartialDeep} from 'type-fest';

	type Settings = {
		languages: string[];
	};

	declare const partialSettings: PartialDeep<Settings, {recurseIntoArrays: true; allowUndefinedInNonTupleArrays: true}>;

	partialSettings.languages = [undefined]; // OK
	```
	*/
	readonly allowUndefinedInNonTupleArrays?: boolean;
};

export type PartialMapDeep<KeyType, ValueType, Options extends Required<PartialDeepOptions>> = {} & Map<_PartialDeep<KeyType, Options>, _PartialDeep<ValueType, Options>>;

export type PartialSetDeep<T, Options extends Required<PartialDeepOptions>> = {} & Set<_PartialDeep<T, Options>>;

export type PartialReadonlyMapDeep<KeyType, ValueType, Options extends Required<PartialDeepOptions>> = {} & ReadonlyMap<_PartialDeep<KeyType, Options>, _PartialDeep<ValueType, Options>>;

export type PartialReadonlySetDeep<T, Options extends Required<PartialDeepOptions>> = {} & ReadonlySet<_PartialDeep<T, Options>>;

export type PartialObjectDeep<ObjectType extends object, Options extends Required<PartialDeepOptions>> = {
	[KeyType in keyof ObjectType]?: _PartialDeep<ObjectType[KeyType], Options>
};

export type _PartialDeep<T, Options extends Required<PartialDeepOptions>> = T extends BuiltIns | ((new (...arguments_: any[]) => unknown))
	? T
	: T extends Map<infer KeyType, infer ValueType>
		? PartialMapDeep<KeyType, ValueType, Options>
		: T extends Set<infer ItemType>
			? PartialSetDeep<ItemType, Options>
			: T extends ReadonlyMap<infer KeyType, infer ValueType>
				? PartialReadonlyMapDeep<KeyType, ValueType, Options>
				: T extends ReadonlySet<infer ItemType>
					? PartialReadonlySetDeep<ItemType, Options>
					: T extends (...arguments_: any[]) => unknown
						? IsNever<keyof T> extends true
							? T // For functions with no properties
							: HasMultipleCallSignatures<T> extends true
								? T
								: ((...arguments_: Parameters<T>) => ReturnType<T>) & PartialObjectDeep<T, Options>
						: T extends object
							? T extends ReadonlyArray<infer ItemType> // Test for arrays/tuples, per https://github.com/microsoft/TypeScript/issues/35156
								? Options['recurseIntoArrays'] extends true
									? ItemType[] extends T // Test for arrays (non-tuples) specifically
										? readonly ItemType[] extends T // Differentiate readonly and mutable arrays
											? ReadonlyArray<_PartialDeep<Options['allowUndefinedInNonTupleArrays'] extends false ? ItemType : ItemType | undefined, Options>>
											: Array<_PartialDeep<Options['allowUndefinedInNonTupleArrays'] extends false ? ItemType : ItemType | undefined, Options>>
										: PartialObjectDeep<T, Options> // Tuples behave properly
									: T // If they don't opt into array testing, just use the original type
								: PartialObjectDeep<T, Options>
							: unknown;

export type DefaultPartialDeepOptions = {
	recurseIntoArrays: false;
	allowUndefinedInNonTupleArrays: false;
};

export type PartialDeep<T, Options extends PartialDeepOptions = {}> =
	_PartialDeep<T, ApplyDefaultOptions<PartialDeepOptions, DefaultPartialDeepOptions, Options>>;
