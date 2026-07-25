/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/writable.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Except<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlySet<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type WritableArray<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly [] ? []
		: ArrayType extends readonly [...infer U, infer V] ? [...U, V]
			: ArrayType extends readonly [infer U, ...infer V] ? [U, ...V]
				: ArrayType extends ReadonlyArray<infer U> ? U[]
					: ArrayType;

export type Writable<BaseType, Keys extends keyof BaseType = keyof BaseType> =
	BaseType extends ReadonlyMap<infer KeyType, infer ValueType>
		? Map<KeyType, ValueType>
		: BaseType extends ReadonlySet<infer ItemType>
			? Set<ItemType>
			: BaseType extends readonly unknown[]
				// Handle array
				? WritableArray<BaseType>
				// Handle object
				: Simplify<
					// Pick just the keys that are not writable from the base type.
					Except<BaseType, Keys>
					// Make the specified keys writable.
					& {-readonly [KeyType in keyof BaseType as KeyType extends Keys ? KeyType : never]: BaseType[KeyType]}
				>;
