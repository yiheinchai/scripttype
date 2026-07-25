/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/roots/domain.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _Domain<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
