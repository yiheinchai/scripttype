/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/infer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Comparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericInstantiationAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfixToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LimitLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PostfixToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type arkKeyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type distill<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferGenericInstantiation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferPipe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type type<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type withDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferredAst<t = unknown, def extends string = string> = [
	t,
	"inferred",
	def
]

export type DefAst<def = unknown, alias extends string = string> = [
	def,
	"def",
	alias
]

export type inferExpression<ast, $, args> =
	ast extends array ?
		ast extends InferredAst<infer resolution> ? resolution
		: ast extends DefAst<infer def> ? inferDefinition<def, $, args>
		: ast extends GenericInstantiationAst<infer g, infer argAsts> ?
			inferGenericInstantiation<g, argAsts, $, args>
		: ast[1] extends "[]" ? inferExpression<ast[0], $, args>[]
		: ast[1] extends "|" ?
			inferExpression<ast[0], $, args> | inferExpression<ast[2], $, args>
		: ast[1] extends "&" ?
			inferIntersection<
				inferExpression<ast[0], $, args>,
				inferExpression<ast[2], $, args>
			>
		: ast[1] extends "|>" ?
			inferPipe<
				inferExpression<ast[0], $, args>,
				inferExpression<ast[2], $, args>
			>
		: ast[1] extends "=" ?
			// unscoped type.infer is safe since the default value is always a literal
			// as of TS5.6, inlining defaultValue causes a bunch of extra types and instantiations
			type.infer<ast[2]> extends infer defaultValue ?
				withDefault<inferExpression<ast[0], $, args>, defaultValue>
			:	never
		: ast[1] extends "#" ? type.brand<inferExpression<ast[0], $, args>, ast[2]>
		: ast[1] extends Comparator ?
			ast[0] extends LimitLiteral ?
				inferExpression<ast[2], $, args>
			:	inferExpression<ast[0], $, args>
		: ast[1] extends "%" ? inferExpression<ast[0], $, args>
		: ast[1] extends "?" ? inferExpression<ast[0], $, args>
		: ast[0] extends "keyof" ? arkKeyOf<inferExpression<ast[1], $, args>>
		: never
	:	never

export type inferAstRoot<ast, $, args> =
	ast extends array ? inferExpression<ast, $, args> : never

export type inferAstIn<ast, $, args> = distill.In<inferAstRoot<ast, $, args>>

export type inferAstOut<ast, $, args> = distill.Out<inferAstRoot<ast, $, args>>

export type PrefixOperator = "keyof" | "instanceof" | "===" | "node"

export type PrefixExpression<
	operator extends PrefixOperator = PrefixOperator,
	operand = unknown
> = [operator, operand]

export type PostfixExpression<
	operator extends PostfixToken = PostfixToken,
	operand = unknown
> = readonly [operand, operator]

export type InfixExpression<
	operator extends InfixToken = InfixToken,
	l = unknown,
	r = unknown
> = [l, operator, r]
