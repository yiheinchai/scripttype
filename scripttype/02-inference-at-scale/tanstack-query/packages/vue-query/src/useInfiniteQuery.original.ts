/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/vue-query/src/useInfiniteQuery.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DeepUnwrapRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeRefDeep<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeRefOrGetter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ShallowOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseBaseQueryReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UseInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = MaybeRef<
  {
    [Property in keyof InfiniteQueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >]: Property extends 'enabled'
      ? MaybeRefOrGetter<
          InfiniteQueryObserverOptions<
            TQueryFnData,
            TError,
            TData,
            DeepUnwrapRef<TQueryKey>,
            TPageParam
          >[Property]
        >
      : MaybeRefDeep<
          InfiniteQueryObserverOptions<
            TQueryFnData,
            TError,
            TData,
            DeepUnwrapRef<TQueryKey>,
            TPageParam
          >[Property]
        >
  } & ShallowOption
>

export type UseInfiniteQueryReturnType<TData, TError> = UseBaseQueryReturnType<
  TData,
  TError,
  InfiniteQueryObserverResult<TData, TError>
>
