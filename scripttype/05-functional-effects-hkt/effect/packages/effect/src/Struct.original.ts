/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Struct.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Simplify<T> = { [K in keyof T]: T[K] } & {}

export type Mutable<T> = { -readonly [K in keyof T]: T[K] } & {}

export type Assign<T, U> = Simplify<keyof T & keyof U extends never ? T & U : Omit<T, keyof T & keyof U> & U>

export type Evolver<S> = { readonly [K in keyof S]?: (a: S[K]) => unknown }

export type Evolved<S, E> = Simplify<
  { [K in keyof S]: K extends keyof E ? (E[K] extends (...a: any) => infer R ? R : S[K]) : S[K] }
>

export type KeyEvolver<S> = { readonly [K in keyof S]?: (k: K) => PropertyKey }

export type KeyEvolved<S, E> = Simplify<
  { [K in keyof S as K extends keyof E ? (E[K] extends ((k: K) => infer R extends PropertyKey) ? R : K) : K]: S[K] }
>

export type EntryEvolver<S> = { readonly [K in keyof S]?: (k: K, v: S[K]) => [PropertyKey, unknown] }

export type EntryEvolved<S, E> = {
  [
    K in keyof S as K extends keyof E ?
      E[K] extends ((k: K, v: S[K]) => [infer NK extends PropertyKey, infer _V]) ? NK : K
      : K
  ]: K extends keyof E ? E[K] extends ((k: K, v: S[K]) => [infer _NK, infer V]) ? V
    : S[K] :
    S[K]
}

export interface Lambda {
  readonly "~lambda.in": unknown
  readonly "~lambda.out": unknown
}

export type Apply<L extends Lambda, V> = (L & { readonly "~lambda.in": V })["~lambda.out"]
