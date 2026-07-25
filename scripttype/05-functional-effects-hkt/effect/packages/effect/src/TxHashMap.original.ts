/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/TxHashMap.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HashMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TxRef<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface TxHashMap<in out K, in out V> extends Inspectable, Pipeable {
  readonly [TypeId]: typeof TypeId
  readonly ref: TxRef.TxRef<HashMap.HashMap<K, V>>
}

export type Key<T extends TxHashMap<any, any>> = T extends TxHashMap<infer K, any> ? K : never

export type Value<T extends TxHashMap<any, any>> = T extends TxHashMap<any, infer V> ? V : never

export type Entry<T extends TxHashMap<any, any>> = T extends TxHashMap<infer K, infer V> ? readonly [K, V] : never
