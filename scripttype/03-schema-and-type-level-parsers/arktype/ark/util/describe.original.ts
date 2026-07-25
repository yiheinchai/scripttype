/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/describe.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Stringifiable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type anyOrNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type describeDomainOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type describeObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type domainOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferDomain<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type satisfy<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type stringifyUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type DescribeOptions = {
	includeArticles?: boolean
	branchDelimiter?: string
}

export type describeArrayOf<element extends string> =
	element extends "unknown" ? "an array" : `an array of ${element}`

export type describeDefaults = satisfy<
	Required<DescribeOptions>,
	{
		includeArticles: false
		branchDelimiter: " | "
	}
>

export type includesDelimiter<s extends string, opts extends DescribeOptions> =
	s extends (
		`${string}${opts["branchDelimiter"] extends string ? opts["branchDelimiter"] : describeDefaults["branchDelimiter"]}${string}`
	) ?
		true
	:	false

export type arrayTypeToString<t extends array, opts extends DescribeOptions> =
	typeToString<t[number], opts> extends infer element extends string ?
		opts["includeArticles"] extends true ? describeArrayOf<element>
		: includesDelimiter<element, opts> extends true ? `(${element})[]`
		: `${element}[]`
	:	never

export type stringifiableToString<
	t extends Stringifiable,
	opts extends DescribeOptions
> =
	// if it's the base wideneded domain, use that name
	inferDomain<domainOf<t>> extends t ? describeDomainOf<t, opts>
	:	// otherwise if it's a literal, use that
		`${t}`

export type typeToString<t, opts extends DescribeOptions = {}> = stringifyUnion<
	[t] extends [anyOrNever] ?
		unknown extends t ?
			"any"
		:	"never"
	: unknown extends t ? "unknown"
	: boolean extends t ?
		| "boolean"
		| ([t] extends [boolean] ? never : typeToString<Exclude<t, boolean>, opts>)
	: t extends array ? arrayTypeToString<t, opts>
	: t extends object ? describeObject<t, opts>
	: t extends Stringifiable ? stringifiableToString<t, opts>
	: describeDomainOf<t, opts>,
	opts["branchDelimiter"] extends string ? opts["branchDelimiter"]
	:	describeDefaults["branchDelimiter"]
>

export type describe<t> = typeToString<
	t,
	{
		includeArticles: true
		branchDelimiter: " or "
	}
>
