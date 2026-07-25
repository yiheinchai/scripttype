/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/writable-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIns<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HasMultipleCallSignatures<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Parameters<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlySet<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type _WritableObjectDeep<ObjectType extends object> = {
	-readonly [KeyType in keyof ObjectType]: WritableDeep<ObjectType[KeyType]>
};

export type WritableMapDeep<MapType extends ReadonlyMap<unknown, unknown>> =
	MapType extends ReadonlyMap<infer KeyType, infer ValueType>
		? Map<WritableDeep<KeyType>, WritableDeep<ValueType>>
		: MapType;

export type WritableSetDeep<SetType extends ReadonlySet<unknown>> =
	SetType extends ReadonlySet<infer ItemType>
		? Set<WritableDeep<ItemType>>
		: SetType;

export type WritableArrayDeep<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly [] ? []
		: ArrayType extends readonly [...infer U, infer V] ? [...WritableArrayDeep<U>, WritableDeep<V>]
			: ArrayType extends readonly [infer U, ...infer V] ? [WritableDeep<U>, ...WritableArrayDeep<V>]
				: ArrayType extends ReadonlyArray<infer U> ? Array<WritableDeep<U>>
					: ArrayType extends Array<infer U> ? Array<WritableDeep<U>>
						: ArrayType;

export type WritableDeep<T> = T extends BuiltIns
	? T
	: T extends (...arguments_: any[]) => unknown
		? {} extends _WritableObjectDeep<T>
			? T
			: HasMultipleCallSignatures<T> extends true
				? T
				: ((...arguments_: Parameters<T>) => ReturnType<T>) & _WritableObjectDeep<T>
		: T extends ReadonlyMap<unknown, unknown>
			? WritableMapDeep<T>
			: T extends ReadonlySet<unknown>
				? WritableSetDeep<T>
				: T extends readonly unknown[]
					? WritableArrayDeep<T>
					: T extends object
						? _WritableObjectDeep<T>
						: unknown;
