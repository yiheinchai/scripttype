/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/type/parser/reduce/shared.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type LimitLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type comparators<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type minComparators<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type MinComparator = keyof typeof minComparators

export type writeOpenRangeMessage<
	min extends LimitLiteral,
	comparator extends MinComparator
> = `Left bounds are only valid when paired with right bounds (try ...${comparator}${min})`

export type Comparator = keyof typeof comparators

export type writeUnpairableComparatorMessage<comparator extends Comparator> =
	`Left-bounded expressions must specify their limits using < or <= (was ${comparator})`

export type InvertedComparators = {
	"<": ">"
	">": "<"
	"<=": ">="
	">=": "<="
	"==": "=="
}

export type writeMultipleLeftBoundsMessage<
	openLimit extends LimitLiteral,
	openComparator extends MinComparator,
	limit extends LimitLiteral,
	comparator extends MinComparator
> = `An expression may have at most one left bound (parsed ${openLimit}${InvertedComparators[openComparator]}, ${limit}${InvertedComparators[comparator]})`
