/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/svelte-query/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedQueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutateFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Mutation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationFilters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OmitKeyof<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Override<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Accessor<T> = () => T

export type CreateBaseQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>

export type CreateBaseQueryResult<
  TData = unknown,
  TError = DefaultError,
> = QueryObserverResult<TData, TError>

export type CreateQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = CreateBaseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>

export type CreateQueryResult<
  TData = unknown,
  TError = DefaultError,
> = CreateBaseQueryResult<TData, TError>

export type CreateInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = InfiniteQueryObserverOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam
>

export type CreateInfiniteQueryResult<
  TData = unknown,
  TError = DefaultError,
> = InfiniteQueryObserverResult<TData, TError>

export type DefinedCreateBaseQueryResult<
  TData = unknown,
  TError = DefaultError,
> = DefinedQueryObserverResult<TData, TError>

export type DefinedCreateQueryResult<
  TData = unknown,
  TError = DefaultError,
> = DefinedCreateBaseQueryResult<TData, TError>

export type CreateMutationOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = OmitKeyof<
  MutationObserverOptions<TData, TError, TVariables, TOnMutateResult>,
  '_defaulted'
>

export type CreateMutateFunction<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = (
  ...args: Parameters<
    MutateFunction<TData, TError, TVariables, TOnMutateResult>
  >
) => void

export type CreateMutateAsyncFunction<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = MutateFunction<TData, TError, TVariables, TOnMutateResult>

export type CreateBaseMutationResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TOnMutateResult = unknown,
> = Override<
  MutationObserverResult<TData, TError, TVariables, TOnMutateResult>,
  { mutate: CreateMutateFunction<TData, TError, TVariables, TOnMutateResult> }
> & {
  mutateAsync: CreateMutateAsyncFunction<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >
}

export type CreateMutationResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = unknown,
  TOnMutateResult = unknown,
> = CreateBaseMutationResult<TData, TError, TVariables, TOnMutateResult>

export type MutationStateOptions<TResult = MutationState> = {
  filters?: MutationFilters
  select?: (
    mutation: Mutation<unknown, DefaultError, unknown, unknown>,
  ) => TResult
}
