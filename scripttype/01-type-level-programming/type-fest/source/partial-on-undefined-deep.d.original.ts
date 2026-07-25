/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/partial-on-undefined-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BuiltIns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type If<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LiteralKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PartialOnUndefinedDeepOptions = {
	/**
	Whether to affect the individual elements of arrays and tuples.

	@default false
	*/
	readonly recurseIntoArrays?: boolean;
};

export type PartialOnUndefinedDeepValue<T, Options extends Required<PartialOnUndefinedDeepOptions>> = T extends BuiltIns | ((...arguments_: any[]) => unknown)
	? T
	: T extends ReadonlyArray<infer U> // Test if type is array or tuple
		? Options['recurseIntoArrays'] extends true // Check if option is activated
			? U[] extends T // Check if array not tuple
				? readonly U[] extends T
					? ReadonlyArray<_PartialOnUndefinedDeep<U, Options>> // Readonly array treatment
					: Array<_PartialOnUndefinedDeep<U, Options>> // Mutable array treatment
				: _PartialOnUndefinedDeep<{[Key in keyof T]: _PartialOnUndefinedDeep<T[Key], Options>}, Options> // Tuple treatment
			: T
		: T extends Record<any, any> | undefined
			? _PartialOnUndefinedDeep<T, Options>
			: unknown;

export type _PartialOnUndefinedDeep<T, Options extends Required<PartialOnUndefinedDeepOptions>> = T extends Record<any, any> | undefined
	? {[KeyType in keyof T as undefined extends T[KeyType] ? If<IsUnknown<T[KeyType]>, never, KeyType> : never]?: PartialOnUndefinedDeepValue<T[KeyType], Options>} extends infer U // Make a partial type with all value types accepting undefined (and set them optional)
		? Merge<{[KeyType in keyof T as KeyType extends LiteralKeyOf<U> ? never : KeyType]: PartialOnUndefinedDeepValue<T[KeyType], Options>}, U> // Join all remaining keys not treated in U
		: never // Should not happen
	: T;

export type DefaultPartialOnUndefinedDeepOptions = {
	recurseIntoArrays: false;
};

export type PartialOnUndefinedDeep<T, Options extends PartialOnUndefinedDeepOptions = {}> =
	_PartialOnUndefinedDeep<T, ApplyDefaultOptions<PartialOnUndefinedDeepOptions, DefaultPartialOnUndefinedDeepOptions, Options>>;
