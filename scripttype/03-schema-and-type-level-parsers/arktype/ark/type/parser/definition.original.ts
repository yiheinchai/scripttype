/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/definition.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseCompletions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Fn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalPropertyDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Out<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Primitive<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardSchemaV1<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ifEmptyObjectLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferObjectLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTupleExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTupleLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type isDefaultable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type maybeValidateTupleExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type objectKindOrDomainOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type shallowDefaultableMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type shallowOptionalMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateObjectLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateTupleLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ThunkCast<t = unknown> = () => type.cast<t>

export type inferTuple<def extends array, $, args> =
	def extends TupleExpression ? inferTupleExpression<def, $, args>
	:	inferTupleLiteral<def, $, args>

export type inferStandardSchema<
	schema extends StandardSchemaV1,
	i = StandardSchemaV1.InferInput<schema>,
	o = StandardSchemaV1.InferOutput<schema>
> = [i, o] extends [o, i] ? i : (In: i) => Out<o>

export type inferDefinition<def, $, args> =
	[def] extends [anyOrNever] ? def
	: def extends type.cast<infer t> ?
		// {} as a def is handled here since according to TS it extends { " arkInferred"?: t  }.
		// Unlike in TS however, ArkType object literals are constrained to object
		// so we use that as the base type inferred when parsing {}.
		ifEmptyObjectLiteral<def, object, t>
	: def extends ThunkCast<infer t> ? t
	: def extends string ? inferString<def, $, args>
	: def extends array ? inferTuple<def, $, args>
	: def extends RegExp ? string
	: def extends StandardSchemaV1 ? inferStandardSchema<def>
	: def extends object ? inferObjectLiteral<def, $, args>
	: never

export type TerminalObjectDefinition =
	| type.cast<unknown>
	| Fn
	| RegExp
	| StandardSchemaV1

export type validateTuple<def extends array, $, args> =
	maybeValidateTupleExpression<def, $, args> extends infer result ?
		result extends null ?
			validateTupleLiteral<def, $, args>
		:	result
	:	never

export type BadDefinitionType = Exclude<Primitive, string>

export type writeBadDefinitionTypeMessage<actual extends string> =
	`Type definitions must be strings or objects (was ${actual})`

export type validateInnerDefinition<def, $, args> =
	[def] extends [TerminalObjectDefinition] ? def
	: def extends string ? validateString<def, $, args>
	: unknown extends def ?
		// this allows the initial list of autocompletions to be populated when a user writes "type()",
		// before having specified a definition
		BaseCompletions<$, args> | {}
	: def extends readonly unknown[] ? validateTuple<def, $, args>
	: def extends BadDefinitionType ?
		ErrorMessage<writeBadDefinitionTypeMessage<objectKindOrDomainOf<def>>>
	:	validateObjectLiteral<def, $, args>

export type validateDefinition<def, $, args> =
	null extends undefined ?
		ErrorMessage<`'strict' or 'strictNullChecks' must be set to true in your tsconfig's 'compilerOptions'`>
	: [def] extends [anyOrNever] ? def
	: def extends OptionalPropertyDefinition ?
		ErrorMessage<shallowOptionalMessage>
	: isDefaultable<def, $, args> extends true ?
		ErrorMessage<shallowDefaultableMessage>
	:	validateInnerDefinition<def, $, args>
