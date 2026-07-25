/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/lit-query/src/createInfiniteQueryController.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueAccessor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = InfiniteQueryObserverOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam
>

export type InfiniteQueryResultAccessor<TData, TError> = ValueAccessor<
  InfiniteQueryObserverResult<TData, TError>
> & {
  /** Refetches the current infinite query. */
  refetch: InfiniteQueryObserverResult<TData, TError>['refetch']
  /** Fetches the next page for the current infinite query. */
  fetchNextPage: InfiniteQueryObserverResult<TData, TError>['fetchNextPage']
  /** Fetches the previous page for the current infinite query. */
  fetchPreviousPage: InfiniteQueryObserverResult<
    TData,
    TError
  >['fetchPreviousPage']
  /** Removes the controller from its Lit host and unsubscribes observers. */
  destroy: () => void
}
