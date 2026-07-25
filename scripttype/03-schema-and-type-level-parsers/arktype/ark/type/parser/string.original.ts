/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/string.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArkAmbient<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StaticState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StringifiablePrefixOperator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferAstRoot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseDefault<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseOperand<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type parseOperator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type resolutionToAst<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type resolvableReferenceIn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type writeUnexpectedCharacterMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type extractFinalizedResult<s extends StaticState> =
	s["finalizer"] extends "" ? s["root"]
	: s["finalizer"] extends ErrorMessage ? s["finalizer"]
	: s["finalizer"] extends "?" ? [s["root"], "?"]
	: s["finalizer"] extends "=" ? parseDefault<s["root"], s["unscanned"]>
	: ErrorMessage<writeUnexpectedCharacterMessage<s["finalizer"] & string>>

export type next<s extends StaticState, $, args> =
	s["root"] extends undefined ? parseOperand<s, $, args>
	:	parseOperator<s, $, args>

export type parseUntilFinalizer<s extends StaticState, $, args> =
	s["finalizer"] extends undefined ?
		parseUntilFinalizer<next<s, $, args>, $, args>
	:	s

export type fullStringParse<s extends StaticState, $, args> = extractFinalizedResult<
	parseUntilFinalizer<s, $, args>
>

export type parseString<def extends string, $, args> =
	def extends keyof $ ?
		// def could also be a generic reference here, in which case it will
		// fail semantic validation because it has no args
		resolutionToAst<def, $[def]>
	: def extends `${infer child}[]` ?
		child extends keyof $ ?
			[resolutionToAst<child, $[child]>, "[]"]
		:	fullStringParse<s.initialize<def>, $, args>
	:	fullStringParse<s.initialize<def>, $, args>

export type inferString<def extends string, $, args> = inferAstRoot<
	parseString<def, $, args>,
	$,
	args
>

export type BaseCompletions<$, args, otherSuggestions extends string = never> =
	| resolvableReferenceIn<$>
	| resolvableReferenceIn<ArkAmbient.$>
	| (keyof args & string)
	| StringifiablePrefixOperator
	| otherSuggestions
