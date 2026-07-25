/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Request.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Request<out A, out E = never, out R = never> extends Variance<A, E, R> {}

export type Error<T extends Request<any, any, any>> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _E : never

export type Success<T extends Request<any, any, any>> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _A
  : never

export type Services<T extends Request<any, any, any>> = [T] extends [Request<infer _A, infer _E, infer _R>] ? _R
  : never

export type Result<T extends Request<any, any, any>> = T extends Request<infer A, infer E, infer _R> ? Exit.Exit<A, E>
  : never
