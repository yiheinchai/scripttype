/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/jsx/context.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type AsyncLocalStorageLike<T> = {
  getStore(): T | undefined
  run<R>(store: T, callback: () => R): R
}
