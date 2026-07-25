/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/shared/implement.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseErrorContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseNode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseNodeDeclaration<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseNormalizedSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseRoot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseScope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Disjoint<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Inner<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Json<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type JsonStructure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NodeConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NodeParseContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ResolvedScopeConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type arrayIndexOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type constraintKinds<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type errorContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type listable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type makeRootAndArrayPropertiesMutable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type nodeKinds<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type nodeOfKind<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type refinementKinds<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type requireKeys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type rootKinds<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type schemaKindOrRightOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type show<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RootKind = (typeof rootKinds)[number]

export type ConstraintKind = (typeof constraintKinds)[number]

export type NodeKind = RootKind | ConstraintKind

export type accumulateRightKinds<remaining extends readonly NodeKind[], result> =
	remaining extends (
		readonly [infer head extends NodeKind, ...infer tail extends NodeKind[]]
	) ?
		accumulateRightKinds<tail, result & { [k in head]: tail[number] }>
	:	result

export type OrderedNodeKinds = typeof nodeKinds

export type RightsByKind = accumulateRightKinds<OrderedNodeKinds, {}>

export type kindRightOf<kind extends NodeKind> = RightsByKind[kind]

export type kindOrRightOf<kind extends NodeKind> = kind | kindRightOf<kind>

export type kindLeftOf<kind extends NodeKind> = Exclude<
	NodeKind,
	kindOrRightOf<kind>
>

export type kindOrLeftOf<kind extends NodeKind> = kind | kindLeftOf<kind>

export interface IntersectionContext extends InternalIntersectionOptions {
	$: BaseScope
	invert: boolean
}

export type ConstraintIntersection<
	lKind extends ConstraintKind,
	rKind extends kindOrRightOf<lKind>
> = (
	l: nodeOfKind<lKind>,
	r: nodeOfKind<rKind>,
	ctx: IntersectionContext
) => BaseNode | Disjoint | null

export type ConstraintIntersectionMap<kind extends ConstraintKind> = show<
	{
		[_ in kind]: ConstraintIntersection<kind, kind>
	} & {
		[rKind in kindRightOf<kind>]?: ConstraintIntersection<kind, rKind>
	}
>

export type RootIntersection<
	lKind extends RootKind,
	rKind extends schemaKindOrRightOf<lKind>
> = (
	l: nodeOfKind<lKind>,
	r: nodeOfKind<rKind>,
	ctx: IntersectionContext
) => BaseRoot | Disjoint

export type TypeIntersectionMap<kind extends RootKind> = {
	[rKind in schemaKindOrRightOf<kind>]: RootIntersection<kind, rKind>
}

export type IntersectionMap<kind extends NodeKind> =
	kind extends RootKind ? TypeIntersectionMap<kind>
	:	ConstraintIntersectionMap<kind & ConstraintKind>

export type PrecedenceByKind = {
	[i in arrayIndexOf<OrderedNodeKinds> as OrderedNodeKinds[i]]: i
}

export type precedenceOfKind<kind extends NodeKind> = PrecedenceByKind[kind]

export type keyRequiringSchemaDefinition<d extends BaseNodeDeclaration> = Exclude<
	keyof d["normalizedSchema"],
	keyof BaseNormalizedSchema
>

export type NodeKeyImplementation<
	d extends BaseNodeDeclaration,
	k extends keyof d["normalizedSchema"],
	instantiated = k extends keyof d["inner"] ? Exclude<d["inner"][k], undefined>
	:	never
> = requireKeys<
	{
		preserveUndefined?: true
		child?: boolean | ((value: instantiated) => BaseNode[])
		serialize?: (schema: instantiated) => Json
		reduceIo?: (
			ioKind: "in" | "out",
			inner: makeRootAndArrayPropertiesMutable<d["inner"]>,
			value: d["inner"][k]
		) => void
		parse?: (
			schema: Exclude<d["normalizedSchema"][k], undefined>,
			ctx: NodeParseContext<d["kind"]>
		) => instantiated | undefined
	},
	// require parse if we can't guarantee the schema value will be valid on inner
	| (d["normalizedSchema"][k] extends instantiated | undefined ? never
	  :	"parse")
	// require keys containing children specify it, although it can be false in cases like
	// declaredOut where we don't want to treat the node as a child
	| ([instantiated] extends [listable<BaseNode>] ? "child" : never)
>

export type keySchemaDefinitions<d extends BaseNodeDeclaration> = {
	[k in keyRequiringSchemaDefinition<d>]: NodeKeyImplementation<d, k>
}

export type RefinementKind = (typeof refinementKinds)[number]

export interface CommonNodeImplementationInput<d extends BaseNodeDeclaration> {
	kind: d["kind"]
	keys: keySchemaDefinitions<d>
	normalize: (schema: d["schema"], $: BaseScope) => d["normalizedSchema"]
	applyConfig?: (
		schema: d["normalizedSchema"],
		config: ResolvedScopeConfig
	) => d["normalizedSchema"]
	hasAssociatedError: d["errorContext"] extends null ? false : true
	finalizeInnerJson?: (json: {
		[k in keyof d["inner"]]: Json
	}) => JsonStructure
	collapsibleKey?: keyof d["inner"]
	reduce?: (
		inner: d["inner"],
		$: BaseScope
	) => nodeOfKind<d["reducibleTo"]> | Disjoint | undefined
	obviatesBasisDescription?: d["kind"] extends RefinementKind ? true : never
	obviatesBasisExpression?: d["kind"] extends RefinementKind ? true : never
}

export type nodeSchemaaultsImplementationInputFor<kind extends NodeKind> = requireKeys<
	NodeConfig<kind>,
	| "description"
	// if the node's error context is distinct from its inner definition, ensure it is implemented.
	// this occurs for nodes like `union` where the error that occurs is not 1:1 with the existing node,
	// but rather a single failed condition for each branch.
	| (Inner<kind> extends (
			Omit<errorContext<kind>, keyof BaseErrorContext | "description">
	  ) ?
			never
	  :	"expected" & keyof NodeConfig<kind>)
>

export type nodeImplementationInputOf<d extends BaseNodeDeclaration> =
	CommonNodeImplementationInput<d> & {
		intersections: IntersectionMap<d["kind"]>
		defaults: nodeSchemaaultsImplementationInputFor<d["kind"]>
	} & (d["intersectionIsOpen"] extends true ? { intersectionIsOpen: true }
		:	{}) &
		// if the node is declared as reducible to a kind other than its own,
		// there must be a reduce implementation
		(d["reducibleTo"] extends d["kind"] ? {} : { reduce: {} })

export type nodeImplementationOf<d extends BaseNodeDeclaration> =
	nodeImplementationInputOf<d> & {
		intersections: IntersectionMap<d["kind"]>
		intersectionIsOpen: d["intersectionIsOpen"]
		defaults: Required<NodeConfig<d["kind"]>>
	}

export type DescriptionWriter<kind extends NodeKind = NodeKind> = (
	node: nodeOfKind<kind>
) => string
