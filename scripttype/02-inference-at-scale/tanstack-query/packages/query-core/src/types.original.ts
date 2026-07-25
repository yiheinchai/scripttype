/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FetchDirection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NoInfer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Query<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryBehavior<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryClient<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RetryDelayValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RetryValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SkipToken<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unsetMarker<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type NonUndefinedGuard<T> = T extends undefined ? never : T

export type DistributiveOmit<
  TObject,
  TKey extends keyof TObject,
> = TObject extends any ? Omit<TObject, TKey> : never

export type OmitKeyof<
  TObject,
  TKey extends TStrictly extends 'safely'
    ?
        | keyof TObject
        | (string & Record<never, never>)
        | (number & Record<never, never>)
        | (symbol & Record<never, never>)
    : keyof TObject,
  TStrictly extends 'strictly' | 'safely' = 'strictly',
> = Omit<TObject, TKey>

export type Override<TTargetA, TTargetB> = {
  [AKey in keyof TTargetA]: AKey extends keyof TTargetB
    ? TTargetB[AKey]
    : TTargetA[AKey]
}

export type UnsetMarker = typeof unsetMarker

export type AnyDataTag = {
  [dataTagSymbol]: any
  [dataTagErrorSymbol]: any
}

export type DataTag<
  TType,
  TValue,
  TError = UnsetMarker,
> = TType extends AnyDataTag
  ? TType
  : TType & {
      [dataTagSymbol]: TValue
      [dataTagErrorSymbol]: TError
    }

export interface Register {
  // defaultError: Error
  // queryMeta: Record<string, unknown>
  // mutationMeta: Record<string, unknown>
  // queryKey: ReadonlyArray<unknown>
  // mutationKey: ReadonlyArray<unknown>
}

export type QueryKey = Register extends {
  queryKey: infer TQueryKey
}
  ? TQueryKey extends ReadonlyArray<unknown>
    ? TQueryKey
    : TQueryKey extends Array<unknown>
      ? TQueryKey
      : ReadonlyArray<unknown>
  : ReadonlyArray<unknown>

export type InferDataFromTag<TQueryFnData, TTaggedQueryKey extends QueryKey> =
  TTaggedQueryKey extends DataTag<unknown, infer TaggedValue, unknown>
    ? TaggedValue
    : TQueryFnData

export type InferErrorFromTag<TError, TTaggedQueryKey extends QueryKey> =
  TTaggedQueryKey extends DataTag<unknown, unknown, infer TaggedError>
    ? TaggedError extends UnsetMarker
      ? TError
      : TaggedError
    : TError

export type QueryMeta = Register extends {
  queryMeta: infer TQueryMeta
}
  ? TQueryMeta extends Record<string, unknown>
    ? TQueryMeta
    : Record<string, unknown>
  : Record<string, unknown>

export type QueryFunctionContext<
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = [TPageParam] extends [never]
  ? {
      client: QueryClient
      queryKey: TQueryKey
      signal: AbortSignal
      meta: QueryMeta | undefined
      pageParam?: unknown
      /**
       * @deprecated
       * if you want access to the direction, you can add it to the pageParam
       */
      direction?: unknown
    }
  : {
      client: QueryClient
      queryKey: TQueryKey
      signal: AbortSignal
      pageParam: TPageParam
      /**
       * @deprecated
       * if you want access to the direction, you can add it to the pageParam
       */
      direction: FetchDirection
      meta: QueryMeta | undefined
    }

export type QueryFunction<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = (context: QueryFunctionContext<TQueryKey, TPageParam>) => T | Promise<T>

export type DefaultError = Register extends {
  defaultError: infer TError
}
  ? TError
  : Error

export type StaleTime = number | 'static'

export type StaleTimeFunction<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> =
  | StaleTime
  | ((query: Query<TQueryFnData, TError, TData, TQueryKey>) => StaleTime)

export type QueryBooleanOption<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> =
  | boolean
  | ((query: Query<TQueryFnData, TError, TData, TQueryKey>) => boolean)

export type QueryPersister<
  T = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> = [TPageParam] extends [never]
  ? (
      queryFn: QueryFunction<T, TQueryKey, never>,
      context: QueryFunctionContext<TQueryKey>,
      query: Query,
    ) => T | Promise<T>
  : (
      queryFn: QueryFunction<T, TQueryKey, TPageParam>,
      context: QueryFunctionContext<TQueryKey>,
      query: Query,
    ) => T | Promise<T>

export type InitialDataFunction<T> = () => T | undefined

export type NonFunctionGuard<T> = T extends Function ? never : T

export type PlaceholderDataFunction<
  TQueryFnData = unknown,
  TError = DefaultError,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = (
  previousData: TQueryData | undefined,
  previousQuery: Query<TQueryFnData, TError, TQueryData, TQueryKey> | undefined,
) => TQueryData | undefined

export type QueriesPlaceholderDataFunction<TQueryData> = (
  previousData: undefined,
  previousQuery: undefined,
) => TQueryData | undefined

export type QueryKeyHashFunction<TQueryKey extends QueryKey> = (
  queryKey: TQueryKey,
) => string

export type GetPreviousPageParamFunction<TPageParam, TQueryFnData = unknown> = (
  firstPage: TQueryFnData,
  allPages: Array<TQueryFnData>,
  firstPageParam: TPageParam,
  allPageParams: Array<TPageParam>,
) => TPageParam | undefined | null

export type GetNextPageParamFunction<TPageParam, TQueryFnData = unknown> = (
  lastPage: TQueryFnData,
  allPages: Array<TQueryFnData>,
  lastPageParam: TPageParam,
  allPageParams: Array<TPageParam>,
) => TPageParam | undefined | null

export type ThrowOnError<
  TQueryFnData,
  TError,
  TQueryData,
  TQueryKey extends QueryKey,
> =
  | boolean
  | ((
      error: TError,
      query: Query<TQueryFnData, TError, TQueryData, TQueryKey>,
    ) => boolean)

export type WithRequired<TTarget, TKey extends keyof TTarget> = TTarget & {
  [_ in TKey]: {}
}

export type NetworkMode = 'online' | 'always' | 'offlineFirst'

export interface QueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> {
  /**
   * If `false`, failed queries will not retry by default.
   * If `true`, failed queries will retry infinitely.
   * If set to an integer number, e.g. 3, failed queries will retry until the failed query count meets that number.
   * If set to a function `(failureCount, error) => boolean` failed queries will retry until the function returns false.
   */
  retry?: RetryValue<TError>
  retryDelay?: RetryDelayValue<TError>
  networkMode?: NetworkMode
  /**
   * The time in milliseconds that unused/inactive cache data remains in memory.
   * When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration.
   * When different garbage collection times are specified, the longest one will be used.
   * Setting it to `Infinity` will disable garbage collection.
   */
  gcTime?: number
  queryFn?: QueryFunction<TQueryFnData, TQueryKey, TPageParam> | SkipToken
  persister?: QueryPersister<TQueryFnData, NoInfer<TQueryKey>, TPageParam>
  queryHash?: string
  queryKey?: TQueryKey
  queryKeyHashFn?: QueryKeyHashFunction<TQueryKey>
  initialData?: TData | InitialDataFunction<TData>
  initialDataUpdatedAt?: number | (() => number | undefined)
  behavior?: QueryBehavior<TQueryFnData, TError, TData, TQueryKey>
  /**
   * Set this to `false` to disable structural sharing between query results.
   * Set this to a function which accepts the old and new data and returns resolved data of the same type to implement custom structural sharing logic.
   * Defaults to `true`.
   */
  structuralSharing?:
    | boolean
    | ((oldData: unknown | undefined, newData: unknown) => unknown)
  _defaulted?: boolean
  _type?: 'infinite'
  /**
   * Additional payload to be stored on each query.
   * Use this property to pass information that can be used in other places.
   */
  meta?: QueryMeta
  /**
   * Maximum number of pages to store in the data of an infinite query.
   */
  maxPages?: number
}

export interface InfiniteQueryObserverRefetchErrorResult<
  TData = unknown,
  TError = DefaultError,
> extends InfiniteQueryObserverBaseResult<TData, TError> {
  data: TData
  error: TError
  isError: true
  isPending: false
  isLoading: false
  isLoadingError: false
  isRefetchError: true
  isSuccess: false
  isPlaceholderData: false
  status: 'error'
}

export interface InfiniteQueryObserverSuccessResult<
  TData = unknown,
  TError = DefaultError,
> extends InfiniteQueryObserverBaseResult<TData, TError> {
  data: TData
  error: null
  isError: false
  isPending: false
  isLoading: false
  isLoadingError: false
  isRefetchError: false
  isFetchNextPageError: false
  isFetchPreviousPageError: false
  isSuccess: true
  isPlaceholderData: false
  status: 'success'
}

export type DefinedInfiniteQueryObserverResult<
  TData = unknown,
  TError = DefaultError,
> =
  | InfiniteQueryObserverRefetchErrorResult<TData, TError>
  | InfiniteQueryObserverSuccessResult<TData, TError>

export interface InfiniteQueryObserverLoadingErrorResult<
  TData = unknown,
  TError = DefaultError,
> extends InfiniteQueryObserverBaseResult<TData, TError> {
  data: undefined
  error: TError
  isError: true
  isPending: false
  isLoading: false
  isLoadingError: true
  isRefetchError: false
  isFetchNextPageError: false
  isFetchPreviousPageError: false
  isSuccess: false
  isPlaceholderData: false
  status: 'error'
}

export interface InfiniteQueryObserverLoadingResult<
  TData = unknown,
  TError = DefaultError,
> extends InfiniteQueryObserverBaseResult<TData, TError> {
  data: undefined
  error: null
  isError: false
  isPending: true
  isLoading: true
  isLoadingError: false
  isRefetchError: false
  isFetchNextPageError: false
  isFetchPreviousPageError: false
  isSuccess: false
  isPlaceholderData: false
  status: 'pending'
}

export interface InfiniteQueryObserverPendingResult<
  TData = unknown,
  TError = DefaultError,
> extends InfiniteQueryObserverBaseResult<TData, TError> {
  data: undefined
  error: null
  isError: false
  isPending: true
  isLoadingError: false
  isRefetchError: false
  isFetchNextPageError: false
  isFetchPreviousPageError: false
  isSuccess: false
  isPlaceholderData: false
  status: 'pending'
}

export interface InfiniteQueryObserverPlaceholderResult<
  TData = unknown,
  TError = DefaultError,
> extends InfiniteQueryObserverBaseResult<TData, TError> {
  data: TData
  isError: false
  error: null
  isPending: false
  isLoading: false
  isLoadingError: false
  isRefetchError: false
  isSuccess: true
  isPlaceholderData: true
  isFetchNextPageError: false
  isFetchPreviousPageError: false
  status: 'success'
}

export type InfiniteQueryObserverResult<
  TData = unknown,
  TError = DefaultError,
> =
  | DefinedInfiniteQueryObserverResult<TData, TError>
  | InfiniteQueryObserverLoadingErrorResult<TData, TError>
  | InfiniteQueryObserverLoadingResult<TData, TError>
  | InfiniteQueryObserverPendingResult<TData, TError>
  | InfiniteQueryObserverPlaceholderResult<TData, TError>

export type NotifyOnChangeProps =
  | Array<keyof InfiniteQueryObserverResult>
  | 'all'
  | undefined
  | (() => Array<keyof InfiniteQueryObserverResult> | 'all' | undefined)

export interface QueryObserverOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> extends WithRequired<
  QueryOptions<TQueryFnData, TError, TQueryData, TQueryKey, TPageParam>,
  'queryKey'
> {
  /**
   * Set this to `false` or a function that returns `false` to disable automatic refetching when the query mounts or changes query keys.
   * To refetch the query, use the `refetch` method returned from the `useQuery` instance.
   * Accepts a boolean or function that returns a boolean.
   * Defaults to `true`.
   */
  enabled?: QueryBooleanOption<TQueryFnData, TError, TQueryData, TQueryKey>
  /**
   * The time in milliseconds after data is considered stale.
   * If set to `Infinity`, the data will never be considered stale.
   * If set to a function, the function will be executed with the query to compute a `staleTime`.
   * Defaults to `0`.
   */
  staleTime?: StaleTimeFunction<TQueryFnData, TError, TQueryData, TQueryKey>
  /**
   * If set to a number, the query will continuously refetch at this frequency in milliseconds.
   * If set to a function, the function will be executed with the latest data and query to compute a frequency
   * Defaults to `false`.
   */
  refetchInterval?:
    | number
    | false
    | ((
        query: Query<TQueryFnData, TError, TQueryData, TQueryKey>,
      ) => number | false | undefined)
  /**
   * If set to `true`, the query will continue to refetch while their tab/window is in the background.
   * Defaults to `false`.
   */
  refetchIntervalInBackground?: boolean
  /**
   * If set to `true`, the query will refetch on window focus if the data is stale.
   * If set to `false`, the query will not refetch on window focus.
   * If set to `'always'`, the query will always refetch on window focus.
   * If set to a function, the function will be executed with the latest data and query to compute the value.
   * Defaults to `true`.
   */
  refetchOnWindowFocus?:
    | boolean
    | 'always'
    | ((
        query: Query<TQueryFnData, TError, TQueryData, TQueryKey>,
      ) => boolean | 'always')
  /**
   * If set to `true`, the query will refetch on reconnect if the data is stale.
   * If set to `false`, the query will not refetch on reconnect.
   * If set to `'always'`, the query will always refetch on reconnect.
   * If set to a function, the function will be executed with the latest data and query to compute the value.
   * Defaults to `true` unless `networkMode` is `'always'`.
   */
  refetchOnReconnect?:
    | boolean
    | 'always'
    | ((
        query: Query<TQueryFnData, TError, TQueryData, TQueryKey>,
      ) => boolean | 'always')
  /**
   * If set to `true`, the query will refetch on mount if the data is stale.
   * If set to `false`, will disable additional instances of a query to trigger background refetch.
   * If set to `'always'`, the query will always refetch on mount.
   * If set to a function, the function will be executed with the latest data and query to compute the value
   * Defaults to `true`.
   */
  refetchOnMount?:
    | boolean
    | 'always'
    | ((
        query: Query<TQueryFnData, TError, TQueryData, TQueryKey>,
      ) => boolean | 'always')
  /**
   * If set to `false`, the query will not be retried on mount if it contains an error.
   * If set to a function, the function will be executed with the query to compute the value.
   * Defaults to `true`.
   */
  retryOnMount?: QueryBooleanOption<TQueryFnData, TError, TQueryData, TQueryKey>
  /**
   * If set, the component will only re-render if any of the listed properties change.
   * When set to `['data', 'error']`, the component will only re-render when the `data` or `error` properties change.
   * When set to `'all'`, the component will re-render whenever a query is updated.
   * When set to a function, the function will be executed to compute the list of properties.
   * By default, access to properties will be tracked, and the component will only re-render when one of the tracked properties change.
   */
  notifyOnChangeProps?: NotifyOnChangeProps
  /**
   * Whether errors should be thrown instead of setting the `error` property.
   * If set to `true` or `suspense` is `true`, all errors will be thrown to the error boundary.
   * If set to `false` and `suspense` is `false`, errors are returned as state.
   * If set to a function, it will be passed the error and the query, and it should return a boolean indicating whether to show the error in an error boundary (`true`) or return the error as state (`false`).
   * Defaults to `false`.
   */
  throwOnError?: ThrowOnError<TQueryFnData, TError, TQueryData, TQueryKey>
  /**
   * This option can be used to transform or select a part of the data returned by the query function.
   */
  select?: (data: TQueryData) => TData
  /**
   * If set to `true`, the query will suspend when `status === 'pending'`
   * and throw errors when `status === 'error'`.
   * Defaults to `false`.
   */
  suspense?: boolean
  /**
   * If set, this value will be used as the placeholder data for this particular query observer while the query is still in the `loading` data and no initialData has been provided.
   */
  placeholderData?:
    | NonFunctionGuard<TQueryData>
    | PlaceholderDataFunction<
        NonFunctionGuard<TQueryData>,
        TError,
        NonFunctionGuard<TQueryData>,
        TQueryKey
      >

  _optimisticResults?: 'optimistic' | 'isRestoring'

  /**
   * Enable prefetching during rendering
   */
  experimental_prefetchInRender?: boolean
}

export type DefaultedQueryObserverOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = WithRequired<
  QueryObserverOptions<TQueryFnData, TError, TData, TQueryData, TQueryKey>,
  'throwOnError' | 'refetchOnReconnect' | 'queryHash'
>

export interface InfiniteData<TData, TPageParam = unknown> {
  pages: Array<TData>
  pageParams: Array<TPageParam>
}

export interface InfiniteQueryObserverOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>
  extends
    QueryObserverOptions<
      TQueryFnData,
      TError,
      TData,
      InfiniteData<TQueryFnData, TPageParam>,
      TQueryKey,
      TPageParam
    >,
    InfiniteQueryPageParamsOptions<TQueryFnData, TPageParam> {}

export type DefaultedInfiniteQueryObserverOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = WithRequired<
  InfiniteQueryObserverOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >,
  'throwOnError' | 'refetchOnReconnect' | 'queryHash'
>

export interface FetchQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = never,
> extends WithRequired<
  QueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
  'queryKey'
> {
  initialPageParam?: never
  /**
   * The time in milliseconds after data is considered stale.
   * If the data is fresh it will be returned from the cache.
   */
  staleTime?: StaleTimeFunction<TQueryFnData, TError, TData, TQueryKey>
}

export interface InitialPageParam<TPageParam = unknown> {
  initialPageParam: TPageParam
}

export type FetchInfiniteQueryPages<TQueryFnData = unknown, TPageParam = unknown> =
  | { pages?: never }
  | {
      pages: number
      getNextPageParam: GetNextPageParamFunction<TPageParam, TQueryFnData>
    }

export type FetchInfiniteQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = Omit<
  FetchQueryOptions<
    TQueryFnData,
    TError,
    InfiniteData<TData, TPageParam>,
    TQueryKey,
    TPageParam
  >,
  'initialPageParam'
> &
  InitialPageParam<TPageParam> &
  FetchInfiniteQueryPages<TQueryFnData, TPageParam>

export type EnsureInfiniteQueryDataOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
> = FetchInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam
> & {
  revalidateIfStale?: boolean
}

export interface QueryObserverRefetchErrorResult<
  TData = unknown,
  TError = DefaultError,
> extends QueryObserverBaseResult<TData, TError> {
  data: TData
  error: TError
  isError: true
  isPending: false
  isLoading: false
  isLoadingError: false
  isRefetchError: true
  isSuccess: false
  isPlaceholderData: false
  status: 'error'
}

export interface QueryObserverSuccessResult<
  TData = unknown,
  TError = DefaultError,
> extends QueryObserverBaseResult<TData, TError> {
  data: TData
  error: null
  isError: false
  isPending: false
  isLoading: false
  isLoadingError: false
  isRefetchError: false
  isSuccess: true
  isPlaceholderData: false
  status: 'success'
}

export type DefinedQueryObserverResult<
  TData = unknown,
  TError = DefaultError,
> =
  | QueryObserverRefetchErrorResult<TData, TError>
  | QueryObserverSuccessResult<TData, TError>

export interface QueryObserverLoadingErrorResult<
  TData = unknown,
  TError = DefaultError,
> extends QueryObserverBaseResult<TData, TError> {
  data: undefined
  error: TError
  isError: true
  isPending: false
  isLoading: false
  isLoadingError: true
  isRefetchError: false
  isSuccess: false
  isPlaceholderData: false
  status: 'error'
}

export interface QueryObserverLoadingResult<
  TData = unknown,
  TError = DefaultError,
> extends QueryObserverBaseResult<TData, TError> {
  data: undefined
  error: null
  isError: false
  isPending: true
  isLoading: true
  isLoadingError: false
  isRefetchError: false
  isSuccess: false
  isPlaceholderData: false
  status: 'pending'
}

export interface QueryObserverPendingResult<
  TData = unknown,
  TError = DefaultError,
> extends QueryObserverBaseResult<TData, TError> {
  data: undefined
  error: null
  isError: false
  isPending: true
  isLoadingError: false
  isRefetchError: false
  isSuccess: false
  isPlaceholderData: false
  status: 'pending'
}

export interface QueryObserverPlaceholderResult<
  TData = unknown,
  TError = DefaultError,
> extends QueryObserverBaseResult<TData, TError> {
  data: TData
  isError: false
  error: null
  isPending: false
  isLoading: false
  isLoadingError: false
  isRefetchError: false
  isSuccess: true
  isPlaceholderData: true
  status: 'success'
}

export type QueryObserverResult<TData = unknown, TError = DefaultError> =
  | DefinedQueryObserverResult<TData, TError>
  | QueryObserverLoadingErrorResult<TData, TError>
  | QueryObserverLoadingResult<TData, TError>
  | QueryObserverPendingResult<TData, TError>
  | QueryObserverPlaceholderResult<TData, TError>

export type MutationMeta = Register extends {
  mutationMeta: infer TMutationMeta
}
  ? TMutationMeta extends Record<string, unknown>
    ? TMutationMeta
    : Record<string, unknown>
  : Record<string, unknown>

export type MutationKey = Register extends {
  mutationKey: infer TMutationKey
}
  ? TMutationKey extends ReadonlyArray<unknown>
    ? TMutationKey
    : TMutationKey extends Array<unknown>
      ? TMutationKey
      : ReadonlyArray<unknown>
  : ReadonlyArray<unknown>

export type MutationFunctionContext = {
  client: QueryClient
  meta: MutationMeta | undefined
  mutationKey?: MutationKey
}

export type MutationFunction<TData = unknown, TVariables = unknown> = (
  variables: TVariables,
  context: MutationFunctionContext,
) => Promise<TData>

export interface MutateOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> {
  onSuccess?: (
    data: TData,
    variables: TVariables,
    onMutateResult: TOnMutateResult | undefined,
    context: MutationFunctionContext,
  ) => void
  onError?: (
    error: TError,
    variables: TVariables,
    onMutateResult: TOnMutateResult | undefined,
    context: MutationFunctionContext,
  ) => void
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    onMutateResult: TOnMutateResult | undefined,
    context: MutationFunctionContext,
  ) => void
}

export type MutateFunction<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = (
  variables: TVariables,
  options?: MutateOptions<TData, TError, TVariables, TOnMutateResult>,
) => Promise<TData>

export interface MutationObserverIdleResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> extends MutationObserverBaseResult<
  TData,
  TError,
  TVariables,
  TOnMutateResult
> {
  data: undefined
  variables: undefined
  error: null
  isError: false
  isIdle: true
  isPending: false
  isSuccess: false
  status: 'idle'
}

export interface MutationObserverLoadingResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> extends MutationObserverBaseResult<
  TData,
  TError,
  TVariables,
  TOnMutateResult
> {
  data: undefined
  variables: TVariables
  error: null
  isError: false
  isIdle: false
  isPending: true
  isSuccess: false
  status: 'pending'
}

export interface MutationObserverErrorResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> extends MutationObserverBaseResult<
  TData,
  TError,
  TVariables,
  TOnMutateResult
> {
  data: undefined
  error: TError
  variables: TVariables
  isError: true
  isIdle: false
  isPending: false
  isSuccess: false
  status: 'error'
}

export interface MutationObserverSuccessResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> extends MutationObserverBaseResult<
  TData,
  TError,
  TVariables,
  TOnMutateResult
> {
  data: TData
  error: null
  variables: TVariables
  isError: false
  isIdle: false
  isPending: false
  isSuccess: true
  status: 'success'
}

export type MutationObserverResult<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> =
  | MutationObserverIdleResult<TData, TError, TVariables, TOnMutateResult>
  | MutationObserverLoadingResult<TData, TError, TVariables, TOnMutateResult>
  | MutationObserverErrorResult<TData, TError, TVariables, TOnMutateResult>
  | MutationObserverSuccessResult<TData, TError, TVariables, TOnMutateResult>
