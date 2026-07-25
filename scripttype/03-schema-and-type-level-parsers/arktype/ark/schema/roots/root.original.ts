/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/roots/root.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LimitSchemaValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prop<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Union<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownRangeSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type kindRightOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type reducibleKindOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type exclusivizeRangeSchema<schema extends UnknownRangeSchema> =
	schema extends LimitSchemaValue ? { rule: schema; exclusive: true } : schema

export type asymmetricIntersectionOf<l extends NodeKind, r extends NodeKind> =
	l extends unknown ?
		r extends kindRightOf<l> ?
			l | reducibleKindOf<l>
		:	never
	:	never

export type intersectRoot<l extends RootKind, r extends NodeKind> =
	[l, r] extends [r, l] ? l
	:	asymmetricIntersectionOf<l, r> | asymmetricIntersectionOf<r, l>

export type schemaKindRightOf<kind extends RootKind> = Extract<
	kindRightOf<kind>,
	RootKind
>

export type schemaKindOrRightOf<kind extends RootKind> =
	| kind
	| schemaKindRightOf<kind>

export type StructuralOperationBranchResultByName = {
	keyof: Union.ChildNode
	pick: Union.ChildNode
	omit: Union.ChildNode
	get: Union.ChildNode
	map: Union.ChildNode
	required: Union.ChildNode
	partial: Union.ChildNode
	merge: Union.ChildNode
	props: array<Prop.Node>
}

export type StructuralOperationName =
	keyof StructuralOperationBranchResultByName

export type writeNonStructuralOperandMessage<
	operation extends StructuralOperationName,
	operand extends string
> = `${operation} operand must be an object (was ${operand})`
