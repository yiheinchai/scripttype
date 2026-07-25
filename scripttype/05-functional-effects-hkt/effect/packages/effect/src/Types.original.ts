/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TupleOf_<T, N extends number, R extends Array<unknown>> = `${N}` extends `-${number}` ? never
  : R["length"] extends N ? R
  : TupleOf_<T, N, [T, ...R]>

export type TupleOf<N extends number, T> = N extends N ? number extends N ? Array<T> : TupleOf_<T, N, []> : never

export type TupleOfAtLeast<N extends number, T> = [...TupleOf<N, T>, ...Array<T>]

export type Tags<E> = E extends { readonly _tag: string } ? E["_tag"] : never

export type ExcludeTag<E, K extends string> = Exclude<E, { readonly _tag: K }>

export type ExtractTag<E, K extends string> = E extends { readonly _tag: infer T } ? K extends T ? E : never : never

export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R
  : never

export type Simplify<A> = {
  [K in keyof A]: A[K]
} extends infer B ? B : never

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2 ? true
  : false

export type EqualsWith<A, B, Y, N> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Y : N

export type Has<A, Key extends string> = (Key extends infer K ? K extends keyof A ? true : never : never) extends never
  ? false
  : true

export type MergeRight<Target, Source> = Simplify<
  & Source
  & {
    [Key in keyof Target as Key extends keyof Source ? never : Key]: Target[Key]
  }
>

export type MergeLeft<Source, Target> = MergeRight<Target, Source>

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type DeepMutable<T> = T extends ReadonlyMap<infer K, infer V> ? Map<DeepMutable<K>, DeepMutable<V>>
  : T extends ReadonlySet<infer V> ? Set<DeepMutable<V>>
  : T extends string | number | boolean | bigint | symbol | Function ? T
  : { -readonly [K in keyof T]: DeepMutable<T[K]> }

export type NoInfer<A> = [A][A extends any ? 0 : never]

export type Invariant<A> = (_: A) => A

export type Contravariant<A> = (_: A) => void

export type Type<A> = A extends Contravariant<infer U> ? U : never

export type Covariant<A> = (_: never) => A

export type VoidIfEmpty<S> = keyof S extends never ? void : S

export type NotFunction<T> = T extends Function ? never : T

export type NoExcessProperties<T, U> = T & Readonly<Record<Exclude<keyof U, keyof T>, never>>

export type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true

export type ReasonOf<E> = E extends { readonly reason: infer R } ? R : never

export type ReasonTags<E> = E extends { readonly reason: { readonly _tag: string } } ? E["reason"]["_tag"]
  : never

export type ExtractReason<E, K extends string> = E extends { readonly reason: infer R }
  ? R extends { readonly _tag: infer T } ? K extends T ? R : never
  : never
  : never

export type NarrowReason<E, K extends string> = E extends { readonly reason: infer R }
  ? R extends { readonly _tag: infer T } ? K extends T ? E & { readonly reason: R } : never
  : never
  : never

export type OmitReason<E, K extends string> = E extends { readonly reason: infer R }
  ? R extends { readonly _tag: infer T } ? K extends T ? never : E & { readonly reason: R }
  : never
  : never

export type ExcludeReason<E, K extends string> = E extends { readonly reason: infer R }
  ? Exclude<R, { readonly _tag: K }>
  : never

export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T]
