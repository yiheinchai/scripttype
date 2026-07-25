/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/util/describe.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Stringifiable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type describeDomainOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type describeObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type domainOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDomain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type satisfy<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type stringifyUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
