/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/query/core/buildInitiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseQueryError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EndpointDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryConfigOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryResultSelectorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PageParamFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryArgFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryDefinition<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryResultSelectorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryReturnValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultTypeFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SafePromise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SerializedError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SubscriptionOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ThunkAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StartQueryActionCreatorOptions = {
  subscribe?: boolean
  forceRefetch?: boolean | number
  subscriptionOptions?: SubscriptionOptions
  [forceQueryFnSymbol]?: () => QueryReturnValue
}

export type QueryActionCreatorFields = {
  requestId: string
  subscriptionOptions: SubscriptionOptions | undefined
  abort(): void
  unsubscribe(): void
  updateSubscriptionOptions(options: SubscriptionOptions): void
  queryCacheKey: string
}

export type QueryActionCreatorResult<
  D extends QueryDefinition<any, any, any, any>,
> = SafePromise<QueryResultSelectorResult<D>> &
  QueryActionCreatorFields & {
    arg: QueryArgFrom<D>
    unwrap(): Promise<ResultTypeFrom<D>>
    refetch(): QueryActionCreatorResult<D>
  }

export type StartQueryActionCreator<
  D extends QueryDefinition<any, any, any, any, any>,
> = (
  arg: QueryArgFrom<D>,
  options?: StartQueryActionCreatorOptions,
) => ThunkAction<QueryActionCreatorResult<D>, any, any, UnknownAction>

export type BuildInitiateApiEndpointQuery<
  Definition extends QueryDefinition<any, any, any, any, any>,
> = {
  initiate: StartQueryActionCreator<Definition>
}

export type StartInfiniteQueryActionCreatorOptions<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = StartQueryActionCreatorOptions & {
  direction?: InfiniteQueryDirection
  param?: unknown
} & Partial<
    Pick<
      Partial<
        InfiniteQueryConfigOptions<
          ResultTypeFrom<D>,
          PageParamFrom<D>,
          InfiniteQueryArgFrom<D>
        >
      >,
      'initialPageParam' | 'refetchCachedPages'
    >
  >

export type InfiniteQueryActionCreatorResult<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = SafePromise<InfiniteQueryResultSelectorResult<D>> &
  QueryActionCreatorFields & {
    arg: InfiniteQueryArgFrom<D>
    unwrap(): Promise<InfiniteData<ResultTypeFrom<D>, PageParamFrom<D>>>
    refetch(
      options?: Pick<
        StartInfiniteQueryActionCreatorOptions<D>,
        'refetchCachedPages'
      >,
    ): InfiniteQueryActionCreatorResult<D>
  }

export type StartInfiniteQueryActionCreator<
  D extends InfiniteQueryDefinition<any, any, any, any, any>,
> = (
  arg: InfiniteQueryArgFrom<D>,
  options?: StartInfiniteQueryActionCreatorOptions<D>,
) => ThunkAction<InfiniteQueryActionCreatorResult<D>, any, any, UnknownAction>

export type BuildInitiateApiEndpointInfiniteQuery<
  Definition extends InfiniteQueryDefinition<any, any, any, any, any>,
> = {
  initiate: StartInfiniteQueryActionCreator<Definition>
}

export type MutationActionCreatorResult<
  D extends MutationDefinition<any, any, any, any>,
> = SafePromise<
  | {
      data: ResultTypeFrom<D>
      error?: undefined
    }
  | {
      data?: undefined
      error:
        | Exclude<
            BaseQueryError<
              D extends MutationDefinition<any, infer BaseQuery, any, any>
                ? BaseQuery
                : never
            >,
            undefined
          >
        | SerializedError
    }
> & {
  /** @internal */
  arg: {
    /**
     * The name of the given endpoint for the mutation
     */
    endpointName: string
    /**
     * The original arguments supplied to the mutation call
     */
    originalArgs: QueryArgFrom<D>
    /**
     * Whether the mutation is being tracked in the store.
     */
    track?: boolean
    fixedCacheKey?: string
  }
  /**
   * A unique string generated for the request sequence
   */
  requestId: string

  /**
   * A method to cancel the mutation promise. Note that this is not intended to prevent the mutation
   * that was fired off from reaching the server, but only to assist in handling the response.
   *
   * Calling `abort()` prior to the promise resolving will force it to reach the error state with
   * the serialized error:
   * `{ name: 'AbortError', message: 'Aborted' }`
   *
   * @example
   * ```ts
   * const [updateUser] = useUpdateUserMutation();
   *
   * useEffect(() => {
   *   const promise = updateUser(id);
   *   promise
   *     .unwrap()
   *     .catch((err) => {
   *       if (err.name === 'AbortError') return;
   *       // else handle the unexpected error
   *     })
   *
   *   return () => {
   *     promise.abort();
   *   }
   * }, [id, updateUser])
   * ```
   */
  abort(): void
  /**
   * Unwraps a mutation call to provide the raw response/error.
   *
   * @remarks
   * If you need to access the error or success payload immediately after a mutation, you can chain .unwrap().
   *
   * @example
   * ```ts
   * // codeblock-meta title="Using .unwrap"
   * addPost({ id: 1, name: 'Example' })
   *   .unwrap()
   *   .then((payload) => console.log('fulfilled', payload))
   *   .catch((error) => console.error('rejected', error));
   * ```
   *
   * @example
   * ```ts
   * // codeblock-meta title="Using .unwrap with async await"
   * try {
   *   const payload = await addPost({ id: 1, name: 'Example' }).unwrap();
   *   console.log('fulfilled', payload)
   * } catch (error) {
   *   console.error('rejected', error);
   * }
   * ```
   */
  unwrap(): Promise<ResultTypeFrom<D>>
  /**
   * A method to manually unsubscribe from the mutation call, meaning it will be removed from cache after the usual caching grace period.
   The value returned by the hook will reset to `isUninitialized` afterwards.
   */
  reset(): void
}

export type StartMutationActionCreator<
  D extends MutationDefinition<any, any, any, any>,
> = (
  arg: QueryArgFrom<D>,
  options?: {
    /**
     * If this mutation should be tracked in the store.
     * If you just want to manually trigger this mutation using `dispatch` and don't care about the
     * result, state & potential errors being held in store, you can set this to false.
     * (defaults to `true`)
     */
    track?: boolean
    fixedCacheKey?: string
  },
) => ThunkAction<MutationActionCreatorResult<D>, any, any, UnknownAction>

export type BuildInitiateApiEndpointMutation<
  Definition extends MutationDefinition<any, any, any, any, any>,
> = {
  initiate: StartMutationActionCreator<Definition>
}

export type RefetchOptions = {
  refetchCachedPages?: boolean
}

export type AnyActionCreatorResult = SafePromise<any> &
  QueryActionCreatorFields & {
    arg: any
    unwrap(): Promise<any>
    refetch(options?: RefetchOptions): AnyActionCreatorResult
  }

export type AnyQueryActionCreator<D extends EndpointDefinition<any, any, any, any>> = (
  arg: any,
  options?: StartQueryActionCreatorOptions,
) => ThunkAction<AnyActionCreatorResult, any, any, UnknownAction>
