/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/tupleExpressions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseCompletions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseParseContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InstanceType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Morph<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeSelector<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Out<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Predicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeMeta<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type defaultFor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type distill<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type indexOneParsers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type indexZeroParsers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferMorphOut<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferPipe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferPredicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type postfixParsers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unwrapDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type withDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeMissingRightOperandMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IndexZeroOperator = keyof typeof indexZeroParsers

export type IndexZeroExpression<token extends string = IndexZeroOperator> = readonly [
	token,
	...unknown[]
]

export type validatePrefixExpression<def extends IndexZeroExpression, $, args> =
	def["length"] extends 1 ? readonly [writeMissingRightOperandMessage<def[0]>]
	: def[0] extends "keyof" ?
		readonly [def[0], validateDefinition<def[1], $, args>]
	: def[0] extends "===" ? readonly [def[0], ...unknown[]]
	: def[0] extends "instanceof" ? readonly [def[0], ...Constructor[]]
	: never

export type IndexOneOperator = keyof typeof indexOneParsers

export type IndexOneExpression<token extends string = IndexOneOperator> =
	readonly [unknown, token, ...unknown[]]

export type TuplePostfixOperator = keyof typeof postfixParsers

export type validateIndexOneExpression<
	def extends IndexOneExpression,
	$,
	args
> =
	def[1] extends TuplePostfixOperator ?
		// use type.validate here since optional/defaultables are not allowed
		// within tuple expressions
		readonly [validateDefinition<def[0], $, args>, def[1]]
	:	readonly [
			validateDefinition<def[0], $, args>,
			def["length"] extends 2 ? writeMissingRightOperandMessage<def[1]>
			:	def[1],
			def[1] extends "|" ? validateDefinition<def[2], $, args>
			: def[1] extends "&" ? validateDefinition<def[2], $, args>
			: def[1] extends ":" ? Predicate<type.infer.Out<def[0], $, args>>
			: def[1] extends "=>" ? Morph<type.infer.Out<def[0], $, args>>
			: def[1] extends "|>" ? validateDefinition<def[2], $, args>
			: def[1] extends "=" ? defaultFor<type.infer.In<def[0], $, args>>
			: def[1] extends "@" ? TypeMeta.MappableInput
			: validateDefinition<def[2], $, args>,
			...(def[1] extends "@" ? [NodeSelector?] : [])
		]

export type maybeValidateTupleExpression<def extends array, $, args> =
	def extends IndexZeroExpression ? validatePrefixExpression<def, $, args>
	: def extends IndexOneExpression ? validateIndexOneExpression<def, $, args>
	: def extends (
		readonly ["", ...unknown[]] | readonly [unknown, "", ...unknown[]]
	) ?
		readonly [
			def[0] extends "" ? BaseCompletions<$, args, IndexZeroOperator | "...">
			:	def[0],
			def[1] extends "" ? BaseCompletions<$, args, IndexOneOperator | "...">
			:	def[1]
		]
	:	null

export type TupleExpression = IndexZeroExpression | IndexOneExpression

export type parseMorph<inDef, morph, $, args> =
	morph extends Morph ?
		inferMorphOut<morph> extends infer out ?
			(In: distill.In<inferDefinition<inDef, $, args>>) => Out<out>
		:	never
	:	never

export type parseTo<inDef, outDef, $, args> = inferPipe<
	inferDefinition<inDef, $, args>,
	inferDefinition<outDef, $, args>
>

export type inferKeyOfExpression<operandDef, $, args> = show<
	keyof inferDefinition<operandDef, $, args>
>

export type inferTupleExpression<def extends TupleExpression, $, args> =
	def[1] extends "[]" ? inferDefinition<def[0], $, args>[]
	: def[1] extends "?" ? inferDefinition<def[0], $, args>
	: def[1] extends "&" ?
		inferIntersection<
			inferDefinition<def[0], $, args>,
			inferDefinition<def[2], $, args>
		>
	: def[1] extends "|" ?
		inferDefinition<def[0], $, args> | inferDefinition<def[2], $, args>
	: def[1] extends ":" ?
		inferPredicate<inferDefinition<def[0], $, args>, def[2]>
	: def[1] extends "=>" ? parseMorph<def[0], def[2], $, args>
	: def[1] extends "|>" ? parseTo<def[0], def[2], $, args>
	: def[1] extends "=" ?
		withDefault<inferDefinition<def[0], $, args>, unwrapDefault<def[2]>>
	: def[1] extends "@" ? inferDefinition<def[0], $, args>
	: def extends readonly ["===", ...infer values] ? values[number]
	: def extends (
		readonly ["instanceof", ...infer constructors extends Constructor[]]
	) ?
		InstanceType<constructors[number]>
	: def[0] extends "keyof" ? inferKeyOfExpression<def[1], $, args>
	: never

export type IndexOneParser<token extends string> = (
	def: IndexOneExpression<token>,
	ctx: BaseParseContext
) => BaseRoot

export type IndexZeroParser<token extends string> = (
	def: IndexZeroExpression<token>,
	ctx: BaseParseContext
) => BaseRoot
