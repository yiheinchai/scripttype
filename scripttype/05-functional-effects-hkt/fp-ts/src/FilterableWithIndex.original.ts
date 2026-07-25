/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/fp-ts/src/FilterableWithIndex.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B

export type PredicateWithIndex<I, A> = (i: I, a: A) => boolean
