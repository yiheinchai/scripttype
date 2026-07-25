/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/lit-query/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Accessor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateMutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateQueriesControllerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateQueriesResults<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type QueryControllerOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Accessor<
  CreateQueryOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>
>

export type QueryControllerResult<
  TData = unknown,
  TError = DefaultError,
> = QueryObserverResult<TData, TError>

export type InfiniteQueryControllerOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = Accessor<
  CreateInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>
>

export type MutationControllerOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = Accessor<CreateMutationOptions<TData, TError, TVariables, TOnMutateResult>>

export type MutationControllerResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = MutationObserverResult<TData, TError, TVariables, TOnMutateResult>

export type QueriesControllerOptions<
  TQueryOptions extends Array<any> = Array<any>,
  TCombinedResult = CreateQueriesResults<TQueryOptions>,
> = Accessor<CreateQueriesControllerOptions<TQueryOptions, TCombinedResult>>
