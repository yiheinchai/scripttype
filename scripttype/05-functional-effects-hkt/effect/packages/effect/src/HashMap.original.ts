/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/HashMap.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Option<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UpdateFn<V> = (option: Option<V>) => Option<V>

export interface HashMap<out Key, out Value> extends Iterable<[Key, Value]>, Equal, Pipeable, Inspectable {
  readonly [TypeId]: typeof TypeId
}

export type Key<T extends HashMap<any, any>> = [T] extends [HashMap<infer _K, infer _V>] ? _K : never

export type Value<T extends HashMap<any, any>> = [T] extends [HashMap<infer _K, infer _V>] ? _V : never

export type Entry<T extends HashMap<any, any>> = [Key<T>, Value<T>]
