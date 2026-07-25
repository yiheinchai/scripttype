/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/tupleLiteral.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultablePropertyTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OptionalPropertyDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Sequence<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type conform<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type isDefaultable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type multipleVariadicMesage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type postfixAfterOptionalOrDefaultableMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type satisfy<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type validateInnerDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SequencePhase = satisfy<
	keyof Sequence.Inner,
	| SequencePhase.prefix
	| SequencePhase.optionals
	| SequencePhase.defaultables
	| SequencePhase.postfix
>

export type SequenceParseState = {
	unscanned: array
	inferred: array
	validated: array
	phase: SequencePhase
}

export type PreparsedElementKind =
	| "required"
	| SequencePhase.optionals
	| SequencePhase.defaultables

export type PreparsedElement = {
	head: unknown
	tail: array
	inferred: unknown
	validated: unknown
	kind: PreparsedElementKind
	spread: boolean
}

export type preparseNextElement<
	head,
	tail extends array,
	spread extends boolean,
	$,
	args
> = PreparsedElement.from<{
	head: head
	tail: tail
	inferred: inferDefinition<head, $, args>
	validated: validateInnerDefinition<head, $, args>
	// if inferredHead is optional and the element is spread, this will be an error
	// handled in nextValidatedSpreadElements
	kind: head extends OptionalPropertyDefinition ? PreparsedElement.optionals
	: head extends DefaultablePropertyTuple ? PreparsedElement.defaultables
	: isDefaultable<head, $, args> extends true ? PreparsedElement.defaultables
	: PreparsedElement.required
	spread: spread
}>

export type preparseNextState<s extends SequenceParseState, $, args> =
	s["unscanned"] extends readonly ["...", infer head, ...infer tail] ?
		preparseNextElement<head, tail, true, $, args>
	: s["unscanned"] extends readonly [infer head, ...infer tail] ?
		preparseNextElement<head, tail, false, $, args>
	:	null

export type nextInferred<s extends SequenceParseState, next extends PreparsedElement> =
	next["spread"] extends true ?
		[...s["inferred"], ...conform<next["inferred"], array>]
	: next["kind"] extends SequencePhase.optionals ?
		[...s["inferred"], next["inferred"]?]
	:	[...s["inferred"], next["inferred"]]

export type multipleVariadicMessage = typeof multipleVariadicMesage

export type writeNonArraySpreadMessage<operand> =
	`Spread element must be an array${operand extends string ? ` (was ${operand})`
	:	""}`

export type nextValidatedSpreadOperatorIfPresent<
	s extends SequenceParseState,
	next extends PreparsedElement
> =
	next["spread"] extends true ?
		[
			next["inferred"] extends infer spreadOperand extends array ?
				// if the spread operand is a fixed-length tuple, it won't be a variadic element
				// and therefore doesn't need to be validated as one
				// there are some edge cases around spreads like `[string?, ...[number?]]` which should
				// result in a type error but currently don't. TS also doesn't handle those,
				// but would be nice to have at some point regardless.
				[number, number] extends (
					[s["inferred"]["length"], spreadOperand["length"]]
				) ?
					ErrorMessage<multipleVariadicMessage>
				:	"..."
			:	ErrorMessage<writeNonArraySpreadMessage<next["head"]>>
		]
	:	[]

export type spreadOptionalMessage = typeof spreadOptionalMessage

export type optionalOrDefaultableAfterVariadicMessage =
	typeof optionalOrDefaultableAfterVariadicMessage

export type spreadDefaultableMessage = typeof spreadDefaultableMessage

export type defaultablePostOptionalMessage = typeof defaultablePostOptionalMessage

export type nextValidatedElement<
	s extends SequenceParseState,
	next extends PreparsedElement
> =
	next["kind"] extends SequencePhase.optionals ?
		next["spread"] extends true ? ErrorMessage<spreadOptionalMessage>
		: s["phase"] extends SequencePhase.postfix ?
			ErrorMessage<optionalOrDefaultableAfterVariadicMessage>
		:	next["validated"]
	: next["kind"] extends SequencePhase.defaultables ?
		next["spread"] extends true ? ErrorMessage<spreadDefaultableMessage>
		: s["phase"] extends SequencePhase.optionals ?
			ErrorMessage<defaultablePostOptionalMessage>
		: s["phase"] extends SequencePhase.postfix ?
			ErrorMessage<optionalOrDefaultableAfterVariadicMessage>
		:	next["validated"]
	: [s["phase"], next["spread"]] extends (
		[SequencePhase.optionals | SequencePhase.defaultables, false]
	) ?
		ErrorMessage<postfixAfterOptionalOrDefaultableMessage>
	:	next["validated"]

export type nextValidated<
	s extends SequenceParseState,
	next extends PreparsedElement
> = [
	...s["validated"],
	...nextValidatedSpreadOperatorIfPresent<s, next>,
	nextValidatedElement<s, next>
]

export type parseNextElement<s extends SequenceParseState, $, args> =
	preparseNextState<s, $, args> extends infer next extends PreparsedElement ?
		parseNextElement<
			{
				unscanned: next["tail"]
				inferred: nextInferred<s, next>
				validated: nextValidated<s, next>
				phase: next["kind"] extends (
					SequencePhase.optionals | SequencePhase.defaultables
				) ?
					next["kind"]
				: // if we're parsing the variadic element, don't update the phase
				// so that we can still check it to ensure we don't have
				// postfix elements following optionals or defaultables
				number extends nextInferred<s, next>["length"] ? s["phase"]
				: SequencePhase.prefix
			},
			$,
			args
		>
	:	s

export type parseSequence<def extends array, $, args> = parseNextElement<
	{
		unscanned: def
		inferred: []
		validated: []
		phase: SequencePhase.prefix
	},
	$,
	args
>

export type validateTupleLiteral<def extends array, $, args> =
	parseSequence<def, $, args> extends infer s extends SequenceParseState ?
		Readonly<s["validated"]>
	:	never

export type inferTupleLiteral<def extends array, $, args> =
	parseSequence<def, $, args> extends infer s extends SequenceParseState ?
		s["inferred"]
	:	never

export type from<result extends PreparsedElement> = result
