/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/required-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HasMultipleCallSignatures<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RequiredObjectDeep<ObjectType extends object> = {
	[KeyType in keyof ObjectType]-?: RequiredDeep<ObjectType[KeyType]>
};

export type RequiredDeep<T> = T extends BuiltIns
	? T
	: T extends Map<infer KeyType, infer ValueType>
		? Map<RequiredDeep<KeyType>, RequiredDeep<ValueType>>
		: T extends Set<infer ItemType>
			? Set<RequiredDeep<ItemType>>
			: T extends ReadonlyMap<infer KeyType, infer ValueType>
				? ReadonlyMap<RequiredDeep<KeyType>, RequiredDeep<ValueType>>
				: T extends ReadonlySet<infer ItemType>
					? ReadonlySet<RequiredDeep<ItemType>>
					: T extends WeakMap<infer KeyType, infer ValueType>
						? WeakMap<RequiredDeep<KeyType>, RequiredDeep<ValueType>>
						: T extends WeakSet<infer ItemType>
							? WeakSet<RequiredDeep<ItemType>>
							: T extends Promise<infer ValueType>
								? Promise<RequiredDeep<ValueType>>
								: T extends (...arguments_: any[]) => unknown
									? IsNever<keyof T> extends true
										? T
										: HasMultipleCallSignatures<T> extends true
											? T
											: ((...arguments_: Parameters<T>) => ReturnType<T>) & RequiredObjectDeep<T>
									: T extends object
										? Simplify<RequiredObjectDeep<T>> // `Simplify` to prevent `RequiredObjectDeep` from appearing in the resulting type
										: unknown;
