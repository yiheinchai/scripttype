/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/kinds.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Alias<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConstraintKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Divisor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Domain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Index<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Intersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Morph<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OpenNodeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Optional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pattern<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Predicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Proto<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Sequence<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Structure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Union<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type listable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type makeRootAndArrayPropertiesMutable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface NodesByKind extends BoundNodesByKind {
	alias: Alias.Node
	union: Union.Node
	morph: Morph.Node
	intersection: Intersection.Node
	unit: Unit.Node
	proto: Proto.Node
	domain: Domain.Node
	divisor: Divisor.Node
	pattern: Pattern.Node
	predicate: Predicate.Node
	required: Required.Node
	optional: Optional.Node
	index: Index.Node
	sequence: Sequence.Node
	structure: Structure.Node
}

export type nodeOfKind<kind extends NodeKind> = NodesByKind[kind]

export interface NodeDeclarationsByKind extends BoundDeclarations {
	alias: Alias.Declaration
	domain: Domain.Declaration
	unit: Unit.Declaration
	proto: Proto.Declaration
	union: Union.Declaration
	morph: Morph.Declaration
	intersection: Intersection.Declaration
	sequence: Sequence.Declaration
	divisor: Divisor.Declaration
	required: Required.Declaration
	optional: Optional.Declaration
	index: Index.Declaration
	pattern: Pattern.Declaration
	predicate: Predicate.Declaration
	structure: Structure.Declaration
}

export type Declaration<kind extends NodeKind> = NodeDeclarationsByKind[kind]

export type NodeSchema<kind extends NodeKind> = Declaration<kind>["schema"]

export type RootSchema<kind extends RootKind = RootKind> = NodeSchema<kind>

export type NormalizedSchema<kind extends NodeKind> =
	Declaration<kind>["normalizedSchema"]

export type childKindOf<kind extends NodeKind> = Declaration<kind>["childKind"]

export type Prerequisite<kind extends NodeKind> =
	Declaration<kind>["prerequisite"]

export type reducibleKindOf<kind extends NodeKind> =
	Declaration<kind>["reducibleTo"] extends NodeKind ?
		Declaration<kind>["reducibleTo"]
	:	kind

export type Inner<kind extends NodeKind> = Declaration<kind>["inner"]

export type defAttachedAs<kind extends ConstraintKind> =
	kind extends OpenNodeKind ? listable<NodeSchema<kind>> : NodeSchema<kind>

export type innerAttachedAs<kind extends ConstraintKind> =
	kind extends OpenNodeKind ? array<nodeOfKind<kind>> : nodeOfKind<kind>

export type mutableInnerOfKind<kind extends NodeKind> =
	makeRootAndArrayPropertiesMutable<Inner<kind>>

export type mutableNormalizedRootOfKind<kind extends NodeKind> =
	makeRootAndArrayPropertiesMutable<NormalizedSchema<kind>>

export type errorContext<kind extends NodeKind> =
	Declaration<kind>["errorContext"]
