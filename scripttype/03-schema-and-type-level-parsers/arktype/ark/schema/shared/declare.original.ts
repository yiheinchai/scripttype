/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/shared/declare.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Disjoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NarrowedAttachments<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type nodeOfKind<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type reducibleKindOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type show<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type withMetaPrefixedKeys<o> = {
	[k in keyof o as k extends string ? `meta.${k}` : never]: o[k]
}

export interface ArkEnv extends DefaultArkEnv {}

export type TypeMeta = Omit<ArkEnv.meta, "onFail">

export type Collapsible<meta extends TypeMeta = TypeMeta> = meta | string

export type Mapper<meta extends TypeMeta = TypeMeta> = (
		existing: Readonly<meta>
	) => meta

export type MappableInput<meta extends TypeMeta = TypeMeta> =
		| Collapsible<meta>
		| Mapper<meta>

export interface BaseNormalizedSchema extends withMetaPrefixedKeys<TypeMeta> {
	readonly meta?: ArkEnv.meta | string
}

export interface BaseErrorContext<kind extends NodeKind = NodeKind> {
	readonly description?: string
	readonly code: kind
	readonly meta: ArkEnv.meta
}

export interface DeclarationInput {
	kind: NodeKind
	schema: unknown
	normalizedSchema: BaseNormalizedSchema
	inner: object
	errorContext?: BaseErrorContext
	reducibleTo?: NodeKind
	intersectionIsOpen?: true
	prerequisite?: unknown
	childKind?: NodeKind
}

export type defaultErrorContext<d extends DeclarationInput> = show<
	BaseErrorContext<d["kind"]> & d["inner"]
>

export type prerequisiteOf<d extends DeclarationInput> =
	"prerequisite" extends keyof d ? d["prerequisite"] : unknown

export type declareNode<
	d extends {
		[k in keyof d]: k extends keyof DeclarationInput ? DeclarationInput[k]
		:	never
	} & DeclarationInput
> = merge<
	{
		intersectionIsOpen: false
		prerequisite: prerequisiteOf<d>
		childKind: never
		reducibleTo: d["kind"]
		errorContext: null
	},
	d
>

export interface BaseNodeDeclaration {
	kind: NodeKind
	schema: unknown
	normalizedSchema: BaseNormalizedSchema
	inner: {}
	reducibleTo: NodeKind
	prerequisite: any
	intersectionIsOpen: boolean
	childKind: NodeKind
	errorContext: BaseErrorContext | null
}

export type attachedInner<d extends BaseNodeDeclaration> =
	"intersection" & d["kind"] extends never ? d["inner"] : {}

export type attachmentsOf<d extends BaseNodeDeclaration> =
	NarrowedAttachments<d> & attachedInner<d>

export type ownIntersectionResult<d extends BaseNodeDeclaration> =
	| nodeOfKind<reducibleKindOf<d["kind"]>>
	| Disjoint
