/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/shared/traversal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Traversal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InternalTraversal = Omit<Traversal, "error" | "mustBe" | "reject">

export type TraverseAllows<data = unknown> = (
	data: data,
	ctx: InternalTraversal
) => boolean

export type TraverseApply<data = unknown> = (
	data: data,
	ctx: InternalTraversal
) => void

export type TraversalMethodsByKind<input = unknown> = {
	Allows: TraverseAllows<input>
	Apply: TraverseApply<input>
	Optimistic: TraverseApply<input>
}
