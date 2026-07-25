/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Graph.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Edge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutableHashMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Walker<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Kind = "directed" | "undirected"

export interface Graph<out N, out E, T extends Kind = "directed"> extends Proto<N, E> {
  readonly type: T
  readonly mutable: false
}

export type DirectedGraph<N, E> = Graph<N, E, "directed">

export type UndirectedGraph<N, E> = Graph<N, E, "undirected">

export type NodeIndex = number

export interface MutableGraph<in out N, in out E, T extends Kind = "directed">
  extends Iterable<readonly [NodeIndex, N]>, Equal.Equal, Pipeable, Inspectable
{
  readonly [TypeId]: MutableGraph.Variance<N, E>
  readonly type: T
  readonly mutable: true
}

export type MutableDirectedGraph<N, E> = MutableGraph<N, E, "directed">

export type MutableUndirectedGraph<N, E> = MutableGraph<N, E, "undirected">

export type NodeMaps<N, I> = {
  readonly byIdentity: MutableHashMap.MutableHashMap<I, N>
  readonly byIndex: Map<NodeIndex, I>
}

export type NodeWalker<N> = Walker<NodeIndex, N>

export type EdgeIndex = number

export type EdgeWalker<E> = Walker<EdgeIndex, Edge<E>>
