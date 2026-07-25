/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/query.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FetchStatus<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryStatus<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
  error: TError
}

export type FetchDirection = 'forward' | 'backward'

export interface FetchMeta {
  fetchMore?: { direction: FetchDirection }
}

export interface FetchAction {
  type: 'fetch'
  meta?: FetchMeta
}

export interface InvalidateAction {
  type: 'invalidate'
}

export interface PauseAction {
  type: 'pause'
}

export interface QueryState<TData = unknown, TError = DefaultError> {
  data: TData | undefined
  dataUpdateCount: number
  dataUpdatedAt: number
  error: TError | null
  errorUpdateCount: number
  errorUpdatedAt: number
  fetchFailureCount: number
  fetchFailureReason: TError | null
  fetchMeta: FetchMeta | null
  isInvalidated: boolean
  status: QueryStatus
  fetchStatus: FetchStatus
}

export interface SetStateAction<TData, TError> {
  type: 'setState'
  state: Partial<QueryState<TData, TError>>
}

export interface SuccessAction<TData> {
  data: TData | undefined
  type: 'success'
  dataUpdatedAt?: number
  manual?: boolean
}

export type Action<TData, TError> =
  | ContinueAction
  | ErrorAction<TError>
  | FailedAction<TError>
  | FetchAction
  | InvalidateAction
  | PauseAction
  | SetStateAction<TData, TError>
  | SuccessAction<TData>
