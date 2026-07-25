/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Unify.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NonNullable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type MaybeReturn<F> = F extends () => infer R ? R : NonNullable<F>

export type Keys<X extends [any, any]> = X extends [infer A, infer Ignore] ? Exclude<keyof A, Ignore>
  : never

export type Values<X extends [any, any]> = X extends [infer A, infer Ignore]
  ? Keys<[A, Ignore]> extends infer K ? K extends keyof A ? MaybeReturn<A[K]> : never : never
  : never

export type Ignore<X> = X extends { [ignoreSymbol]?: infer Obj } ? keyof NonNullable<Obj>
  : never

export type ExtractTypes<
  X
> = X extends {
  [typeSymbol]?: infer _Type
  [unifySymbol]?: infer _Unify
} ? [NonNullable<_Unify>, Ignore<X>]
  : never

export type typeSymbol = typeof typeSymbol

export type FilterIn<A> = A extends any ? typeSymbol extends keyof A ? A : never : never

export type FilterInUnmatched<A, K> = A extends any
  ? typeSymbol extends keyof A
    ? A extends { [unifySymbol]?: infer U } ? [Extract<keyof NonNullable<U>, K>] extends [never] ? A : never
    : A
  : never
  : never

export type FilterOut<A> = A extends any ? typeSymbol extends keyof A ? never : A : never

export type Unify<A> = Values<
  ExtractTypes<
    (
      & FilterIn<A>
      & { [typeSymbol]: A }
    )
  >
> extends infer Z ?
    | Z
    | FilterInUnmatched<
      A,
      Keys<
        ExtractTypes<
          (
            & FilterIn<A>
            & { [typeSymbol]: A }
          )
        >
      >
    >
    | FilterOut<A>
  : never
