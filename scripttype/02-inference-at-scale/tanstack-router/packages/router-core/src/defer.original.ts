/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/defer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type DeferredPromiseState<T> =
  | {
      status: 'pending'
      data?: T
      error?: unknown
    }
  | {
      status: 'success'
      data: T
    }
  | {
      status: 'error'
      data?: T
      error: unknown
    }

export type DeferredPromise<T> = Promise<T> & {
  [TSR_DEFERRED_PROMISE]: DeferredPromiseState<T>
}
