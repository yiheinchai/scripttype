/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/refinements/range.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type RangeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type boundKindPairsByLower<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type propValueOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
