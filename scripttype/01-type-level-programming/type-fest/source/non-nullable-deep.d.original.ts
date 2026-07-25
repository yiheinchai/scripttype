/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/non-nullable-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HasMultipleCallSignatures<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NonNullableDeep<T> =
	T extends BuiltIns | (new (...arguments_: any[]) => unknown)
		? Exclude<T, null | undefined> // `Exclude` is used instead of `NonNullable` because `NonNullable<void>` results in `void & {}`.
		: T extends Map<infer KeyType, infer ValueType>
			? Map<NonNullableDeep<KeyType>, NonNullableDeep<ValueType>>
			: T extends Set<infer ItemType>
				? Set<NonNullableDeep<ItemType>>
				: T extends ReadonlyMap<infer KeyType, infer ValueType>
					? ReadonlyMap<NonNullableDeep<KeyType>, NonNullableDeep<ValueType>>
					: T extends ReadonlySet<infer ItemType>
						? ReadonlySet<NonNullableDeep<ItemType>>
						: T extends WeakMap<infer KeyType, infer ValueType>
							? WeakMap<NonNullableDeep<KeyType>, NonNullableDeep<ValueType>>
							: T extends WeakSet<infer ItemType>
								? WeakSet<NonNullableDeep<ItemType>>
								: T extends Promise<infer ValueType>
									? Promise<NonNullableDeep<ValueType>>
									: T extends (...arguments_: any[]) => unknown
										? HasMultipleCallSignatures<T> extends true
											? T
											: ((...arguments_: NonNullableDeep<Parameters<T>>) => NonNullableDeep<ReturnType<T>>)
												& (IsNever<keyof T> extends true
													? unknown
													: NonNullableDeep<Simplify<T>>) // `Simplify` removes the call signature
										: T extends object
											? {[P in keyof T]: NonNullableDeep<T[P]>}
											: unknown;
