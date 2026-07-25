/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/apiState.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseEndpointDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseQueryError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EndpointDefinitions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FullTagDescription<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Id<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PageParamFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryArgFromAnyQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryStatus<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultTypeFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SerializedError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WithRequiredProp<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InfiniteQueryConfigOptions<DataType, PageParam, QueryArg> = {
  /**
   * The initial page parameter to use for the first page fetch.
   */
  initialPageParam: PageParam
  /**
   * This function is required to automatically get the next cursor for infinite queries.
   * The result will also be used to determine the value of `hasNextPage`.
   */
  getNextPageParam: (
    lastPage: DataType,
    allPages: Array<DataType>,
    lastPageParam: PageParam,
    allPageParams: Array<PageParam>,
    queryArg: QueryArg,
  ) => PageParam | undefined | null
  /**
   * This function can be set to automatically get the previous cursor for infinite queries.
   * The result will also be used to determine the value of `hasPreviousPage`.
   */
  getPreviousPageParam?: (
    firstPage: DataType,
    allPages: Array<DataType>,
    firstPageParam: PageParam,
    allPageParams: Array<PageParam>,
    queryArg: QueryArg,
  ) => PageParam | undefined | null
  /**
   * If specified, only keep this many pages in cache at once.
   * If additional pages are fetched, older pages in the other
   * direction will be dropped from the cache.
   */
  maxPages?: number
  /**
   * Defaults to `true`. When this is `true` and an infinite query endpoint is refetched
   * (due to tag invalidation, polling, arg change configuration, or manual refetching),
   * RTK Query will try to sequentially refetch all pages currently in the cache.
   * When `false` only the first page will be refetched.
   */
  refetchCachedPages?: boolean
}

export type InfiniteData<DataType, PageParam> = {
  pages: Array<DataType>
  pageParams: Array<PageParam>
}

export type QueryKeys<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions]: Definitions[K] extends QueryDefinition<
    any,
    any,
    any,
    any
  >
    ? K
    : never
}[keyof Definitions]

export type InfiniteQueryKeys<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions]: Definitions[K] extends InfiniteQueryDefinition<
    any,
    any,
    any,
    any,
    any
  >
    ? K
    : never
}[keyof Definitions]

export type MutationKeys<Definitions extends EndpointDefinitions> = {
  [K in keyof Definitions]: Definitions[K] extends MutationDefinition<
    any,
    any,
    any,
    any
  >
    ? K
    : never
}[keyof Definitions]

export type BaseQuerySubState<
  D extends BaseEndpointDefinition<any, any, any, any>,
  DataType = ResultTypeFrom<D>,
> = {
  /**
   * The argument originally passed into the hook or `initiate` action call
   */
  originalArgs: QueryArgFromAnyQuery<D>
  /**
   * A unique ID associated with the request
   */
  requestId: string
  /**
   * The received data from the query
   */
  data?: DataType
  /**
   * The received error if applicable
   */
  error?:
    | SerializedError
    | (D extends QueryDefinition<any, infer BaseQuery, any, any>
        ? BaseQueryError<BaseQuery>
        : never)
  /**
   * The name of the endpoint associated with the query
   */
  endpointName: string
  /**
   * Time that the latest query started
   */
  startedTimeStamp: number
  /**
   * Time that the latest query was fulfilled
   */
  fulfilledTimeStamp?: number
}

export type QuerySubState<
  D extends BaseEndpointDefinition<any, any, any, any>,
  DataType = ResultTypeFrom<D>,
> = Id<
  | ({ status: QueryStatus.fulfilled } & WithRequiredProp<
      BaseQuerySubState<D, DataType>,
      'data' | 'fulfilledTimeStamp'
    > & { error: undefined })
  | ({ status: QueryStatus.pending } & BaseQuerySubState<D, DataType>)
  | ({ status: QueryStatus.rejected } & WithRequiredProp<
      BaseQuerySubState<D, DataType>,
      'error'
    >)
  | {
      status: QueryStatus.uninitialized
      originalArgs?: undefined
      data?: undefined
      error?: undefined
      requestId?: undefined
      endpointName?: string
      startedTimeStamp?: undefined
      fulfilledTimeStamp?: undefined
    }
>

export type InfiniteQueryDirection = 'forward' | 'backward'

export type InfiniteQuerySubState<
  D extends BaseEndpointDefinition<any, any, any, any>,
> =
  D extends InfiniteQueryDefinition<any, any, any, any, any>
    ? QuerySubState<D, InfiniteData<ResultTypeFrom<D>, PageParamFrom<D>>> & {
        direction?: InfiniteQueryDirection
      }
    : never

export type BaseMutationSubState<
  D extends BaseEndpointDefinition<any, any, any, any>,
> = {
  requestId: string
  data?: ResultTypeFrom<D>
  error?:
    | SerializedError
    | (D extends MutationDefinition<any, infer BaseQuery, any, any>
        ? BaseQueryError<BaseQuery>
        : never)
  endpointName: string
  startedTimeStamp: number
  fulfilledTimeStamp?: number
}

export type MutationSubState<
  D extends BaseEndpointDefinition<any, any, any, any>,
> =
  | (({
      status: QueryStatus.fulfilled
    } & WithRequiredProp<
      BaseMutationSubState<D>,
      'data' | 'fulfilledTimeStamp'
    >) & { error: undefined })
  | (({ status: QueryStatus.pending } & BaseMutationSubState<D>) & {
      data?: undefined
    })
  | ({ status: QueryStatus.rejected } & WithRequiredProp<
      BaseMutationSubState<D>,
      'error'
    >)
  | {
      requestId?: undefined
      status: QueryStatus.uninitialized
      data?: undefined
      error?: undefined
      endpointName?: string
      startedTimeStamp?: undefined
      fulfilledTimeStamp?: undefined
    }

export type QueryState<D extends EndpointDefinitions> = {
  [queryCacheKey: string]:
    | QuerySubState<D[string]>
    | InfiniteQuerySubState<D[string]>
    | undefined
}

export type MutationState<D extends EndpointDefinitions> = {
  [requestId: string]: MutationSubState<D[string]> | undefined
}

export type QueryCacheKey = string & { _type: 'queryCacheKey' }

export type InvalidationState<TagTypes extends string> = {
  tags: {
    [_ in TagTypes]: {
      [id: string]: Array<QueryCacheKey>
      [id: number]: Array<QueryCacheKey>
    }
  }
  keys: Record<QueryCacheKey, Array<FullTagDescription<any>>>
}

export type SubscriptionOptions = {
  /**
   * How frequently to automatically re-fetch data (in milliseconds). Defaults to `0` (off).
   */
  pollingInterval?: number
  /**
   *  Defaults to 'false'. This setting allows you to control whether RTK Query will continue polling if the window is not focused.
   *
   *  If pollingInterval is not set or set to 0, this **will not be evaluated** until pollingInterval is greater than 0.
   *
   *  Note: requires [`setupListeners`](./setupListeners) to have been called.
   */
  skipPollingIfUnfocused?: boolean
  /**
   * Defaults to `false`. This setting allows you to control whether RTK Query will try to refetch all subscribed queries after regaining a network connection.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   *
   * Note: requires [`setupListeners`](./setupListeners) to have been called.
   */
  refetchOnReconnect?: boolean
  /**
   * Defaults to `false`. This setting allows you to control whether RTK Query will try to refetch all subscribed queries after the application window regains focus.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   *
   * Note: requires [`setupListeners`](./setupListeners) to have been called.
   */
  refetchOnFocus?: boolean
}

export type Subscribers = { [requestId: string]: SubscriptionOptions }

export type SubscriptionState = {
  [queryCacheKey: string]: Subscribers | undefined
}

export type RefetchConfigOptions = {
  refetchOnMountOrArgChange: boolean | number
  refetchOnReconnect: boolean
  refetchOnFocus: boolean
}

export type ModifiableConfigState = {
  keepUnusedDataFor: number
  invalidationBehavior: 'delayed' | 'immediately'
} & RefetchConfigOptions

export type ConfigState<ReducerPath> = RefetchConfigOptions & {
  reducerPath: ReducerPath
  online: boolean
  focused: boolean
  middlewareRegistered: boolean | 'conflict'
} & ModifiableConfigState

export type CombinedState<
  D extends EndpointDefinitions,
  E extends string,
  ReducerPath extends string,
> = {
  queries: QueryState<D>
  mutations: MutationState<D>
  provided: InvalidationState<E>
  subscriptions: SubscriptionState
  config: ConfigState<ReducerPath>
}

export type RootState<
  Definitions extends EndpointDefinitions,
  TagTypes extends string,
  ReducerPath extends string,
> = { [P in ReducerPath]: CombinedState<Definitions, TagTypes, P> }
