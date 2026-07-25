/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/regex/charset.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Backslash<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scanner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type State<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StringDigit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type noSuggest<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseEscapedChar<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type writeUnclosedGroupMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UnescapedDashMarker = noSuggest<"dash">

export type parseChar<unscanned extends string> =
	unscanned extends Scanner.shift<infer lookahead, infer next> ?
		lookahead extends Backslash ?
			next extends Scanner.shift<infer escaped, infer postEscaped> ?
				Scanner.shiftResult<parseEscapedChar<escaped>, postEscaped>
			:	never
		:	Scanner.shiftResult<
				lookahead extends "-" ? UnescapedDashMarker : lookahead,
				next
			>
	:	// return null if called on an empty string
		null

export type inferRange<start extends string, end extends string> =
	start | end extends StringDigit ? `${number}` : string

export type parseDash<
	unscanned extends string,
	set extends string,
	lastChar extends string | null
> =
	lastChar extends string ?
		// we have a last character to use as range start
		parseChar<unscanned> extends (
			Scanner.shiftResult<infer rangeEnd, infer next>
		) ?
			parseNonNegatedCharset<next, set | inferRange<lastChar, rangeEnd>, null>
		:	// trailing -, treat as literal
			set | "-"
	:	// leading -, treat as literal (lastChar is null)
		parseNonNegatedCharset<unscanned, set | "-", "-">

export type parseNonNegatedCharset<
	chars extends string,
	set extends string,
	lastChar extends string | null
> =
	parseChar<chars> extends Scanner.shiftResult<infer result, infer unscanned> ?
		result extends UnescapedDashMarker ? parseDash<unscanned, set, lastChar>
		: result extends ErrorMessage ? result
		: parseNonNegatedCharset<unscanned, set | result, result>
	:	set

export type emptyCharacterSetMessage = typeof emptyCharacterSetMessage

export type parseCharset<s extends State, unscanned extends string> =
	Scanner.shiftUntilEscapable<unscanned, "]", Backslash> extends (
		Scanner.shiftResult<infer scanned, infer nextUnscanned>
	) ?
		nextUnscanned extends `]${infer remaining}` ?
			// we don't care about the contents of the negated char set because we can't infer it
			scanned extends Scanner.shift<"^", string> ?
				s.shiftQuantifiable<s, string, remaining>
			: parseNonNegatedCharset<scanned, never, null> extends (
				infer result extends string
			) ?
				[result] extends [never] ?
					s.error<emptyCharacterSetMessage>
				:	s.shiftQuantifiable<s, result, remaining>
			:	never
		:	s.error<writeUnclosedGroupMessage<"]">>
	:	never
