/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operand/enclosed.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Out<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Regex<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type enclosingQuote<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type enclosingRegexTokens<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type enclosingTokens<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type regex<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DoubleQuotedStringLiteral<contents extends string = string> =
	`"${contents}"`

export type SingleQuotedStringLiteral<contents extends string = string> =
	`'${contents}'`

export type StringLiteral<contents extends string = string> =
	| DoubleQuotedStringLiteral<contents>
	| SingleQuotedStringLiteral<contents>

export type EnclosingTokens = typeof enclosingTokens

export type EnclosingStartToken = keyof EnclosingTokens

export type enclosingCharDescriptions = typeof enclosingCharDescriptions

export type writeUnterminatedEnclosedMessage<
	fragment extends string,
	enclosingStart extends EnclosingStartToken
> = `${enclosingStart}${fragment} requires a closing ${enclosingCharDescriptions[EnclosingTokens[enclosingStart]]}`

export type EnclosingQuote = keyof typeof enclosingQuote

export type EnclosingRegexTokens = typeof enclosingRegexTokens

export type EnclosingRegexToken = keyof EnclosingRegexTokens

export type _parseEnclosed<
	s extends StaticState,
	enclosingStart extends EnclosingStartToken,
	scanned extends string,
	nextUnscanned extends string,
	def extends
		string = `${enclosingStart}${scanned}${EnclosingTokens[enclosingStart]}`
> =
	nextUnscanned extends "" ?
		s.error<writeUnterminatedEnclosedMessage<scanned, enclosingStart>>
	: enclosingStart extends EnclosingQuote ?
		s.setRoot<
			s,
			InferredAst<scanned, def>,
			nextUnscanned extends Scanner.shift<string, infer unscanned> ? unscanned
			:	""
		>
	: enclosingStart extends EnclosingRegexToken ?
		regex.parse<scanned> extends infer r ?
			r extends Regex ?
				s.setRoot<
					s,
					InferredAst<
						enclosingStart extends "/" ? r["infer"]
						:	(In: r["infer"]) => Out<r["inferExecArray"]>,
						def
					>,
					nextUnscanned extends Scanner.shift<string, infer unscanned> ?
						unscanned
					:	""
				>
			: r extends ErrorMessage<infer e> ? s.error<e>
			: never
		:	never
	:	s.setRoot<
			s,
			InferredAst<Date, def>,
			nextUnscanned extends Scanner.shift<string, infer unscanned> ? unscanned
			:	""
		>

export type parseEnclosed<
	s extends StaticState,
	enclosingStart extends EnclosingStartToken,
	unscanned extends string
> =
	Scanner.shiftUntilEscapable<
		unscanned,
		EnclosingTokens[enclosingStart],
		""
	> extends Scanner.shiftResult<infer scanned, infer nextUnscanned> ?
		_parseEnclosed<s, enclosingStart, scanned, nextUnscanned>
	:	never
