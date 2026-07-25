/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Result.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Success<T extends Result<any, any>> = [T] extends [Result<infer _A, infer _E>] ? _A : never

export type Failure<T extends Result<any, any>> = [T] extends [Result<infer _A, infer _E>] ? _E : never

export type Result<A, E = never> = Success<A, E> | Failure<A, E>
