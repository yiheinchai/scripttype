/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/mutation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface ContinueAction {
  type: 'continue'
}

export interface ErrorAction<TError> {
  type: 'error'
  error: TError
}

export interface FailedAction<TError> {
  type: 'failed'
  failureCount: number
  error: TError | null
}

export interface PendingAction<TVariables, TOnMutateResult> {
  type: 'pending'
  isPaused: boolean
  variables?: TVariables
  context?: TOnMutateResult
}

export interface PauseAction {
  type: 'pause'
}

export interface SuccessAction<TData> {
  type: 'success'
  data: TData
}

export type Action<TData, TError, TVariables, TOnMutateResult> =
  | ContinueAction
  | ErrorAction<TError>
  | FailedAction<TError>
  | PendingAction<TVariables, TOnMutateResult>
  | PauseAction
  | SuccessAction<TData>
