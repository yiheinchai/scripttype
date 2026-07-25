/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/validate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BigintLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BranchOperator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Comparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Completion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Generic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GenericInstantiationAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfixExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NumberLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PostfixExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PrivateDeclaration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnitLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type anyOrNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type astToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateDivisor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateGenericInstantiation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateKeyof<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateRange<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeInvalidGenericArgCountMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeMalformedNumericLiteralMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeMissingSubmoduleAccessMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type writePrefixedPrivateReferenceMessage<name extends string> =
	`Private type references should not include '#'. Use '${name}' instead.`

export type validateInferredAst<inferred, def extends string> =
	def extends NumberLiteral ?
		number extends inferred ?
			ErrorMessage<writeMalformedNumericLiteralMessage<def, "number">>
		:	undefined
	: def extends BigintLiteral ?
		bigint extends inferred ?
			ErrorMessage<writeMalformedNumericLiteralMessage<def, "bigint">>
		:	undefined
	: [inferred] extends [anyOrNever] ? undefined
	: def extends PrivateDeclaration<infer name> ?
		ErrorMessage<writePrefixedPrivateReferenceMessage<name>>
	: // these problems would've been caught during a fullStringParse, but it's most
	// efficient to check for them here in case the string was naively parsed
	inferred extends Generic ?
		ErrorMessage<writeInvalidGenericArgCountMessage<def, inferred["names"], []>>
	: inferred extends { [arkKind]: "module" } ?
		"root" extends keyof inferred ?
			undefined
		:	ErrorMessage<writeMissingSubmoduleAccessMessage<def>>
	: def extends ErrorMessage ? def
	: undefined

export type validateInfix<ast extends InfixExpression, $, args> =
	validateAst<ast[0], $, args> extends infer e extends ErrorMessage ? e
	: validateAst<ast[2], $, args> extends infer e extends ErrorMessage ? e
	: undefined

export type writeUnexpectedExpressionMessage<expression extends string> =
	`Failed to parse the expression resulting from ${expression}`

export type validateAst<ast, $, args> =
	ast extends ErrorMessage ? ast
	: ast extends InferredAst ? validateInferredAst<ast[0], ast[2]>
	: ast extends DefAst ?
		ast[2] extends PrivateDeclaration<infer name> ?
			ErrorMessage<writePrefixedPrivateReferenceMessage<name>>
		:	undefined
	: ast extends PostfixExpression<"[]" | "?", infer operand> ?
		// shallowOptionalMessage is handled in type.validate
		// invalidOptionalKeyKindMessage is handled in property parsing

		// it would be natural to handle them here by adding context
		// to the generic args, but it makes the cache less reusable
		// (was tested and had a significant impact on repo-wide perf)
		validateAst<operand, $, args>
	: ast extends InfixExpression<infer operator, infer l, infer r> ?
		operator extends BranchOperator ? validateInfix<ast, $, args>
		: operator extends Comparator ? validateRange<l, operator, r, $, args>
		: operator extends "%" ? validateDivisor<l, $, args>
		: // shallowDefaultableMessage is handled in type.validate
		// invalidDefaultableKeyKindMessage is handled in property parsing
		operator extends "=" ? validateDefault<l, r & UnitLiteral, $, args>
		: operator extends "#" ? validateAst<l, $, args>
		: ErrorMessage<writeUnexpectedExpressionMessage<astToString<ast>>>
	: ast extends ["keyof", infer operand] ? validateKeyof<operand, $, args>
	: ast extends GenericInstantiationAst<infer g, infer argAsts> ?
		validateGenericInstantiation<g, argAsts, $, args>
	:	ErrorMessage<writeUnexpectedExpressionMessage<astToString<ast>>> & {
			ast: ast
		}

export type validateString<def extends string, $, args> =
	parseString<def, $, args> extends infer ast ?
		validateAst<ast, $, args> extends infer result extends ErrorMessage ?
			// completions have the same suffix as error messages as a sentinel
			// but don't want to include that in what TS suggests
			result extends Completion<infer text> ?
				text
			:	result
		:	def
	:	never
