/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operand/enclosed.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferredAst<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Out<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Regex<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scanner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StaticState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type enclosingQuote<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type enclosingRegexTokens<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type enclosingTokens<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type regex<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
