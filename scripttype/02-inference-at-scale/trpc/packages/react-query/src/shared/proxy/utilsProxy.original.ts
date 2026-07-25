/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/shared/proxy/utilsProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyMutationProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyQueryProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CancelOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DecoratedTRPCContextProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepPartial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedTRPCInfiniteQueryOptionsIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedTRPCInfiniteQueryOptionsOut<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedTRPCQueryOptionsIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedTRPCQueryOptionsOut<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractCursorType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferMutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvalidateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvalidateQueryFilters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProtectedIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Query<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryFilters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKeyKnown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RefetchOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RefetchQueryFilters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResetOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SetDataOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SkipToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCFetchInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCFetchQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedTRPCInfiniteQueryOptionsIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedTRPCInfiniteQueryOptionsOut<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedTRPCQueryOptionsIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedTRPCQueryOptionsOut<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnusedSkipTokenTRPCInfiniteQueryOptionsIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnusedSkipTokenTRPCInfiniteQueryOptionsOut<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnusedSkipTokenTRPCQueryOptionsIn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnusedSkipTokenTRPCQueryOptionsOut<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Updater<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DecorateQueryProcedure<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyQueryProcedure,
> = {
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   */
  queryOptions<
    TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData = TQueryFnData,
  >(
    input: inferProcedureInput<TProcedure> | SkipToken,
    opts: DefinedTRPCQueryOptionsIn<
      TQueryFnData,
      TData,
      TRPCClientError<TRoot>
    >,
  ): DefinedTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   */
  queryOptions<
    TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData = TQueryFnData,
  >(
    input: inferProcedureInput<TProcedure> | SkipToken,
    opts?: UnusedSkipTokenTRPCQueryOptionsIn<
      TQueryFnData,
      TData,
      TRPCClientError<TRoot>
    >,
  ): UnusedSkipTokenTRPCQueryOptionsOut<
    TQueryFnData,
    TData,
    TRPCClientError<TRoot>
  >;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   */
  queryOptions<
    TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData = TQueryFnData,
  >(
    input: inferProcedureInput<TProcedure> | SkipToken,
    opts?: UndefinedTRPCQueryOptionsIn<
      TQueryFnData,
      TData,
      TRPCClientError<TRoot>
    >,
  ): UndefinedTRPCQueryOptionsOut<TQueryFnData, TData, TRPCClientError<TRoot>>;

  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   */
  infiniteQueryOptions<
    TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData = TQueryFnData,
  >(
    input: inferProcedureInput<TProcedure> | SkipToken,
    opts: DefinedTRPCInfiniteQueryOptionsIn<
      inferProcedureInput<TProcedure>,
      TQueryFnData,
      TData,
      TRPCClientError<TRoot>
    >,
  ): DefinedTRPCInfiniteQueryOptionsOut<
    inferProcedureInput<TProcedure>,
    TQueryFnData,
    TData,
    TRPCClientError<TRoot>
  >;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   */
  infiniteQueryOptions<
    TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData = TQueryFnData,
  >(
    input: inferProcedureInput<TProcedure>,
    opts: UnusedSkipTokenTRPCInfiniteQueryOptionsIn<
      inferProcedureInput<TProcedure>,
      TQueryFnData,
      TData,
      TRPCClientError<TRoot>
    >,
  ): UnusedSkipTokenTRPCInfiniteQueryOptionsOut<
    inferProcedureInput<TProcedure>,
    TQueryFnData,
    TData,
    TRPCClientError<TRoot>
  >;
  /**
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   */
  infiniteQueryOptions<
    TQueryFnData extends inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData = TQueryFnData,
  >(
    input: inferProcedureInput<TProcedure> | SkipToken,
    opts?: UndefinedTRPCInfiniteQueryOptionsIn<
      inferProcedureInput<TProcedure>,
      TQueryFnData,
      TData,
      TRPCClientError<TRoot>
    >,
  ): UndefinedTRPCInfiniteQueryOptionsOut<
    inferProcedureInput<TProcedure>,
    TQueryFnData,
    TData,
    TRPCClientError<TRoot>
  >;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchquery
   */
  fetch(
    input: inferProcedureInput<TProcedure>,
    opts?: TRPCFetchQueryOptions<
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      TRPCClientError<TRoot>
    >,
  ): Promise<inferTransformedProcedureOutput<TRoot, TProcedure>>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientfetchinfinitequery
   */
  fetchInfinite(
    input: inferProcedureInput<TProcedure>,
    opts?: TRPCFetchInfiniteQueryOptions<
      inferProcedureInput<TProcedure>,
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      TRPCClientError<TRoot>
    >,
  ): Promise<
    InfiniteData<
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null
    >
  >;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientprefetchquery
   */
  prefetch(
    input: inferProcedureInput<TProcedure>,
    opts?: TRPCFetchQueryOptions<
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      TRPCClientError<TRoot>
    >,
  ): Promise<void>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientprefetchinfinitequery
   */
  prefetchInfinite(
    input: inferProcedureInput<TProcedure>,
    opts?: TRPCFetchInfiniteQueryOptions<
      inferProcedureInput<TProcedure>,
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      TRPCClientError<TRoot>
    >,
  ): Promise<void>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientensurequerydata
   */
  ensureData(
    input: inferProcedureInput<TProcedure>,
    opts?: TRPCFetchQueryOptions<
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      TRPCClientError<TRoot>
    >,
  ): Promise<inferTransformedProcedureOutput<TRoot, TProcedure>>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientinvalidatequeries
   */
  invalidate(
    input?: DeepPartial<inferProcedureInput<TProcedure>>,
    filters?: Omit<InvalidateQueryFilters, 'predicate'> & {
      predicate?: (
        query: Query<
          inferProcedureOutput<TProcedure>,
          TRPCClientError<TRoot>,
          inferTransformedProcedureOutput<TRoot, TProcedure>,
          QueryKeyKnown<
            inferProcedureInput<TProcedure>,
            inferProcedureInput<TProcedure> extends { cursor?: any } | void
              ? 'infinite'
              : 'query'
          >
        >,
      ) => boolean;
    },
    options?: InvalidateOptions,
  ): Promise<void>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientrefetchqueries
   */
  refetch(
    input?: inferProcedureInput<TProcedure>,
    filters?: RefetchQueryFilters,
    options?: RefetchOptions,
  ): Promise<void>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientcancelqueries
   */
  cancel(
    input?: inferProcedureInput<TProcedure>,
    options?: CancelOptions,
  ): Promise<void>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientresetqueries
   */
  reset(
    input?: inferProcedureInput<TProcedure>,
    options?: ResetOptions,
  ): Promise<void>;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setData(
    /**
     * The input of the procedure
     */
    input: inferProcedureInput<TProcedure>,
    updater: Updater<
      inferTransformedProcedureOutput<TRoot, TProcedure> | undefined,
      inferTransformedProcedureOutput<TRoot, TProcedure> | undefined
    >,
    options?: SetDataOptions,
  ): void;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setQueriesData(
    /**
     * The input of the procedure
     */
    input: inferProcedureInput<TProcedure>,
    filters: QueryFilters,
    updater: Updater<
      inferTransformedProcedureOutput<TRoot, TProcedure> | undefined,
      inferTransformedProcedureOutput<TRoot, TProcedure> | undefined
    >,
    options?: SetDataOptions,
  ): [QueryKey, inferTransformedProcedureOutput<TRoot, TProcedure>];

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientsetquerydata
   */
  setInfiniteData(
    input: inferProcedureInput<TProcedure>,
    updater: Updater<
      | InfiniteData<
          inferTransformedProcedureOutput<TRoot, TProcedure>,
          NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null
        >
      | undefined,
      | InfiniteData<
          inferTransformedProcedureOutput<TRoot, TProcedure>,
          NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null
        >
      | undefined
    >,
    options?: SetDataOptions,
  ): void;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
   */
  getData(
    input?: inferProcedureInput<TProcedure>,
  ): inferTransformedProcedureOutput<TRoot, TProcedure> | undefined;

  /**
   * @see https://tanstack.com/query/v5/docs/reference/QueryClient#queryclientgetquerydata
   */
  getInfiniteData(
    input?: inferProcedureInput<TProcedure>,
  ):
    | InfiniteData<
        inferTransformedProcedureOutput<TRoot, TProcedure>,
        NonNullable<ExtractCursorType<inferProcedureInput<TProcedure>>> | null
      >
    | undefined;
};

export type DecorateMutationProcedure<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyMutationProcedure,
> = {
  setMutationDefaults<TMeta = unknown>(
    options:
      | InferMutationOptions<TRoot, TProcedure, TMeta>
      | ((args: {
          canonicalMutationFn: NonNullable<
            InferMutationOptions<TRoot, TProcedure>['mutationFn']
          >;
        }) => InferMutationOptions<TRoot, TProcedure, TMeta>),
  ): void;

  getMutationDefaults(): InferMutationOptions<TRoot, TProcedure> | undefined;

  isMutating(): number;
};

export type DecorateRouter = {
  /**
   * Invalidate the full router
   * @see https://trpc.io/docs/v10/useContext#query-invalidation
   * @see https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation
   */
  invalidate(
    input?: undefined,
    filters?: InvalidateQueryFilters,
    options?: InvalidateOptions,
  ): Promise<void>;
};

export type DecoratedProcedureUtilsRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = DecorateRouter & {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyQueryProcedure
      ? DecorateQueryProcedure<TRoot, $Value>
      : $Value extends AnyMutationProcedure
        ? DecorateMutationProcedure<TRoot, $Value>
        : $Value extends RouterRecord
          ? DecoratedProcedureUtilsRecord<TRoot, $Value> & DecorateRouter
          : never
    : never;
};

export type CreateReactUtils<
  TRouter extends AnyRouter,
  TSSRContext,
> = ProtectedIntersection<
  DecoratedTRPCContextProps<TRouter, TSSRContext>,
  DecoratedProcedureUtilsRecord<
    TRouter['_def']['_config']['$types'],
    TRouter['_def']['record']
  >
>;

export type CreateQueryUtils<TRouter extends AnyRouter> =
  DecoratedProcedureUtilsRecord<
    TRouter['_def']['_config']['$types'],
    TRouter['_def']['record']
  >;
