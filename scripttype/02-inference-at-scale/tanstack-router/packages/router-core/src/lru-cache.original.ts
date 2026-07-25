/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/lru-cache.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type LRUCache<TKey, TValue> = {
  get: (key: TKey) => TValue | undefined
  set: (key: TKey, value: TValue) => void
  clear: () => void
}
