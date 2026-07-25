/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Comparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfixExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PostfixExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Stringifiable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type astToString<ast> =
	ast extends InferredAst | DefAst ? ast[2]
	: ast extends PostfixExpression<infer operator, infer operand> ?
		operator extends "[]" ?
			`${astToString<operand>}[]`
		:	never
	: ast extends InfixExpression<infer operator, infer l, infer r> ?
		operator extends "&" | "|" | "%" | Comparator ?
			`${astToString<l>} ${operator} ${astToString<r>}`
		:	never
	: ast extends Stringifiable ? `${ast extends bigint ? `${ast}n` : ast}`
	: "..."

export type writeConstrainedMorphMessage<constrainedAst> =
	`To constrain the output of ${astToString<constrainedAst>}, pipe like myMorph.to('number > 0').
To constrain the input, intersect like myMorph.and('number > 0').`
