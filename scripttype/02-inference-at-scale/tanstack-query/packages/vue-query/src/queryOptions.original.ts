/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/vue-query/src/queryOptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DeepUnwrapRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InitialDataFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeRefOrGetter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonUndefinedGuard<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryBooleanOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ShallowOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = {
  [Property in keyof QueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryData,
    TQueryKey
  >]: Property extends 'enabled'
    ?
        | MaybeRefOrGetter<boolean | undefined>
        | (() => QueryBooleanOption<
            TQueryFnData,
            TError,
            TQueryData,
            DeepUnwrapRef<TQueryKey>
          >)
    : Property extends 'queryKey'
      ? MaybeRefOrGetter<TQueryKey>
      : QueryObserverOptions<
          TQueryFnData,
          TError,
          TData,
          TQueryData,
          DeepUnwrapRef<TQueryKey>
        >[Property]
} & ShallowOption

export type UndefinedInitialQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = QueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey> & {
  initialData?:
    | undefined
    | InitialDataFunction<NonUndefinedGuard<TQueryFnData>>
    | NonUndefinedGuard<TQueryFnData>
}

export type DefinedInitialQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = QueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey> & {
  initialData:
    | NonUndefinedGuard<TQueryFnData>
    | (() => NonUndefinedGuard<TQueryFnData>)
}
