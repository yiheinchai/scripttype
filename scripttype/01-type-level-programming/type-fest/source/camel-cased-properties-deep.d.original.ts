/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/camel-cased-properties-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CamelCase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CamelCaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonRecursiveType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _DefaultCamelCaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CamelCasedPropertiesArrayDeep<
	Value extends UnknownArray,
	Options extends Required<CamelCaseOptions>,
> = Value extends []
	? []
	// Trailing spread array
	: Value extends [infer U, ...infer V]
		? [_CamelCasedPropertiesDeep<U, Options>, ..._CamelCasedPropertiesDeep<V, Options>]
		: Value extends readonly [infer U, ...infer V]
			? readonly [_CamelCasedPropertiesDeep<U, Options>, ..._CamelCasedPropertiesDeep<V, Options>]
			// Leading spread array
			: Value extends readonly [...infer U, infer V]
				? [..._CamelCasedPropertiesDeep<U, Options>, _CamelCasedPropertiesDeep<V, Options>]
				// Array
				: Value extends Array<infer U>
					? Array<_CamelCasedPropertiesDeep<U, Options>>
					: Value extends ReadonlyArray<infer U>
						? ReadonlyArray<_CamelCasedPropertiesDeep<U, Options>>
						: never;

export type _CamelCasedPropertiesDeep<
	Value,
	Options extends Required<CamelCaseOptions>,
> = Value extends NonRecursiveType
	? Value
	: Value extends UnknownArray
		? CamelCasedPropertiesArrayDeep<Value, Options>
		: Value extends Set<infer U>
			? Set<_CamelCasedPropertiesDeep<U, Options>>
			: Value extends object
				? {
					[K in keyof Value as CamelCase<K, Options>]: _CamelCasedPropertiesDeep<Value[K], Options>;
				}
				: Value;

export type CamelCasedPropertiesDeep<
	Value,
	Options extends CamelCaseOptions = {},
> = _CamelCasedPropertiesDeep<Value, ApplyDefaultOptions<CamelCaseOptions, _DefaultCamelCaseOptions, Options>>;
