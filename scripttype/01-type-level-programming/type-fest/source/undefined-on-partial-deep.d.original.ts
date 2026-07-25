/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/undefined-on-partial-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UndefinedOnPartialList<T extends readonly unknown[]> = T extends []
	? []
	: T extends [infer F, ...infer R]
		? [UndefinedOnPartialDeep<F>, ...UndefinedOnPartialDeep<R>]
		: T extends readonly [infer F, ...infer R]
			? readonly [UndefinedOnPartialDeep<F>, ...UndefinedOnPartialDeep<R>]
			: T extends Array<infer F>
				? Array<UndefinedOnPartialDeep<F>>
				: T extends ReadonlyArray<infer F>
					? ReadonlyArray<UndefinedOnPartialDeep<F>>
					: never;

export type UndefinedOnPartialDeep<T> =
	// Handle built-in type and function
	T extends BuiltIns | Function
		? T
		// Handle tuple and array
		: T extends readonly unknown[]
			? UndefinedOnPartialList<T>
			// Handle map and readonly map
			: T extends Map<infer K, infer V>
				? Map<K, UndefinedOnPartialDeep<V>>
				: T extends ReadonlyMap<infer K, infer V>
					? ReadonlyMap<K, UndefinedOnPartialDeep<V>>
					// Handle set and readonly set
					: T extends Set<infer K>
						? Set<UndefinedOnPartialDeep<K>>
						: T extends ReadonlySet<infer K>
							? ReadonlySet<UndefinedOnPartialDeep<K>>
							// Handle object
							: T extends Record<any, any>
								? {
									[KeyType in keyof T]: undefined extends T[KeyType]
										? UndefinedOnPartialDeep<T[KeyType]> | undefined
										: UndefinedOnPartialDeep<T[KeyType]>
								}
								: T;
