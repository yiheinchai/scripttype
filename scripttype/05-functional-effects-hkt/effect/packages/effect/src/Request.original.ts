/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Request.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface Request<out A, out E = never, out R = never> extends Variance<A, E, R> {}

export type Error<T extends Request<any, any, any>> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _E : never

export type Success<T extends Request<any, any, any>> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _A
  : never

export type Services<T extends Request<any, any, any>> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _R
  : never

export type Result<T extends Request<any, any, any>> = T extends Request<infer A, infer E, infer _R> ? Exit.Exit<A, E>
  : never
