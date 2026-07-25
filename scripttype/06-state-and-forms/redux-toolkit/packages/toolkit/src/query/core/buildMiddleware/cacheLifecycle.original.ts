/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildMiddleware/cacheLifecycle.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseEndpointDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseQueryFn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseQueryMeta<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinitionType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationResultSelectorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PromiseWithKnownReason<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThunkDispatch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type neverResolvedError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type LifecycleApi<ReducerPath extends string = string> = {
  /**
   * The dispatch method for the store
   */
  dispatch: ThunkDispatch<any, any, UnknownAction>
  /**
   * A method to get the current state
   */
  getState(): RootState<any, any, ReducerPath>
  /**
   * `extra` as provided as `thunk.extraArgument` to the `configureStore` `getDefaultMiddleware` option.
   */
  extra: unknown
  /**
   * A unique ID generated for the mutation
   */
  requestId: string
}

export type MutationBaseLifecycleApi<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  ReducerPath extends string = string,
> = LifecycleApi<ReducerPath> & {
  /**
   * Gets the current value of this cache entry.
   */
  getCacheEntry(): MutationResultSelectorResult<
    { type: DefinitionType.mutation } & BaseEndpointDefinition<
      QueryArg,
      BaseQuery,
      ResultType,
      BaseQueryResult<BaseQuery>
    >
  >
}

export type CacheLifecyclePromises<ResultType = unknown, MetaType = unknown> = {
  /**
   * Promise that will resolve with the first value for this cache key.
   * This allows you to `await` until an actual value is in cache.
   *
   * If the cache entry is removed from the cache before any value has ever
   * been resolved, this Promise will reject with
   * `new Error('Promise never resolved before cacheEntryRemoved.')`
   * to prevent memory leaks.
   * You can just re-throw that error (or not handle it at all) -
   * it will be caught outside of `cacheEntryAdded`.
   *
   * If you don't interact with this promise, it will not throw.
   */
  cacheDataLoaded: PromiseWithKnownReason<
    {
      /**
       * The (transformed) query result.
       */
      data: ResultType
      /**
       * The `meta` returned by the `baseQuery`
       */
      meta: MetaType
    },
    typeof neverResolvedError
  >
  /**
   * Promise that allows you to wait for the point in time when the cache entry
   * has been removed from the cache, by not being used/subscribed to any more
   * in the application for too long or by dispatching `api.util.resetApiState`.
   */
  cacheEntryRemoved: Promise<void>
}

export type MutationCacheLifecycleApi<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  ReducerPath extends string = string,
> = MutationBaseLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath> &
  CacheLifecyclePromises<ResultType, BaseQueryMeta<BaseQuery>>

export interface QueryCacheLifecycleApi<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ResultType,
  ReducerPath extends string = string,
> extends QueryBaseLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>,
    CacheLifecyclePromises<ResultType, BaseQueryMeta<BaseQuery>> {}

export type CacheLifecycleQueryExtraOptions<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ReducerPath extends string = string,
> = {
  onCacheEntryAdded?(
    arg: QueryArg,
    api: QueryCacheLifecycleApi<QueryArg, BaseQuery, ResultType, ReducerPath>,
  ): Promise<void> | void
}

export type CacheLifecycleInfiniteQueryExtraOptions<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ReducerPath extends string = string,
> = CacheLifecycleQueryExtraOptions<
  ResultType,
  QueryArg,
  BaseQuery,
  ReducerPath
>

export type CacheLifecycleMutationExtraOptions<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  ReducerPath extends string = string,
> = {
  onCacheEntryAdded?(
    arg: QueryArg,
    api: MutationCacheLifecycleApi<
      QueryArg,
      BaseQuery,
      ResultType,
      ReducerPath
    >,
  ): Promise<void> | void
}
