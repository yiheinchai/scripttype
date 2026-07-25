/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/string.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArkAmbient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringifiablePrefixOperator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAstRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseOperand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseOperator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type resolutionToAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type resolvableReferenceIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnexpectedCharacterMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
