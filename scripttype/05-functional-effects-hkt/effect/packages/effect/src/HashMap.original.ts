/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/HashMap.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Option<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UpdateFn<V> = (option: Option<V>) => Option<V>

export interface HashMap<out Key, out Value> extends Iterable<[Key, Value]>, Equal, Pipeable, Inspectable {
  readonly [TypeId]: typeof TypeId
}

export type Key<T extends HashMap<any, any>> = [T] extends [HashMap<infer _K, infer _V>] ? _K : never

export type Value<T extends HashMap<any, any>> = [T] extends [HashMap<infer _K, infer _V>] ? _V : never

export type Entry<T extends HashMap<any, any>> = [Key<T>, Value<T>]
