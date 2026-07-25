/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/lit-query/src/createQueryController.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueAccessor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>

export type QueryResultAccessor<TData, TError> = ValueAccessor<
  QueryObserverResult<TData, TError>
> & {
  /** Refetches the current query. */
  refetch: QueryObserverResult<TData, TError>['refetch']
  /** Resolves with an optimistic query result, fetching first when needed. */
  suspense: () => Promise<QueryObserverResult<TData, TError>>
  /** Removes the controller from its Lit host and unsubscribes observers. */
  destroy: () => void
}
