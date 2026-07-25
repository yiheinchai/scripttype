/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/refinements/range.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type RangeKind<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type boundKindPairsByLower<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type propValueOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type LimitInnerValue<kind extends RangeKind = RangeKind> =
	kind extends "before" | "after" ? Date : number

export type LimitKind = "lower" | "upper"

export type RelativeComparator<kind extends LimitKind = LimitKind> = {
	lower: ">" | ">="
	upper: "<" | "<="
}[kind]

export type LowerBoundKind = keyof typeof boundKindPairsByLower

export type BoundKindPairsByLower = {
	min: "max"
	minLength: "maxLength"
	after: "before"
}

export type BoundKindPairsByUpper = {
	max: "min"
	maxLength: "minLength"
	before: "after"
}

export type UpperBoundKind = propValueOf<typeof boundKindPairsByLower>

export type pairedRangeKind<kind extends RangeKind> =
	kind extends LowerBoundKind ? BoundKindPairsByLower[kind]
	:	BoundKindPairsByUpper[kind & UpperBoundKind]

export type writeUnboundableMessage<root extends string> =
	`Bounded expression ${root} must be exactly one of number, string, Array, or Date`
