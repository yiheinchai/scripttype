/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/writable.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Except<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
