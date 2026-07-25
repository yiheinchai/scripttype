/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/roots/domain.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _Domain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Domain = _Domain

export type Enumerable = "undefined" | "null" | "boolean"

export type NonEnumerable = Exclude<Domain, Enumerable>

export interface NormalizedSchema<
		domain extends NonEnumerable = NonEnumerable
	> extends BaseNormalizedSchema,
			Inner<domain> {}

export type Schema<
		// only domains with an infinite number of values are allowed as bases
		domain extends NonEnumerable = NonEnumerable
	> = domain | NormalizedSchema<domain>
