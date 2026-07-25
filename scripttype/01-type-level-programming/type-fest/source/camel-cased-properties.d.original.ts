/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-fest/source/camel-cased-properties.d.ts, for comparison with the ScriptType alongside.
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
type _DefaultCamelCaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CamelCasedProperties<Value, Options extends CamelCaseOptions = {}> = Value extends Function
	? Value
	: Value extends Array<infer U>
		? Value
		: {
			[K in keyof Value as
			CamelCase<K, ApplyDefaultOptions<CamelCaseOptions, _DefaultCamelCaseOptions, Options>>
			]: Value[K];
		};
