/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Pull.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cause<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Success<P> = P extends Effect<infer _A, infer _E, infer _R> ? _A : never

export type Error<P> = P extends Effect<infer _A, infer _E, infer _R> ? _E extends Cause.Done<infer _L> ? never : _E
  : never

export type Leftover<P> = P extends Effect<infer _A, infer _E, infer _R> ? _E extends Cause.Done<infer _L> ? _L : never
  : never

export type Services<P> = P extends Effect<infer _A, infer _E, infer _R> ? _R : never

export type ExcludeDone<E> = Exclude<E, Cause.Done<any>>
