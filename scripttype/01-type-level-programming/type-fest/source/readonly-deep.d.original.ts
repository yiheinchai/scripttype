/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/readonly-deep.d.ts, for comparison with the ScriptType alongside.
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
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlySet<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type _ReadonlyObjectDeep<ObjectType extends object> = {
	readonly [KeyType in keyof ObjectType]: ReadonlyDeep<ObjectType[KeyType]>
};

export type ReadonlyMapDeep<KeyType, ValueType> = {} & Readonly<ReadonlyMap<ReadonlyDeep<KeyType>, ReadonlyDeep<ValueType>>>;

export type ReadonlySetDeep<ItemType> = {} & Readonly<ReadonlySet<ReadonlyDeep<ItemType>>>;

export type ReadonlyDeep<T> = T extends BuiltIns
	? T
	: T extends new (...arguments_: any[]) => unknown
		? T // Skip class constructors
		: T extends (...arguments_: any[]) => unknown
			? {} extends _ReadonlyObjectDeep<T>
				? T
				: HasMultipleCallSignatures<T> extends true
					? T
					: ((...arguments_: Parameters<T>) => ReturnType<T>) & _ReadonlyObjectDeep<T>
			: T extends Readonly<ReadonlyMap<infer KeyType, infer ValueType>>
				? ReadonlyMapDeep<KeyType, ValueType>
				: T extends Readonly<ReadonlySet<infer ItemType>>
					? ReadonlySetDeep<ItemType>
					// Identify tuples to avoid converting them to arrays inadvertently; special case `readonly [...never[]]`, as it emerges undesirably from recursive invocations of ReadonlyDeep below.
					: T extends readonly [] | readonly [...never[]]
						? readonly []
						: T extends readonly [infer U, ...infer V]
							? readonly [ReadonlyDeep<U>, ...ReadonlyDeep<V>]
							: T extends readonly [...infer U, infer V]
								? readonly [...ReadonlyDeep<U>, ReadonlyDeep<V>]
								: T extends ReadonlyArray<infer ItemType>
									? ReadonlyArray<ReadonlyDeep<ItemType>>
									: T extends object
										? _ReadonlyObjectDeep<T>
										: unknown;
