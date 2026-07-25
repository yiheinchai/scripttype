/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Exit.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cause<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Success<out A, out E = never> extends Exit.Proto<A, E> {
  readonly _tag: "Success"
  readonly value: A
}

export interface Failure<out A, out E> extends Exit.Proto<A, E> {
  readonly _tag: "Failure"
  readonly cause: Cause.Cause<E>
}

export type Exit<A, E = never> = Success<A, E> | Failure<A, E>
