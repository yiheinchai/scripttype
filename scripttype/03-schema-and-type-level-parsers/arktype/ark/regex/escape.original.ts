/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/regex/escape.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Control<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReferenceNode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scanner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type State<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type WhitespaceChar<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type NonZeroDigit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

export type StringDigit = "0" | NonZeroDigit

export type parseNumericBackreference<
	s extends State,
	// expects everything following the backslash, including the first digit
	fullUnscanned extends string
> =
	Scanner.shiftUntilNot<fullUnscanned, StringDigit> extends (
		Scanner.shiftResult<infer ref, infer remaining>
	) ?
		s.shiftQuantifiable<s, ReferenceNode<ref>, remaining>
	:	never

export type missingBackreferenceNameMessage =
	typeof missingBackreferenceNameMessage

export type parseNamedBackreference<s extends State, unscanned extends string> =
	unscanned extends `<${infer ref}>${infer following}` ?
		s.shiftQuantifiable<s, ReferenceNode<ref>, following>
	:	s.error<missingBackreferenceNameMessage>

export type UnicodePropertyChar = "p" | "P"

export type writeInvalidUnicodePropertyMessage<
	char extends UnicodePropertyChar
> =
	`\\${char} must be followed by a property like \\${char}{Emoji_Presentation}`

export type parseUnicodeProperty<
	s extends State,
	char extends UnicodePropertyChar,
	unscanned extends string
> =
	unscanned extends `{${string}}${infer following}` ?
		s.shiftQuantifiable<s, string, following>
	:	s.error<writeInvalidUnicodePropertyMessage<char>>

export type RegexClassChar = "w" | "W" | "D" | "S"

export type BoundaryChar = "b" | "B"

export type caretNotationMessage =
	"\\cX notation is not supported. Use hex (\\x) or unicode (\\u) instead."

export type StringEscapableChar = "t" | "n" | "r" | "f" | "v" | "0" | "x" | "u"

export type writeStringEscapableMessage<char extends StringEscapableChar> =
	`\\${char} should be specified with a single backslash like regex('\n')`

export type writeUnnecessaryEscapeMessage<char extends string> =
	`Escape preceding ${char} is unnecessary and should be removed.`

export type parseEscapedChar<char extends string> =
	char extends RegexClassChar ? string
	: char extends "d" ? `${number}`
	: char extends "s" ? WhitespaceChar
	: // does not consume tokens
	char extends BoundaryChar ? ""
	: char extends Control ? char
	: char extends "c" ? ErrorMessage<caretNotationMessage>
	: char extends StringEscapableChar ?
		ErrorMessage<writeStringEscapableMessage<char>>
	:	ErrorMessage<writeUnnecessaryEscapeMessage<char>>

export type parseSingleEscapedCharacter<
	s extends State,
	char extends string,
	remaining extends string
> =
	parseEscapedChar<char> extends infer result extends string ?
		result extends ErrorMessage ?
			s.error<result>
		:	s.shiftQuantifiable<s, result, remaining>
	:	never

export type trailingBackslashMessage = typeof trailingBackslashMessage

export type parseEscape<s extends State, unscanned extends string> =
	unscanned extends Scanner.shift<infer char, infer nextUnscanned> ?
		char extends NonZeroDigit ? parseNumericBackreference<s, unscanned>
		: char extends "k" ? parseNamedBackreference<s, nextUnscanned>
		: char extends UnicodePropertyChar ?
			parseUnicodeProperty<s, char, nextUnscanned>
		:	parseSingleEscapedCharacter<s, char, nextUnscanned>
	:	s.error<trailingBackslashMessage>

export type writeUnresolvableBackreferenceMessage<ref extends string | number> =
	`Group ${ref} does not exist`
