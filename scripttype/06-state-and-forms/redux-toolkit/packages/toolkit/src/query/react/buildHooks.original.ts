/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/react/buildHooks.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseQueryFn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQuerySubState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationResultSelectorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PageParamFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryActionCreatorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryStatus<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QuerySubState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultTypeFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SkipToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SubscriptionOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSHelpersId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSHelpersOverride<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UninitializedValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UseQueryStateBaseResult<D extends QueryDefinition<any, any, any, any>> =
  QuerySubState<D> & {
    /**
     * Where `data` tries to hold data as much as possible, also reusing
     * data from the last arguments passed into the hook, this property
     * will always contain the received data from the query, for the current query arguments.
     */
    currentData?: ResultTypeFrom<D>
    /**
     * Query has not started yet.
     */
    isUninitialized: false
    /**
     * Query is currently loading for the first time. No data yet.
     */
    isLoading: false
    /**
     * Query is currently fetching, but might have data from an earlier request.
     */
    isFetching: false
    /**
     * Query has data from a successful load.
     */
    isSuccess: false
    /**
     * Query is currently in "error" state.
     */
    isError: false
  }

export type UseQueryStateUninitialized<D extends QueryDefinition<any, any, any, any>> =
  TSHelpersOverride<
    Extract<UseQueryStateBaseResult<D>, { status: QueryStatus.uninitialized }>,
    { isUninitialized: true }
  >

export type UseQueryStateLoading<D extends QueryDefinition<any, any, any, any>> =
  TSHelpersOverride<
    UseQueryStateBaseResult<D>,
    { isLoading: true; isFetching: boolean; data: undefined }
  >

export type UseQueryStateSuccessFetching<
  D extends QueryDefinition<any, any, any, any>,
> = TSHelpersOverride<
  UseQueryStateBaseResult<D>,
  {
    isSuccess: true
    isFetching: true
    error: undefined
  } & {
    data: ResultTypeFrom<D>
  } & Required<Pick<UseQueryStateBaseResult<D>, 'fulfilledTimeStamp'>>
>

export type UseQueryStateSuccessNotFetching<
  D extends QueryDefinition<any, any, any, any>,
> = TSHelpersOverride<
  UseQueryStateBaseResult<D>,
  {
    isSuccess: true
    isFetching: false
    error: undefined
  } & {
    data: ResultTypeFrom<D>
    currentData: ResultTypeFrom<D>
  } & Required<Pick<UseQueryStateBaseResult<D>, 'fulfilledTimeStamp'>>
>

export type UseQueryStateError<D extends QueryDefinition<any, any, any, any>> =
  TSHelpersOverride<
    UseQueryStateBaseResult<D>,
    { isError: true } & Required<Pick<UseQueryStateBaseResult<D>, 'error'>>
  >

export type UseQueryStateDefaultResult<D extends QueryDefinition<any, any, any, any>> =
  TSHelpersId<
    | UseQueryStateUninitialized<D>
    | UseQueryStateLoading<D>
    | UseQueryStateSuccessFetching<D>
    | UseQueryStateSuccessNotFetching<D>
    | UseQueryStateError<D>
  > & {
    /**
     * @deprecated Included for completeness, but discouraged.
     * Please use the `isLoading`, `isFetching`, `isSuccess`, `isError`
     * and `isUninitialized` flags instead
     */
    status: QueryStatus
  }

export type UseQuerySubscriptionOptions = SubscriptionOptions & {
  /**
   * Prevents a query from automatically running.
   *
   * @remarks
   * When `skip` is true (or `skipToken` is passed in as `arg`):
   *
   * - **If the query has cached data:**
   *   * The cached data **will not be used** on the initial load, and will ignore updates from any identical query until the `skip` condition is removed
   *   * The query will have a status of `uninitialized`
   *   * If `skip: false` is set after the initial load, the cached result will be used
   * - **If the query does not have cached data:**
   *   * The query will have a status of `uninitialized`
   *   * The query will not exist in the state when viewed with the dev tools
   *   * The query will not automatically fetch on mount
   *   * The query will not automatically run when additional components with the same query are added that do run
   *
   * @example
   * ```tsx
   * // codeblock-meta no-transpile title="Skip example"
   * const Pokemon = ({ name, skip }: { name: string; skip: boolean }) => {
   *   const { data, error, status } = useGetPokemonByNameQuery(name, {
   *     skip,
   *   });
   *
   *   return (
   *     <div>
   *       {name} - {status}
   *     </div>
   *   );
   * };
   * ```
   */
  skip?: boolean
  /**
   * Defaults to `false`. This setting allows you to control whether if a cached result is already available, RTK Query will only serve a cached result, or if it should `refetch` when set to `true` or if an adequate amount of time has passed since the last successful query result.
   * - `false` - Will not cause a query to be performed _unless_ it does not exist yet.
   * - `true` - Will always refetch when a new subscriber to a query is added. Behaves the same as calling the `refetch` callback or passing `forceRefetch: true` in the action creator.
   * - `number` - **Value is in seconds**. If a number is provided and there is an existing query in the cache, it will compare the current time vs the last fulfilled timestamp, and only refetch if enough time has elapsed.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   */
  refetchOnMountOrArgChange?: boolean | number
}

export type QueryStateSelector<
  R extends Record<string, any>,
  D extends QueryDefinition<any, any, any, any>,
> = (state: UseQueryStateDefaultResult<D>) => R

export type UseQueryStateOptions<
  D extends QueryDefinition<any, any, any, any>,
  R extends Record<string, any>,
> = {
  /**
   * Prevents a query from automatically running.
   *
   * @remarks
   * When skip is true:
   *
   * - **If the query has cached data:**
   *   * The cached data **will not be used** on the initial load, and will ignore updates from any identical query until the `skip` condition is removed
   *   * The query will have a status of `uninitialized`
   *   * If `skip: false` is set after skipping the initial load, the cached result will be used
   * - **If the query does not have cached data:**
   *   * The query will have a status of `uninitialized`
   *   * The query will not exist in the state when viewed with the dev tools
   *   * The query will not automatically fetch on mount
   *   * The query will not automatically run when additional components with the same query are added that do run
   *
   * @example
   * ```tsx
   * // codeblock-meta title="Skip example"
   * const Pokemon = ({ name, skip }: { name: string; skip: boolean }) => {
   *   const { data, error, status } = useGetPokemonByNameQuery(name, {
   *     skip,
   *   });
   *
   *   return (
   *     <div>
   *       {name} - {status}
   *     </div>
   *   );
   * };
   * ```
   */
  skip?: boolean
  /**
   * `selectFromResult` allows you to get a specific segment from a query result in a performant manner.
   * When using this feature, the component will not rerender unless the underlying data of the selected item has changed.
   * If the selected item is one element in a larger collection, it will disregard changes to elements in the same collection.
   *
   * @example
   * ```tsx
   * // codeblock-meta title="Using selectFromResult to extract a single result"
   * function PostsList() {
   *   const { data: posts } = api.useGetPostsQuery();
   *
   *   return (
   *     <ul>
   *       {posts?.map((post) => (
   *         <PostById key={post.id} id={post.id} />
   *       ))}
   *     </ul>
   *   );
   * }
   *
   * function PostById({ id }: { id: number }) {
   *   // Will select the post with the given id, and will only rerender if the given posts data changes
   *   const { post } = api.useGetPostsQuery(undefined, {
   *     selectFromResult: ({ data }) => ({
   *       post: data?.find((post) => post.id === id),
   *     }),
   *   });
   *
   *   return <li>{post?.name}</li>;
   * }
   * ```
   */
  selectFromResult?: QueryStateSelector<R, D>
}

export type UseQueryStateResult<
  _ extends QueryDefinition<any, any, any, any>,
  R,
> = R

export type UseQuerySubscriptionResult<
  D extends QueryDefinition<any, any, any, any>,
> = Pick<QueryActionCreatorResult<D>, 'refetch'>

export type UseQueryHookResult<
  D extends QueryDefinition<any, any, any, any>,
  R = UseQueryStateDefaultResult<D>,
> = UseQueryStateResult<D, R> & UseQuerySubscriptionResult<D>

export type UseQuery<D extends QueryDefinition<any, any, any, any>> = <
  R extends Record<string, any> = UseQueryStateDefaultResult<D>,
>(
  arg: QueryArgFrom<D> | SkipToken,
  options?: UseQuerySubscriptionOptions & UseQueryStateOptions<D, R>,
) => UseQueryHookResult<D, R>

export type LazyQueryTrigger<D extends QueryDefinition<any, any, any, any>> = {
  /**
   * Triggers a lazy query.
   *
   * By default, this will start a new request even if there is already a value in the cache.
   * If you want to use the cache value and only start a request if there is no cache value, set the second argument to `true`.
   *
   * @remarks
   * If you need to access the error or success payload immediately after a lazy query, you can chain .unwrap().
   *
   * @example
   * ```ts
   * // codeblock-meta title="Using .unwrap with async await"
   * try {
   *   const payload = await getUserById(1).unwrap();
   *   console.log('fulfilled', payload);
   * } catch (error) {
   *   console.error('rejected', error);
   * }
   * ```
   */
  (
    arg: QueryArgFrom<D>,
    preferCacheValue?: boolean,
  ): QueryActionCreatorResult<D>
}

export type UseLazyQueryStateResult<
  D extends QueryDefinition<any, any, any, any>,
  R = UseQueryStateDefaultResult<D>,
> = UseQueryStateResult<D, R> & {
  /**
   * Resets the hook state to its initial `uninitialized` state.
   * This will also remove the last result from the cache.
   */
  reset: () => void
}

export type UseLazyQueryLastPromiseInfo<
  D extends QueryDefinition<any, any, any, any>,
> = {
  lastArg: QueryArgFrom<D>
}

export type UseLazyQuery<D extends QueryDefinition<any, any, any, any>> = <
  R extends Record<string, any> = UseQueryStateDefaultResult<D>,
>(
  options?: SubscriptionOptions & Omit<UseQueryStateOptions<D, R>, 'skip'>,
) => [
  LazyQueryTrigger<D>,
  UseLazyQueryStateResult<D, R>,
  UseLazyQueryLastPromiseInfo<D>,
]

export type UseQuerySubscription<
  D extends QueryDefinition<any, any, any, any>,
> = (
  arg: QueryArgFrom<D> | SkipToken,
  options?: UseQuerySubscriptionOptions,
) => UseQuerySubscriptionResult<D>

export type UseLazyQuerySubscription<
  D extends QueryDefinition<any, any, any, any>,
> = (
  options?: SubscriptionOptions,
) => readonly [
  LazyQueryTrigger<D>,
  QueryArgFrom<D> | UninitializedValue,
  { reset: () => void },
]

export type UseQueryState<D extends QueryDefinition<any, any, any, any>> = <
  R extends Record<string, any> = UseQueryStateDefaultResult<D>,
>(
  arg: QueryArgFrom<D> | SkipToken,
  options?: UseQueryStateOptions<D, R>,
) => UseQueryStateResult<D, R>

export type QueryHooks<
  Definition extends QueryDefinition<any, any, any, any, any>,
> = {
  useQuery: UseQuery<Definition>
  useLazyQuery: UseLazyQuery<Definition>
  useQuerySubscription: UseQuerySubscription<Definition>
  useLazyQuerySubscription: UseLazyQuerySubscription<Definition>
  useQueryState: UseQueryState<Definition>
}

export type UseInfiniteQueryStateBaseResult<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = InfiniteQuerySubState<D> & {
  /**
   * Where `data` tries to hold data as much as possible, also reusing
   * data from the last arguments passed into the hook, this property
   * will always contain the received data from the query, for the current query arguments.
   */
  currentData?: InfiniteData<ResultTypeFrom<D>, PageParamFrom<D>>
  /**
   * Query has not started yet.
   */
  isUninitialized: false
  /**
   * Query is currently loading for the first time. No data yet.
   */
  isLoading: false
  /**
   * Query is currently fetching, but might have data from an earlier request.
   */
  isFetching: false
  /**
   * Query has data from a successful load.
   */
  isSuccess: false
  /**
   * Query is currently in "error" state.
   */
  isError: false
  hasNextPage: boolean
  hasPreviousPage: boolean
  isFetchingNextPage: boolean
  isFetchingPreviousPage: boolean
}

export type UseInfiniteQueryStateDefaultResult<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = TSHelpersId<
  | TSHelpersOverride<
      Extract<
        UseInfiniteQueryStateBaseResult<D>,
        { status: QueryStatus.uninitialized }
      >,
      { isUninitialized: true }
    >
  | TSHelpersOverride<
      UseInfiniteQueryStateBaseResult<D>,
      | { isLoading: true; isFetching: boolean; data: undefined }
      | ({
          isSuccess: true
          isFetching: true
          error: undefined
        } & Required<
          Pick<
            UseInfiniteQueryStateBaseResult<D>,
            'data' | 'fulfilledTimeStamp'
          >
        >)
      | ({
          isSuccess: true
          isFetching: false
          error: undefined
        } & Required<
          Pick<
            UseInfiniteQueryStateBaseResult<D>,
            'data' | 'fulfilledTimeStamp' | 'currentData'
          >
        >)
      | ({ isError: true } & Required<
          Pick<UseInfiniteQueryStateBaseResult<D>, 'error'>
        >)
    >
> & {
  /**
   * @deprecated Included for completeness, but discouraged.
   * Please use the `isLoading`, `isFetching`, `isSuccess`, `isError`
   * and `isUninitialized` flags instead
   */
  status: QueryStatus
}

export type UseInfiniteQuerySubscriptionOptions<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = SubscriptionOptions & {
  /**
   * Prevents a query from automatically running.
   *
   * @remarks
   * When `skip` is true (or `skipToken` is passed in as `arg`):
   *
   * - **If the query has cached data:**
   *   * The cached data **will not be used** on the initial load, and will ignore updates from any identical query until the `skip` condition is removed
   *   * The query will have a status of `uninitialized`
   *   * If `skip: false` is set after the initial load, the cached result will be used
   * - **If the query does not have cached data:**
   *   * The query will have a status of `uninitialized`
   *   * The query will not exist in the state when viewed with the dev tools
   *   * The query will not automatically fetch on mount
   *   * The query will not automatically run when additional components with the same query are added that do run
   *
   * @example
   * ```tsx
   * // codeblock-meta no-transpile title="Skip example"
   * const Pokemon = ({ name, skip }: { name: string; skip: boolean }) => {
   *   const { data, error, status } = useGetPokemonByNameQuery(name, {
   *     skip,
   *   });
   *
   *   return (
   *     <div>
   *       {name} - {status}
   *     </div>
   *   );
   * };
   * ```
   */
  skip?: boolean
  /**
   * Defaults to `false`. This setting allows you to control whether if a cached result is already available, RTK Query will only serve a cached result, or if it should `refetch` when set to `true` or if an adequate amount of time has passed since the last successful query result.
   * - `false` - Will not cause a query to be performed _unless_ it does not exist yet.
   * - `true` - Will always refetch when a new subscriber to a query is added. Behaves the same as calling the `refetch` callback or passing `forceRefetch: true` in the action creator.
   * - `number` - **Value is in seconds**. If a number is provided and there is an existing query in the cache, it will compare the current time vs the last fulfilled timestamp, and only refetch if enough time has elapsed.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   */
  refetchOnMountOrArgChange?: boolean | number
  initialPageParam?: PageParamFrom<D>
  /**
   * Defaults to `true`. When this is `true` and an infinite query endpoint is refetched
   * (due to tag invalidation, polling, arg change configuration, or manual refetching),
   * RTK Query will try to sequentially refetch all pages currently in the cache.
   * When `false` only the first page will be refetched.
   *
   * This option applies to all automatic refetches for this subscription (polling, tag invalidation, etc.).
   * It can be overridden on a per-call basis using the `refetch()` method.
   */
  refetchCachedPages?: boolean
}

export type InfiniteQueryStateSelector<
  R extends Record<string, any>,
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = (state: UseInfiniteQueryStateDefaultResult<D>) => R

export type UseInfiniteQueryStateOptions<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
  R extends Record<string, any>,
> = {
  /**
   * Prevents a query from automatically running.
   *
   * @remarks
   * When skip is true:
   *
   * - **If the query has cached data:**
   *   * The cached data **will not be used** on the initial load, and will ignore updates from any identical query until the `skip` condition is removed
   *   * The query will have a status of `uninitialized`
   *   * If `skip: false` is set after skipping the initial load, the cached result will be used
   * - **If the query does not have cached data:**
   *   * The query will have a status of `uninitialized`
   *   * The query will not exist in the state when viewed with the dev tools
   *   * The query will not automatically fetch on mount
   *   * The query will not automatically run when additional components with the same query are added that do run
   *
   * @example
   * ```tsx
   * // codeblock-meta title="Skip example"
   * const Pokemon = ({ name, skip }: { name: string; skip: boolean }) => {
   *   const { data, error, status } = useGetPokemonByNameQuery(name, {
   *     skip,
   *   });
   *
   *   return (
   *     <div>
   *       {name} - {status}
   *     </div>
   *   );
   * };
   * ```
   */
  skip?: boolean
  /**
   * `selectFromResult` allows you to get a specific segment from a query result in a performant manner.
   * When using this feature, the component will not rerender unless the underlying data of the selected item has changed.
   * If the selected item is one element in a larger collection, it will disregard changes to elements in the same collection.
   * Note that this should always return an object (not a primitive), as RTKQ adds fields to the return value.
   *
   * @example
   * ```tsx
   * // codeblock-meta title="Using selectFromResult to extract a single result"
   * function PostsList() {
   *   const { data: posts } = api.useGetPostsQuery();
   *
   *   return (
   *     <ul>
   *       {posts?.map((post) => (
   *         <PostById key={post.id} id={post.id} />
   *       ))}
   *     </ul>
   *   );
   * }
   *
   * function PostById({ id }: { id: number }) {
   *   // Will select the post with the given id, and will only rerender if the given posts data changes
   *   const { post } = api.useGetPostsQuery(undefined, {
   *     selectFromResult: ({ data }) => ({
   *       post: data?.find((post) => post.id === id),
   *     }),
   *   });
   *
   *   return <li>{post?.name}</li>;
   * }
   * ```
   */
  selectFromResult?: InfiniteQueryStateSelector<R, D>
}

export type UseInfiniteQueryStateResult<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
  R = UseInfiniteQueryStateDefaultResult<D>,
> = R

export type LazyInfiniteQueryTrigger<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = {
  /**
   * Triggers a lazy query.
   *
   * By default, this will start a new request even if there is already a value in the cache.
   * If you want to use the cache value and only start a request if there is no cache value, set the second argument to `true`.
   *
   * @remarks
   * If you need to access the error or success payload immediately after a lazy query, you can chain .unwrap().
   *
   * @example
   * ```ts
   * // codeblock-meta title="Using .unwrap with async await"
   * try {
   *   const payload = await getUserById(1).unwrap();
   *   console.log('fulfilled', payload);
   * } catch (error) {
   *   console.error('rejected', error);
   * }
   * ```
   */
  (
    arg: QueryArgFrom<D>,
    direction: InfiniteQueryDirection,
  ): InfiniteQueryActionCreatorResult<D>
}

export type UseInfiniteQuerySubscriptionResult<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = {
  refetch: (
    options?: Pick<
      UseInfiniteQuerySubscriptionOptions<D>,
      'refetchCachedPages'
    >,
  ) => InfiniteQueryActionCreatorResult<D>
  trigger: LazyInfiniteQueryTrigger<D>
  fetchNextPage: () => InfiniteQueryActionCreatorResult<D>
  fetchPreviousPage: () => InfiniteQueryActionCreatorResult<D>
}

export type UseInfiniteQueryHookResult<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
  R = UseInfiniteQueryStateDefaultResult<D>,
> = UseInfiniteQueryStateResult<D, R> &
  Pick<
    UseInfiniteQuerySubscriptionResult<D>,
    'refetch' | 'fetchNextPage' | 'fetchPreviousPage'
  >

export type UseInfiniteQuery<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = <R extends Record<string, any> = UseInfiniteQueryStateDefaultResult<D>>(
  arg: InfiniteQueryArgFrom<D> | SkipToken,
  options?: UseInfiniteQuerySubscriptionOptions<D> &
    UseInfiniteQueryStateOptions<D, R>,
) => UseInfiniteQueryHookResult<D, R> &
  Pick<
    UseInfiniteQuerySubscriptionResult<D>,
    'fetchNextPage' | 'fetchPreviousPage'
  >

export type UseInfiniteQuerySubscription<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = (
  arg: InfiniteQueryArgFrom<D> | SkipToken,
  options?: UseInfiniteQuerySubscriptionOptions<D>,
) => UseInfiniteQuerySubscriptionResult<D>

export type UseInfiniteQueryState<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = <R extends Record<string, any> = UseInfiniteQueryStateDefaultResult<D>>(
  arg: InfiniteQueryArgFrom<D> | SkipToken,
  options?: UseInfiniteQueryStateOptions<D, R>,
) => UseInfiniteQueryStateResult<D, R>

export type InfiniteQueryHooks<
  Definition extends InfiniteQueryDefinition<any, any, any, any, any>,
> = {
  useInfiniteQuery: UseInfiniteQuery<Definition>
  useInfiniteQuerySubscription: UseInfiniteQuerySubscription<Definition>
  useInfiniteQueryState: UseInfiniteQueryState<Definition>
}

export type MutationStateSelector<
  R extends Record<string, any>,
  D extends MutationDefinition<any, any, any, any>,
> = (state: MutationResultSelectorResult<D>) => R

export type UseMutationStateOptions<
  D extends MutationDefinition<any, any, any, any>,
  R extends Record<string, any>,
> = {
  selectFromResult?: MutationStateSelector<R, D>
  fixedCacheKey?: string
}

export type MutationTrigger<D extends MutationDefinition<any, any, any, any>> =
  {
    /**
     * Triggers the mutation and returns a Promise.
     * @remarks
     * If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
     *
     * @example
     * ```ts
     * // codeblock-meta title="Using .unwrap with async await"
     * try {
     *   const payload = await addPost({ id: 1, name: 'Example' }).unwrap();
     *   console.log('fulfilled', payload);
     * } catch (error) {
     *   console.error('rejected', error);
     * }
     * ```
     */
    (arg: QueryArgFrom<D>): MutationActionCreatorResult<D>
  }

export type UseMutationStateResult<
  D extends MutationDefinition<any, any, any, any>,
  R,
> = R & {
  originalArgs?: QueryArgFrom<D>
  /**
   * Resets the hook state to its initial `uninitialized` state.
   * This will also remove the last result from the cache.
   */
  reset: () => void
}

export type UseMutation<D extends MutationDefinition<any, any, any, any>> = <
  R extends Record<string, any> = MutationResultSelectorResult<D>,
>(
  options?: UseMutationStateOptions<D, R>,
) => readonly [MutationTrigger<D>, UseMutationStateResult<D, R>]

export type MutationHooks<
  Definition extends MutationDefinition<any, any, any, any, any>,
> = {
  useMutation: UseMutation<Definition>
}

export type TypedUseQuery<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = UseQuery<QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>>

export type TypedUseQueryStateResult<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  R = UseQueryStateDefaultResult<
    QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
  >,
> = R

export type TypedUseQuerySubscriptionResult<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = UseQuerySubscriptionResult<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
>

export type TypedUseQueryHookResult<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  R = UseQueryStateDefaultResult<
    QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
  >,
> = TypedUseQueryStateResult<ResultType, QueryArg, BaseQuery, R> &
  TypedUseQuerySubscriptionResult<ResultType, QueryArg, BaseQuery>

export type TypedUseQuerySubscription<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = UseQuerySubscription<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
>

export type TypedUseLazyQuery<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = UseLazyQuery<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
>

export type TypedUseLazyQueryStateResult<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  R = UseQueryStateDefaultResult<
    QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
  >,
> = UseLazyQueryStateResult<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>,
  R
>

export type TypedLazyQueryTrigger<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = LazyQueryTrigger<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
>

export type TypedUseLazyQuerySubscription<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = UseLazyQuerySubscription<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
>

export type TypedQueryStateSelector<
  ResultType,
  QueryArgumentType,
  BaseQueryFunctionType extends BaseQueryFn,
  SelectedResultType extends Record<string, any> = UseQueryStateDefaultResult<
    QueryDefinition<
      QueryArgumentType,
      BaseQueryFunctionType,
      string,
      ResultType,
      string
    >
  >,
> = QueryStateSelector<
  SelectedResultType,
  QueryDefinition<
    QueryArgumentType,
    BaseQueryFunctionType,
    string,
    ResultType,
    string
  >
>

export type TypedUseQueryState<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = UseQueryState<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
>

export type TypedUseQueryStateOptions<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  SelectedResult extends Record<string, any> = UseQueryStateDefaultResult<
    QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>
  >,
> = UseQueryStateOptions<
  QueryDefinition<QueryArg, BaseQuery, string, ResultType, string>,
  SelectedResult
>

export type TypedLazyInfiniteQueryTrigger<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
> = LazyInfiniteQueryTrigger<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >
>

export type TypedUseInfiniteQuerySubscription<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
> = UseInfiniteQuerySubscription<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >
>

export type TypedUseInfiniteQuerySubscriptionResult<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
> = UseInfiniteQuerySubscriptionResult<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >
>

export type TypedInfiniteQueryStateSelector<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
  SelectedResult extends Record<string, any> =
    UseInfiniteQueryStateDefaultResult<
      InfiniteQueryDefinition<
        QueryArg,
        PageParam,
        BaseQuery,
        string,
        ResultType,
        string
      >
    >,
> = InfiniteQueryStateSelector<
  SelectedResult,
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >
>

export type TypedUseInfiniteQuery<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
> = UseInfiniteQuery<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >
>

export type TypedUseInfiniteQueryState<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
> = UseInfiniteQueryState<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >
>

export type TypedUseInfiniteQueryHookResult<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
  R extends Record<string, any> = UseInfiniteQueryStateDefaultResult<
    InfiniteQueryDefinition<
      QueryArg,
      PageParam,
      BaseQuery,
      string,
      ResultType,
      string
    >
  >,
> = UseInfiniteQueryHookResult<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >,
  R
>

export type TypedUseInfiniteQueryStateOptions<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
  SelectedResult extends Record<string, any> =
    UseInfiniteQueryStateDefaultResult<
      InfiniteQueryDefinition<
        QueryArg,
        PageParam,
        BaseQuery,
        string,
        ResultType,
        string
      >
    >,
> = UseInfiniteQueryStateOptions<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >,
  SelectedResult
>

export type TypedUseInfiniteQueryStateResult<
  ResultType,
  QueryArg,
  PageParam,
  BaseQuery extends BaseQueryFn,
  R = UseInfiniteQueryStateDefaultResult<
    InfiniteQueryDefinition<
      QueryArg,
      PageParam,
      BaseQuery,
      string,
      ResultType,
      string
    >
  >,
> = UseInfiniteQueryStateResult<
  InfiniteQueryDefinition<
    QueryArg,
    PageParam,
    BaseQuery,
    string,
    ResultType,
    string
  >,
  R
>

export type TypedUseMutationStateOptions<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  SelectedResult extends Record<string, any> = MutationResultSelectorResult<
    MutationDefinition<QueryArg, BaseQuery, string, ResultType, string>
  >,
> = UseMutationStateOptions<
  MutationDefinition<QueryArg, BaseQuery, string, ResultType, string>,
  SelectedResult
>

export type TypedUseMutationResult<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
  R = MutationResultSelectorResult<
    MutationDefinition<QueryArg, BaseQuery, string, ResultType, string>
  >,
> = UseMutationStateResult<
  MutationDefinition<QueryArg, BaseQuery, string, ResultType, string>,
  R
>

export type TypedUseMutation<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = UseMutation<
  MutationDefinition<QueryArg, BaseQuery, string, ResultType, string>
>

export type TypedMutationTrigger<
  ResultType,
  QueryArg,
  BaseQuery extends BaseQueryFn,
> = MutationTrigger<
  MutationDefinition<QueryArg, BaseQuery, string, ResultType, string>
>
