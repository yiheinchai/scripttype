/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/entry.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type MapKey<BaseType> = BaseType extends Map<infer KeyType, unknown> ? KeyType : never;

export type MapValue<BaseType> = BaseType extends Map<unknown, infer ValueType> ? ValueType : never;

export type _ArrayEntry<BaseType extends readonly unknown[]> = [number, BaseType[number]];

export type _MapEntry<BaseType> = [MapKey<BaseType>, MapValue<BaseType>];

export type _ObjectEntry<BaseType> = [keyof BaseType, BaseType[keyof BaseType]];

export type _SetEntry<BaseType> = BaseType extends Set<infer ItemType> ? [ItemType, ItemType] : never;

export type Entry<BaseType> =
	BaseType extends Map<unknown, unknown> ? _MapEntry<BaseType>
		: BaseType extends Set<unknown> ? _SetEntry<BaseType>
			: BaseType extends readonly unknown[] ? _ArrayEntry<BaseType>
				: BaseType extends object ? _ObjectEntry<BaseType>
					: never;
