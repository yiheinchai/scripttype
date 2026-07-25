/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/roots/intersection.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseNormalizedSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConstraintKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Domain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Intersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OpenNodeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prerequisite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Proto<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndeclaredKeyBehavior<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type listable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type nodeOfKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type constraintKindOf<t> = {
	[k in ConstraintKind]: t extends Prerequisite<k> ? k : never
}[ConstraintKind]

export type conditionalIntersectionKeyOf<t> =
	| constraintKindOf<t>
	| (t extends object ? "undeclared" : never)

export type ConditionalTerminalIntersectionRoot = {
	undeclared?: UndeclaredKeyBehavior
}

export type ConditionalTerminalIntersectionKey =
	keyof ConditionalTerminalIntersectionRoot

export type ConditionalIntersectionKey =
	| ConstraintKind
	| ConditionalTerminalIntersectionKey

export type intersectionChildSchemaValueOf<k extends Intersection.FlattenedChildKind> =
	k extends OpenNodeKind ? listable<NodeSchema<k>> : NodeSchema<k>

export type conditionalSchemaValueOfKey<k extends ConditionalIntersectionKey> =
	k extends Intersection.FlattenedChildKind ? intersectionChildSchemaValueOf<k>
	:	ConditionalTerminalIntersectionRoot[k & ConditionalTerminalIntersectionKey]

export type conditionalRootOf<t> = {
	[k in conditionalIntersectionKeyOf<t>]?: conditionalSchemaValueOfKey<k>
}

export type ConstraintsSchema<inferredBasis = any> = show<
		BaseNormalizedSchema & {
			domain?: Domain.Schema
			proto?: Proto.Schema
		} & conditionalRootOf<inferredBasis>
	>

export type Schema<inferredBasis = any> = ConstraintsSchema<inferredBasis>

export type intersectionChildInnerValueOf<k extends Intersection.FlattenedChildKind> =
	k extends OpenNodeKind ? readonly nodeOfKind<k>[] : nodeOfKind<k>
