/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Predicate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface Refinement<in A, out B extends A> {
  (a: A): a is B
}

export type Any = Refinement<any, any>

export type In<T extends Any> = [T] extends [Refinement<infer _A, infer _>] ? _A : never

export type Out<T extends Any> = [T] extends [Refinement<infer _, infer _B>] ? _B : never
