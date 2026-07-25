/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/react-query/src/useQueries.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefinedUseQueryResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OmitKeyof<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueriesPlaceholderDataFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ThrowOnError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseQueryOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseQueryResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UseQueryOptionsForUseQueries<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = OmitKeyof<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'placeholderData' | 'subscribed'
> & {
  placeholderData?: TQueryFnData | QueriesPlaceholderDataFunction<TQueryFnData>
}

export type SkipTokenForUseQueries = symbol

export type GetUseQueryOptionsForUseQueries<T> =
  // Part 1: responsible for applying explicit type parameter to function arguments, if object { queryFnData: TQueryFnData, error: TError, data: TData }
  T extends {
    queryFnData: infer TQueryFnData
    error?: infer TError
    data: infer TData
  }
    ? UseQueryOptionsForUseQueries<TQueryFnData, TError, TData>
    : T extends { queryFnData: infer TQueryFnData; error?: infer TError }
      ? UseQueryOptionsForUseQueries<TQueryFnData, TError>
      : T extends { data: infer TData; error?: infer TError }
        ? UseQueryOptionsForUseQueries<unknown, TError, TData>
        : // Part 2: responsible for applying explicit type parameter to function arguments, if tuple [TQueryFnData, TError, TData]
          T extends [infer TQueryFnData, infer TError, infer TData]
          ? UseQueryOptionsForUseQueries<TQueryFnData, TError, TData>
          : T extends [infer TQueryFnData, infer TError]
            ? UseQueryOptionsForUseQueries<TQueryFnData, TError>
            : T extends [infer TQueryFnData]
              ? UseQueryOptionsForUseQueries<TQueryFnData>
              : // Part 3: responsible for inferring and enforcing type if no explicit parameter was provided
                T extends {
                    queryFn?:
                      | QueryFunction<infer TQueryFnData, infer TQueryKey>
                      | SkipTokenForUseQueries
                    select?: (data: any) => infer TData
                    throwOnError?: ThrowOnError<any, infer TError, any, any>
                  }
                ? UseQueryOptionsForUseQueries<
                    TQueryFnData,
                    unknown extends TError ? DefaultError : TError,
                    unknown extends TData ? TQueryFnData : TData,
                    TQueryKey
                  >
                : // Fallback
                  UseQueryOptionsForUseQueries

export type GetDefinedOrUndefinedQueryResult<T, TData, TError = unknown> = T extends {
  initialData?: infer TInitialData
}
  ? unknown extends TInitialData
    ? UseQueryResult<TData, TError>
    : TInitialData extends TData
      ? DefinedUseQueryResult<TData, TError>
      : TInitialData extends () => infer TInitialDataResult
        ? unknown extends TInitialDataResult
          ? UseQueryResult<TData, TError>
          : TInitialDataResult extends TData
            ? DefinedUseQueryResult<TData, TError>
            : UseQueryResult<TData, TError>
        : UseQueryResult<TData, TError>
  : UseQueryResult<TData, TError>

export type GetUseQueryResult<T> =
  // Part 1: responsible for mapping explicit type parameter to function result, if object
  T extends { queryFnData: any; error?: infer TError; data: infer TData }
    ? GetDefinedOrUndefinedQueryResult<T, TData, TError>
    : T extends { queryFnData: infer TQueryFnData; error?: infer TError }
      ? GetDefinedOrUndefinedQueryResult<T, TQueryFnData, TError>
      : T extends { data: infer TData; error?: infer TError }
        ? GetDefinedOrUndefinedQueryResult<T, TData, TError>
        : // Part 2: responsible for mapping explicit type parameter to function result, if tuple
          T extends [any, infer TError, infer TData]
          ? GetDefinedOrUndefinedQueryResult<T, TData, TError>
          : T extends [infer TQueryFnData, infer TError]
            ? GetDefinedOrUndefinedQueryResult<T, TQueryFnData, TError>
            : T extends [infer TQueryFnData]
              ? GetDefinedOrUndefinedQueryResult<T, TQueryFnData>
              : // Part 3: responsible for mapping inferred type to results, if no explicit parameter was provided
                T extends {
                    queryFn?:
                      | QueryFunction<infer TQueryFnData, any>
                      | SkipTokenForUseQueries
                    select?: (data: any) => infer TData
                    throwOnError?: ThrowOnError<any, infer TError, any, any>
                  }
                ? GetDefinedOrUndefinedQueryResult<
                    T,
                    unknown extends TData ? TQueryFnData : TData,
                    unknown extends TError ? DefaultError : TError
                  >
                : // Fallback
                  UseQueryResult

export type MAXIMUM_DEPTH = 20

export type QueriesOptions<
  T extends Array<any>,
  TResults extends Array<any> = [],
  TDepth extends ReadonlyArray<number> = [],
> = TDepth['length'] extends MAXIMUM_DEPTH
  ? Array<UseQueryOptionsForUseQueries>
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResults, GetUseQueryOptionsForUseQueries<Head>]
      : T extends [infer Head, ...infer Tails]
        ? QueriesOptions<
            [...Tails],
            [...TResults, GetUseQueryOptionsForUseQueries<Head>],
            [...TDepth, 1]
          >
        : ReadonlyArray<unknown> extends T
          ? T
          : // If T is *some* array but we couldn't assign unknown[] to it, then it must hold some known/homogeneous type!
            // use this to infer the param types in the case of Array.map() argument
            T extends Array<
                UseQueryOptionsForUseQueries<
                  infer TQueryFnData,
                  infer TError,
                  infer TData,
                  infer TQueryKey
                >
              >
            ? Array<
                UseQueryOptionsForUseQueries<
                  TQueryFnData,
                  TError,
                  TData,
                  TQueryKey
                >
              >
            : // Fallback
              Array<UseQueryOptionsForUseQueries>

export type QueriesResults<
  T extends Array<any>,
  TResults extends Array<any> = [],
  TDepth extends ReadonlyArray<number> = [],
> = TDepth['length'] extends MAXIMUM_DEPTH
  ? Array<UseQueryResult>
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResults, GetUseQueryResult<Head>]
      : T extends [infer Head, ...infer Tails]
        ? QueriesResults<
            [...Tails],
            [...TResults, GetUseQueryResult<Head>],
            [...TDepth, 1]
          >
        : { [K in keyof T]: GetUseQueryResult<T[K]> }
