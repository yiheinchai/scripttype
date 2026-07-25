/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/lit-query/src/queryObserverResultTracker.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TrackableQueryObserver<TResult extends object> = {
  options: { notifyOnChangeProps?: unknown }
  trackResult: (result: TResult) => unknown
}
