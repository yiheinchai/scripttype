/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/thenable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface Fulfilled<T> {
  status: 'fulfilled'
  value: T
}

export type FulfilledThenable<T> = Promise<T> & Fulfilled<T>

export interface Rejected {
  status: 'rejected'
  reason: unknown
}

export type RejectedThenable<T> = Promise<T> & Rejected

export interface Pending<T> {
  status: 'pending'

  /**
   * Resolve the promise with a value.
   * Will remove the `resolve` and `reject` properties from the promise.
   */
  resolve: (value: T) => void
  /**
   * Reject the promise with a reason.
   * Will remove the `resolve` and `reject` properties from the promise.
   */
  reject: (reason: unknown) => void
}

export type PendingThenable<T> = Promise<T> & Pending<T>

export type Thenable<T> =
  | FulfilledThenable<T>
  | RejectedThenable<T>
  | PendingThenable<T>
