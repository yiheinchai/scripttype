/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/pascal-cased-properties-deep.d.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ApplyDefaultOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CamelCaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PascalCase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _DefaultCamelCaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _PascalCasedPropertiesDeep<Value, Options extends Required<CamelCaseOptions>> = Value extends Function | Date | RegExp
	? Value
	: Value extends Array<infer U>
		? Array<_PascalCasedPropertiesDeep<U, Options>>
		: Value extends Set<infer U>
			? Set<_PascalCasedPropertiesDeep<U, Options>>
			: Value extends object
				? {
					[K in keyof Value as PascalCase<K, Options>]: _PascalCasedPropertiesDeep<Value[K], Options>;
				}
				: Value;

export type PascalCasedPropertiesDeep<Value, Options extends CamelCaseOptions = {}> =
	_PascalCasedPropertiesDeep<Value, ApplyDefaultOptions<CamelCaseOptions, _DefaultCamelCaseOptions, Options>>;
