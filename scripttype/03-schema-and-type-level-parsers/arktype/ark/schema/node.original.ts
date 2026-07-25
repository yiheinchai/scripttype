/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/node.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseNode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseRoot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GuardablePredicate<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Key<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NodeKind<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type childKindOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type conform<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type nodeOfKind<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type KeyOrKeyNode = Key | BaseRoot

export type FlatRef<root extends BaseRoot = BaseRoot> = {
	path: array<KeyOrKeyNode>
	node: root
	propString: string
}

export type NodeSelector = NodeSelector.Single | NodeSelector.Composite

export type SelectableFn<input, returns, kind extends NodeKind = NodeKind> = {
		// this overload must come first for object key completions to work
		<
			const selector extends NodeSelector.CompositeInput,
			predicate extends GuardablePredicate<
				NodeSelector.inferSelectKind<kind, selector>
			>
		>(
			input: input,
			selector?: NodeSelector.validateComposite<selector, predicate>
		): returns
		<const selector extends NodeSelector.Single>(
			input: input,
			selector?: selector
		): returns
	}

export type Method = "filter" | "assertFilter" | "find" | "assertFind"

export type Boundary = "self" | "child" | "shallow" | "references"

export type Kind = NodeKind

export interface Composite {
		method?: Method
		boundary?: Boundary
		kind?: Kind
		where?: GuardablePredicate<BaseNode>
	}

export type CompositeInput = Omit<Composite, "where">

export type validateComposite<selector, predicate> = {
		[k in keyof selector]: k extends "where" ? predicate
		:	conform<selector[k], CompositeInput[k & keyof CompositeInput]>
	}

export type applyMethod<t, selector> =
		selector extends { method: infer method extends Method } ?
			method extends "filter" ? t[]
			: method extends "assertFilter" ? [t, ...t[]]
			: method extends "find" ? t | undefined
			: method extends "assertFind" ? t
			: never
		:	// default is "filter"
			t[]

export type infer<selfKind extends NodeKind, selector> = applyMethod<
		selector extends NodeSelector.WhereCastInput<any, infer narrowed> ? narrowed
		:	NodeSelector.inferSelectKind<selfKind, selector>,
		selector
	>

export type BoundaryInput<b extends Boundary> = b | { boundary: b }

export type KindInput<k extends Kind> = k | { kind: k }

export type WhereCastInput<kindNode extends BaseNode, narrowed extends kindNode> =
		| ((In: kindNode) => In is narrowed)
		| { where: (In: kindNode) => In is narrowed }

export type selectKind<selfKind extends NodeKind, selector> =
		selector extends BoundaryInput<"self"> ? selfKind
		: selector extends KindInput<infer kind> ? kind
		: selector extends BoundaryInput<"child"> ? selfKind | childKindOf<selfKind>
		: NodeKind

export type inferSelectKind<selfKind extends NodeKind, selector> =
		selectKind<selfKind, selector> extends infer kind extends NodeKind ?
			NodeKind extends kind ?
				BaseNode
			:	nodeOfKind<kind>
		:	never
