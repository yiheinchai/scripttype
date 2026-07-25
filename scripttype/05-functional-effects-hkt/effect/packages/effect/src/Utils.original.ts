/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Generator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Kind<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeLambda<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Types<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface Variance<in out F extends TypeLambda, in R, out O, out E> {
  readonly _F: Types.Invariant<F>
  readonly _R: Types.Contravariant<R>
  readonly _O: Types.Covariant<O>
  readonly _E: Types.Covariant<E>
}

export type Gen<F extends TypeLambda> = <
  Self,
  K extends Variance<F, any, any, any> | Kind<F, any, any, any, any>,
  A
>(
  ...args:
    | [
      self: Self,
      body: (this: Self) => Generator<K, A, never>
    ]
    | [
      body: () => Generator<K, A, never>
    ]
) => Kind<
  F,
  [K] extends [Variance<F, infer R, any, any>] ? R
    : [K] extends [Kind<F, infer R, any, any, any>] ? R
    : never,
  [K] extends [Variance<F, any, infer O, any>] ? O
    : [K] extends [Kind<F, any, infer O, any, any>] ? O
    : never,
  [K] extends [Variance<F, any, any, infer E>] ? E
    : [K] extends [Kind<F, any, any, infer E, any>] ? E
    : never,
  A
>
