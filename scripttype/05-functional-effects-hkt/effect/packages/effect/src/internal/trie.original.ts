/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/internal/trie.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TraversalMap<K, V, A> = (k: K, v: V) => A

export type TraversalFilter<K, V> = (k: K, v: V) => boolean
