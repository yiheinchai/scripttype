/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/declare.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalPropertyDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Out<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TerminalObjectDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThunkCast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type bindThis<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type distill<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type equals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type optionalKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type requiredKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DeclareContext = {
	side?: "in" | "out"
}

export type declaredOptionalKeySuggestion<k extends string, def> =
	k extends keyof def ?
		def[k] extends OptionalPropertyDefinition ?
			k
		:	`${k}?`
	:	`${k}?`

export type declaredOptionalValueSuggestion<
	def,
	k extends keyof declared & string,
	declared,
	$,
	args,
	ctx extends DeclareContext
> =
	k extends keyof def ?
		def[k] extends OptionalPropertyDefinition ?
			// Required<declared>[k] ensures that we can distinguish { foo?: true } from { foo?: true | undefined }
			validateInference<def[k], Required<declared>[k], $, args, ctx>
		:	declared[k]
	: `${k}?` extends keyof def ?
		validateInference<def[`${k}?`], Required<declared>[k], $, args, ctx>
	:	declared[k]

export type validateObjectInference<
	def extends object,
	declared,
	$,
	args,
	ctx extends DeclareContext
> = show<
	{
		[k in requiredKeyOf<declared>]: k extends keyof def ?
			validateInference<def[k], declared[k], $, args, ctx>
		:	declared[k]
	} & {
		[k in optionalKeyOf<declared> & string as declaredOptionalKeySuggestion<
			k,
			def
		>]: declaredOptionalValueSuggestion<def, k, declared, $, args, ctx>
	}
>

export type declarationMismatch<inferred, declared> = ErrorType<{
	declared: declared
	inferred: inferred
}>

export type validateShallowInference<
	t,
	declared,
	ctx extends DeclareContext,
	inferred = ctx["side"] extends distill.Side ? distill<t, ctx["side"]> : t
> =
	equals<inferred, declared> extends true ? unknown
	:	show<declarationMismatch<inferred, declared>>

export type validateArrayInference<
	def extends array,
	declared,
	$,
	args,
	ctx extends DeclareContext
> =
	declared extends array ?
		{
			[i in keyof declared]: i extends keyof def ?
				validateInference<def[i], declared[i], $, args, ctx>
			:	declared[i]
		}
	:	show<declarationMismatch<inferDefinition<def, $, args>, declared>>

export type validateInference<def, declared, $, args, ctx extends DeclareContext> =
	def extends TerminalObjectDefinition | ThunkCast | TupleExpression ?
		// {} as a def is handled here since according to TS it extends { " arkInferred"?: t  }.
		keyof def extends never ?
			// special case it to pass through normal object validation
			validateObjectInference<def, declared, $, args, ctx>
		:	validateShallowInference<inferDefinition<def, $, args>, declared, ctx>
	: def extends array ? validateArrayInference<def, declared, $, args, ctx>
	: def extends object ? validateObjectInference<def, declared, $, args, ctx>
	: validateShallowInference<inferDefinition<def, $, args>, declared, ctx>

export type validateDeclared<declared, def, $, ctx extends DeclareContext> =
	def extends type.validate<def, $> ?
		validateInference<def, declared, $, bindThis<def>, ctx>
	:	type.validate<def, $>

export type finalizePreinferred<preinferred, def, $, ctx extends DeclareContext> =
	ctx["side"] extends distill.Side ?
		ctx["side"] extends "in" ?
			(In: preinferred) => type.infer.Out<def, $>
		:	(In: type.infer.In<def, $>) => Out<preinferred>
	:	preinferred

export type DeclarationParser<$> = <
	preinferred = unset,
	ctx extends DeclareContext = {}
>() => {
	type: <const def>(
		def: [preinferred] extends [unset] ?
			[preinferred] extends [anyOrNever] ?
				validateDeclared<preinferred, def, $, ctx>
			:	ErrorMessage<`declare<ExternalType>() requires a generic argument`>
		:	validateDeclared<preinferred, def, $, ctx>
	) => Type<finalizePreinferred<preinferred, def, $, ctx>, $>
}
