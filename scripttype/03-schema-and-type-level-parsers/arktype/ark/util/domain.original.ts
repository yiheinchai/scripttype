/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/domain.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DescribeOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type describeDefaults<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type show<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type stringifyUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TypesByDomain = {
	bigint: bigint
	boolean: boolean
	number: number
	object: object
	string: string
	symbol: symbol
	undefined: undefined
	null: null
}

export type Domain = show<keyof TypesByDomain>

export type inferDomain<kind extends Domain> =
	Domain extends kind ? unknown : TypesByDomain[kind]

export type domainOf<data> =
	unknown extends data ? Domain
	: data extends object ? "object"
	: data extends string ? "string"
	: data extends number ? "number"
	: data extends boolean ? "boolean"
	: data extends undefined ? "undefined"
	: data extends null ? "null"
	: data extends bigint ? "bigint"
	: data extends symbol ? "symbol"
	: never

export type domainDescriptions = typeof domainDescriptions

export type describeDomainOf<
	t,
	opts extends DescribeOptions = {}
> = stringifyUnion<
	opts["includeArticles"] extends true ? domainDescriptions[domainOf<t>]
	:	domainOf<t>,
	opts["branchDelimiter"] extends string ? opts["branchDelimiter"]
	:	describeDefaults["branchDelimiter"]
>
