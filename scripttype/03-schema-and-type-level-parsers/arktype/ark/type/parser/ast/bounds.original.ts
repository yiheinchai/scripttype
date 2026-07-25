/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/ast/bounds.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BoundExpressionKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Comparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredMorph<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LimitLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type astToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAstRoot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type typeToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type validateAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeConstrainedMorphMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeInvalidLimitMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnboundableMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type isNumericallyBoundable<bounded> =
	[bounded] extends [number] ? true
	: [bounded] extends [string] ? true
	: [bounded] extends [array] ? true
	: false

export type validateBound<
	boundedAst,
	comparator extends Comparator,
	limit extends LimitLiteral,
	boundKind extends BoundExpressionKind,
	$,
	args
> =
	inferAstRoot<boundedAst, $, args> extends infer bounded ?
		isNumericallyBoundable<bounded> extends true ?
			limit extends number ?
				validateAst<boundedAst, $, args>
			:	ErrorMessage<writeInvalidLimitMessage<comparator, limit, boundKind>>
		: [bounded] extends [Date] ?
			// allow numeric or date literal as a Date limit
			validateAst<boundedAst, $, args>
		: [bounded] extends [InferredMorph] ?
			ErrorMessage<writeConstrainedMorphMessage<boundedAst>>
		:	ErrorMessage<writeUnboundableMessage<typeToString<bounded>>>
	:	never

export type writeDoubleRightBoundMessage<root extends string> =
	`Expression ${root} must have at most one right bound`

export type validateRange<l, comparator extends Comparator, r, $, args> =
	[l] extends [LimitLiteral] ? validateBound<r, comparator, l, "left", $, args>
	: [l] extends [[infer leftAst, Comparator, unknown]] ?
		ErrorMessage<writeDoubleRightBoundMessage<astToString<leftAst>>>
	:	validateBound<l, comparator, r & LimitLiteral, "right", $, args>
