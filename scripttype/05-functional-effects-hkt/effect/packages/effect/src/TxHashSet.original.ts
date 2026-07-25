/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/TxHashSet.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HashSet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TxRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TxHashSet<in out V> extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly ref: TxRef.TxRef<HashSet.HashSet<V>>
}

export type Value<T> = T extends TxHashSet<infer V> ? V : never
