/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/vue-query/src/useBaseQuery.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Ref<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UseBaseQueryReturnType<
  TData,
  TError,
  TResult = QueryObserverResult<TData, TError>,
> = {
  [K in keyof TResult]: K extends
    | 'fetchNextPage'
    | 'fetchPreviousPage'
    | 'refetch'
    ? TResult[K]
    : Ref<Readonly<TResult>[K]>
} & {
  suspense: () => Promise<TResult>
}

export type UseQueryOptionsGeneric<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> =
  | UseQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
  | UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
