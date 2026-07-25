/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/regex/group.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scanner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type State<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type writeUnclosedGroupMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type LookaroundChar = "=" | "!"

export type unnamedCaptureGroupMessage = typeof unnamedCaptureGroupMessage

export type shiftNamedGroup<unscanned extends string> =
	unscanned extends `${infer name}>${infer next}` ?
		name extends "" ?
			Scanner.shiftResult<"", ErrorMessage<unnamedCaptureGroupMessage>>
		:	Scanner.shiftResult<name, next>
	:	Scanner.shiftResult<"", ErrorMessage<writeUnclosedGroupMessage<">">>>

export type parseNamedGroupOrLookbehind<s extends State, unscanned extends string> =
	unscanned extends Scanner.shift<LookaroundChar, infer next> ?
		// for now, lookarounds don't affect inference
		s.pushGroup<s, State.UnnamedCaptureKind.lookaround, next, undefined>
	: shiftNamedGroup<unscanned> extends (
		Scanner.shiftResult<infer name, infer following>
	) ?
		s.pushGroup<s, name, following, undefined>
	:	s.error<writeUnclosedGroupMessage<")">>

export type ModifiableFlag = "i" | "m" | "s"

export type writeDuplicateModifierMessage<modifier extends ModifiableFlag> =
	`Modifier ${modifier} cannot appear multiple times in a single group`

export type writeInvalidModifierMessage<char extends string> =
	`Modifier flag ${char} must be 'i', 'm' or 's'`

export type missingNegatedModifierMessage = typeof missingNegatedModifierMessage

export type multipleModifierDashesMessage = typeof multipleModifierDashesMessage

export type ParsedModifiers<
	flags extends ModifiableFlag = ModifiableFlag,
	negated extends ModifiableFlag = ModifiableFlag
> = {
	flags: flags
	negated: negated
}

export type _parseModifiers<
	unscanned extends string,
	flags extends ModifiableFlag,
	negated extends ModifiableFlag
> =
	unscanned extends Scanner.shift<infer lookahead, infer next> ?
		lookahead extends "-" ?
			[negated] extends [never] ?
				next extends Scanner.shift<infer modifier, infer next> ?
					modifier extends ModifiableFlag ?
						modifier extends flags | negated ?
							writeDuplicateModifierMessage<modifier>
						:	_parseModifiers<next, flags, negated | modifier>
					:	writeInvalidModifierMessage<modifier>
				:	missingNegatedModifierMessage
			:	multipleModifierDashesMessage
		: lookahead extends ModifiableFlag ?
			lookahead extends flags | negated ?
				writeDuplicateModifierMessage<lookahead>
			: // once "-" has been seen, all subsequent modifiers are negated
			// check if we've already parsed a negation to see how to treat this
			[negated] extends [never] ?
				_parseModifiers<next, flags | lookahead, negated>
			:	_parseModifiers<next, flags, negated | lookahead>
		:	writeInvalidModifierMessage<lookahead>
	:	ParsedModifiers<flags, negated>

export type parseModifiers<unscanned extends string> = _parseModifiers<
	unscanned,
	never,
	never
>

export type ShiftedModifiers<
	flags extends ModifiableFlag = ModifiableFlag,
	negated extends ModifiableFlag = ModifiableFlag,
	unscanned extends string = string
> = [ParsedModifiers<flags, negated>, unscanned]

export type unescapedLiteralQuestionMarkMessage =
	typeof unescapedLiteralQuestionMarkMessage

export type shiftModifiers<unscanned extends string> =
	Scanner.shiftUntil<unscanned, ":" | ")"> extends (
		Scanner.shiftResult<infer scanned, infer next>
	) ?
		next extends Scanner.shift<infer terminator, infer following> ?
			terminator extends ":" ?
				parseModifiers<scanned> extends (
					ParsedModifiers<infer flags, infer negated>
				) ?
					ShiftedModifiers<flags, negated, following>
				:	// set unscanned to the error string
					ShiftedModifiers<
						never,
						never,
						ErrorMessage<parseModifiers<scanned> & string>
					>
			:	ShiftedModifiers<
					never,
					never,
					ErrorMessage<unescapedLiteralQuestionMarkMessage>
				>
		:	ShiftedModifiers<
				never,
				never,
				ErrorMessage<writeUnclosedGroupMessage<")">>
			>
	:	never

export type parseNonCapturingGroup<s extends State, unscanned extends string> =
	unscanned extends Scanner.shift<infer lookahead, infer next> ?
		lookahead extends ":" ?
			s.pushGroup<s, State.UnnamedCaptureKind.noncapturing, next, undefined>
		: // for now, lookarounds don't affect inference
		lookahead extends LookaroundChar ?
			s.pushGroup<s, State.UnnamedCaptureKind.lookaround, next, undefined>
		: lookahead extends "<" ? parseNamedGroupOrLookbehind<s, next>
		: shiftModifiers<unscanned> extends (
			ShiftedModifiers<infer flags, infer negated, infer following>
		) ?
			following extends ErrorMessage<infer message> ?
				s.error<message>
			:	s.pushGroup<
					s,
					State.UnnamedCaptureKind.noncapturing,
					following,
					"i" extends flags ? true
					: "i" extends negated ? false
					: undefined
				>
		:	never
	:	s.error<writeUnclosedGroupMessage<")">>

export type parseGroup<s extends State, unscanned extends string> =
	unscanned extends Scanner.shift<infer lookahead, infer next> ?
		lookahead extends "?" ?
			parseNonCapturingGroup<s, next>
		:	s.pushGroup<s, State.UnnamedCaptureKind.indexed, unscanned, undefined>
	:	s.error<writeUnclosedGroupMessage<")">>
