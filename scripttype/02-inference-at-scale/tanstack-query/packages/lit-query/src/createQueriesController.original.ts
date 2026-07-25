/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/lit-query/src/createQueriesController.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Accessor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefaultError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefinedQueryObserverResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OmitKeyof<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryObserverOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryObserverResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ThrowOnError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValueAccessor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type CreateQueriesInput<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = QueryObserverOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>

export type CreateQueriesInputForController<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = OmitKeyof<CreateQueriesInput<TQueryFnData, TError, TData, TQueryKey>, never>

export type SkipTokenForCreateQueries = symbol

export type GetCreateQueriesInput<T> = T extends {
  queryFnData: infer TQueryFnData
  error?: infer TError
  data: infer TData
}
  ? CreateQueriesInputForController<TQueryFnData, TError, TData>
  : T extends { queryFnData: infer TQueryFnData; error?: infer TError }
    ? CreateQueriesInputForController<TQueryFnData, TError>
    : T extends { data: infer TData; error?: infer TError }
      ? CreateQueriesInputForController<unknown, TError, TData>
      : T extends [infer TQueryFnData, infer TError, infer TData]
        ? CreateQueriesInputForController<TQueryFnData, TError, TData>
        : T extends [infer TQueryFnData, infer TError]
          ? CreateQueriesInputForController<TQueryFnData, TError>
          : T extends [infer TQueryFnData]
            ? CreateQueriesInputForController<TQueryFnData>
            : T extends {
                  queryFn?:
                    | QueryFunction<infer TQueryFnData, infer TQueryKey>
                    | SkipTokenForCreateQueries
                  select?: (data: any) => infer TData
                  throwOnError?: ThrowOnError<any, infer TError, any, any>
                }
              ? CreateQueriesInputForController<
                  TQueryFnData,
                  unknown extends TError ? DefaultError : TError,
                  unknown extends TData ? TQueryFnData : TData,
                  TQueryKey
                >
              : CreateQueriesInputForController

export type GetDefinedOrUndefinedCreateQueriesResult<
  T,
  TData,
  TError = unknown,
> = T extends {
  initialData?: infer TInitialData
}
  ? unknown extends TInitialData
    ? QueryObserverResult<TData, TError>
    : TInitialData extends TData
      ? DefinedQueryObserverResult<TData, TError>
      : TInitialData extends () => infer TInitialDataResult
        ? unknown extends TInitialDataResult
          ? QueryObserverResult<TData, TError>
          : TInitialDataResult extends TData
            ? DefinedQueryObserverResult<TData, TError>
            : QueryObserverResult<TData, TError>
        : QueryObserverResult<TData, TError>
  : QueryObserverResult<TData, TError>

export type GetCreateQueriesResult<T> = T extends {
  queryFnData: any
  error?: infer TError
  data: infer TData
}
  ? GetDefinedOrUndefinedCreateQueriesResult<T, TData, TError>
  : T extends { queryFnData: infer TQueryFnData; error?: infer TError }
    ? GetDefinedOrUndefinedCreateQueriesResult<T, TQueryFnData, TError>
    : T extends { data: infer TData; error?: infer TError }
      ? GetDefinedOrUndefinedCreateQueriesResult<T, TData, TError>
      : T extends [any, infer TError, infer TData]
        ? GetDefinedOrUndefinedCreateQueriesResult<T, TData, TError>
        : T extends [infer TQueryFnData, infer TError]
          ? GetDefinedOrUndefinedCreateQueriesResult<T, TQueryFnData, TError>
          : T extends [infer TQueryFnData]
            ? GetDefinedOrUndefinedCreateQueriesResult<T, TQueryFnData>
            : T extends {
                  queryFn?:
                    | QueryFunction<infer TQueryFnData, any>
                    | SkipTokenForCreateQueries
                  select?: (data: any) => infer TData
                  throwOnError?: ThrowOnError<any, infer TError, any, any>
                }
              ? GetDefinedOrUndefinedCreateQueriesResult<
                  T,
                  unknown extends TData ? TQueryFnData : TData,
                  unknown extends TError ? DefaultError : TError
                >
              : QueryObserverResult

export type MAXIMUM_DEPTH = 20

export type CreateQueriesOptions<
  T extends Array<any>,
  TResults extends Array<any> = [],
  TDepth extends ReadonlyArray<number> = [],
> = TDepth['length'] extends MAXIMUM_DEPTH
  ? Array<CreateQueriesInputForController>
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResults, GetCreateQueriesInput<Head>]
      : T extends [infer Head, ...infer Tails]
        ? CreateQueriesOptions<
            [...Tails],
            [...TResults, GetCreateQueriesInput<Head>],
            [...TDepth, 1]
          >
        : ReadonlyArray<unknown> extends T
          ? T
          : T extends Array<
                CreateQueriesInputForController<
                  infer TQueryFnData,
                  infer TError,
                  infer TData,
                  infer TQueryKey
                >
              >
            ? Array<
                CreateQueriesInputForController<
                  TQueryFnData,
                  TError,
                  TData,
                  TQueryKey
                >
              >
            : Array<CreateQueriesInputForController>

export type CreateQueriesResults<
  T extends Array<any>,
  TResults extends Array<any> = [],
  TDepth extends ReadonlyArray<number> = [],
> = TDepth['length'] extends MAXIMUM_DEPTH
  ? Array<QueryObserverResult>
  : T extends []
    ? []
    : T extends [infer Head]
      ? [...TResults, GetCreateQueriesResult<Head>]
      : T extends [infer Head, ...infer Tails]
        ? CreateQueriesResults<
            [...Tails],
            [...TResults, GetCreateQueriesResult<Head>],
            [...TDepth, 1]
          >
        : { [K in keyof T]: GetCreateQueriesResult<T[K]> }

export type CreateQueriesControllerOptions<
  TQueryOptions extends Array<any> = Array<any>,
  TCombinedResult = CreateQueriesResults<TQueryOptions>,
> = {
  /** Query options to observe, or a getter that returns the current options. */
  queries: Accessor<
    | readonly [...CreateQueriesOptions<TQueryOptions>]
    | readonly [
        ...{
          [K in keyof TQueryOptions]: GetCreateQueriesInput<TQueryOptions[K]>
        },
      ]
  >
  /** Optional function that combines the query result array into one value. */
  combine?: (result: CreateQueriesResults<TQueryOptions>) => TCombinedResult
}

export type QueriesResultAccessor<TCombinedResult> =
  ValueAccessor<TCombinedResult> & {
    /** Removes the controller from its Lit host and unsubscribes observers. */
    destroy: () => void
  }
