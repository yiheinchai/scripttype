/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/RcMap.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type State<K, A, E> = State.Open<K, A, E> | State.Closed
