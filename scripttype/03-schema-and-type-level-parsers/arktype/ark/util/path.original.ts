/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/path.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type requireKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StringifyPathOptions<stringifiable = PropertyKey> = requireKeys<
	{
		stringifySymbol?: (s: symbol) => string
		stringifyNonKey?: (o: Exclude<stringifiable, PropertyKey>) => string
	},
	stringifiable extends PropertyKey ? never : "stringifyNonKey"
>
