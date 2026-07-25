/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Schedule.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface Schedule<out Output, in Input = unknown, out Error = never, out Env = never>
  extends Schedule.Variance<Output, Input, Error, Env>, Pipeable
{}

export type Output<S> = S extends Schedule<infer Output, any, any, any> ? Output : never

export type Input<S> = S extends Schedule<any, infer Input, any, any> ? Input : never

export type Error<S> = S extends Schedule<any, any, infer Error, any> ? Error : never

export type Env<S> = S extends Schedule<any, any, any, infer Env> ? Env : never
