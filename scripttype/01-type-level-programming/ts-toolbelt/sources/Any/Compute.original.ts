/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/Compute.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Depth<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Has<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type If<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Key<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ComputeRaw<A extends any> =
    A extends Function
    ? A
    : {[K in keyof A]: A[K]} & unknown

export type ComputeFlat<A extends any> =
    A extends BuiltIn ? A :
    A extends Array<any>
    ? A extends Array<Record<Key, any>>
      ? Array<{[K in keyof A[number]]: A[number][K]} & unknown>
      : A
    : A extends ReadonlyArray<any>
      ? A extends ReadonlyArray<Record<Key, any>>
        ? ReadonlyArray<{[K in keyof A[number]]: A[number][K]} & unknown>
        : A
      : {[K in keyof A]: A[K]} & unknown;

export type ComputeDeep<A extends any, Seen = never> =
    A extends BuiltIn ? A : If<Has<Seen, A>, A, (
      A extends Array<any>
      ? A extends Array<Record<Key, any>>
        ? Array<{[K in keyof A[number]]: ComputeDeep<A[number][K], A | Seen>} & unknown>
        : A
      : A extends ReadonlyArray<any>
        ? A extends ReadonlyArray<Record<Key, any>>
          ? ReadonlyArray<{[K in keyof A[number]]: ComputeDeep<A[number][K], A | Seen>} & unknown>
          : A
        : {[K in keyof A]: ComputeDeep<A[K], A | Seen>} & unknown
    )>;

export type Compute<A extends any, depth extends Depth = 'deep'> = {
    'flat': ComputeFlat<A>
    'deep': ComputeDeep<A>
}[depth]
