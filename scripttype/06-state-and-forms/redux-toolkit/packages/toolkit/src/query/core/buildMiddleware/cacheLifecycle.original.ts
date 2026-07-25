/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildMiddleware/cacheLifecycle.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseEndpointDefinition<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseQueryFn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseQueryMeta<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseQueryResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefinitionType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutationResultSelectorResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PromiseWithKnownReason<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RootState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ThunkDispatch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type neverResolvedError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
