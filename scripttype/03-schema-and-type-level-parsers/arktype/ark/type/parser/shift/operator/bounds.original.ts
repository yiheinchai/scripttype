/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/shift/operator/bounds.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Comparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferredAst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvertedComparators<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaxComparator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scanner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type astToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type parseOperand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type writeUnpairableComparatorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ComparatorStartChar =
	Comparator extends `${infer char}${string}` ? char : never

export type OneCharComparator = ">" | "<"

export type shiftComparator<
	start extends ComparatorStartChar,
	unscanned extends string
> =
	unscanned extends `=${infer nextUnscanned}` ? [`${start}=`, nextUnscanned]
	:	[start & OneCharComparator, unscanned]

export type BoundExpressionKind = "left" | "right"

export type writeInvalidLimitMessage<
	comparator extends Comparator,
	limit extends string | number,
	boundKind extends BoundExpressionKind
> = `Comparator ${boundKind extends "left" ? InvertedComparators[comparator]
:	comparator} must be ${boundKind extends "left" ? "preceded"
:	"followed"} by a corresponding literal (was ${limit})`

export type parseRightBound<
	s extends StaticState,
	comparator extends Comparator,
	$,
	args
> =
	parseOperand<s, $, args> extends infer nextState extends StaticState ?
		nextState["root"] extends (
			InferredAst<unknown, `${infer limit extends number | DateLiteral}`>
		) ?
			s["branches"]["leftBound"] extends {} ?
				comparator extends MaxComparator ?
					s.reduceRange<
						s,
						s["branches"]["leftBound"]["limit"],
						s["branches"]["leftBound"]["comparator"],
						comparator,
						limit,
						nextState["unscanned"]
					>
				:	s.error<writeUnpairableComparatorMessage<comparator>>
			:	s.reduceSingleBound<s, comparator, limit, nextState["unscanned"]>
		:	s.error<
				writeInvalidLimitMessage<
					comparator,
					astToString<nextState["root"]>,
					"right"
				>
			>
	:	never

export type parseBound<
	s extends StaticState,
	start extends ComparatorStartChar,
	unscanned extends string,
	$,
	args
> =
	shiftComparator<start, unscanned> extends infer shiftResultOrError ?
		shiftResultOrError extends (
			Scanner.shiftResult<
				infer comparator extends Comparator,
				infer nextUnscanned
			>
		) ?
			s["root"] extends (
				InferredAst<
					Date | number,
					`${infer limit extends number | DateLiteral}`
				>
			) ?
				s.reduceLeftBound<s, limit, comparator, nextUnscanned>
			:	parseRightBound<s.scanTo<s, nextUnscanned>, comparator, $, args>
		:	shiftResultOrError
	:	never
