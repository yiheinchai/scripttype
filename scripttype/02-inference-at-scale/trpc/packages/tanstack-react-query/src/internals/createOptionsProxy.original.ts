/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/createOptionsProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyTRPCProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyTRPCRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyTRPCRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DataTag<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultFeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KeyPrefixOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybePromise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MutationOptionsOverride<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalCursorInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryFilters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolverDef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientErrorLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCInfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCMutationKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCMutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCProcedureType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCQueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCRouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCSubscriptionOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUntypedClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WithRequired<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferRouterContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface DecorateInfiniteQueryProcedure<TDef extends ResolverDef>
  extends TypeHelper<TDef> {
  /**
   * Create a set of type-safe infinite query options that can be passed to `useInfiniteQuery`, `prefetchInfiniteQuery` etc.
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/infiniteQueryOptions#infinitequeryoptions
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#infiniteQueryOptions
   */
  infiniteQueryOptions: TRPCInfiniteQueryOptions<TDef>;

  /**
   * Calculate the TanStack Query Key for a Infinite Query Procedure
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#queryKey
   */
  infiniteQueryKey: (input?: Partial<TDef['input']>) => DataTag<
    TRPCQueryKey<TDef['featureFlags']['keyPrefix']>,
    TRPCInfiniteData<TDef['input'], TDef['output']>,
    TRPCClientErrorLike<{
      transformer: TDef['transformer'];
      errorShape: TDef['errorShape'];
    }>
  >;

  /**
   * Calculate a TanStack Query Filter for a Infinite Query Procedure
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/filters
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#queryFilter
   */
  infiniteQueryFilter: (
    input?: Partial<TDef['input']>,
    filters?: QueryFilters<
      DataTag<
        TRPCQueryKey<TDef['featureFlags']['keyPrefix']>,
        TRPCInfiniteData<TDef['input'], TDef['output']>,
        TRPCClientErrorLike<{
          transformer: TDef['transformer'];
          errorShape: TDef['errorShape'];
        }>
      >
    >,
  ) => WithRequired<
    QueryFilters<
      DataTag<
        TRPCQueryKey<TDef['featureFlags']['keyPrefix']>,
        TRPCInfiniteData<TDef['input'], TDef['output']>,
        TRPCClientErrorLike<{
          transformer: TDef['transformer'];
          errorShape: TDef['errorShape'];
        }>
      >
    >,
    'queryKey'
  >;
}

export interface DecorateQueryProcedure<TDef extends ResolverDef>
  extends TypeHelper<TDef>,
    DecorateRouterKeyable<TDef['featureFlags']> {
  /**
   * Create a set of type-safe query options that can be passed to `useQuery`, `prefetchQuery` etc.
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions#queryoptions
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#queryOptions
   */
  queryOptions: TRPCQueryOptions<TDef>;

  /**
   * Calculate the TanStack Query Key for a Query Procedure
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#queryKey
   */
  queryKey: (input?: Partial<TDef['input']>) => DataTag<
    TRPCQueryKey<TDef['featureFlags']['keyPrefix']>,
    TDef['output'],
    TRPCClientErrorLike<{
      transformer: TDef['transformer'];
      errorShape: TDef['errorShape'];
    }>
  >;

  /**
   * Calculate a TanStack Query Filter for a Query Procedure
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/filters
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#queryFilter
   */
  queryFilter: (
    input?: Partial<TDef['input']>,
    filters?: QueryFilters<
      DataTag<
        TRPCQueryKey<TDef['featureFlags']['keyPrefix']>,
        TDef['output'],
        TRPCClientErrorLike<{
          transformer: TDef['transformer'];
          errorShape: TDef['errorShape'];
        }>
      >
    >,
  ) => WithRequired<
    QueryFilters<
      DataTag<
        TRPCQueryKey<TDef['featureFlags']['keyPrefix']>,
        TDef['output'],
        TRPCClientErrorLike<{
          transformer: TDef['transformer'];
          errorShape: TDef['errorShape'];
        }>
      >
    >,
    'queryKey'
  >;
}

export interface DecorateMutationProcedure<TDef extends ResolverDef>
  extends TypeHelper<TDef> {
  /**
   * Create a set of type-safe mutation options that can be passed to `useMutation`
   *
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#mutationOptions
   */
  mutationOptions: TRPCMutationOptions<TDef>;

  /**
   * Calculate the TanStack Mutation Key for a Mutation Procedure
   *
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#mutationKey
   */
  mutationKey: () => TRPCMutationKey<TDef['featureFlags']['keyPrefix']>;
}

export type inferInput<
  TProcedure extends
    | DecorateInfiniteQueryProcedure<any>
    | DecorateQueryProcedure<any>
    | DecorateMutationProcedure<any>,
> = TProcedure['~types']['input'];

export type inferOutput<
  TProcedure extends
    | DecorateInfiniteQueryProcedure<any>
    | DecorateQueryProcedure<any>
    | DecorateMutationProcedure<any>,
> = TProcedure['~types']['output'];

export interface DecorateSubscriptionProcedure<TDef extends ResolverDef>
  extends TypeHelper<TDef> {
  /**
   * Create a set of type-safe subscription options that can be passed to `useSubscription`
   *
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#subscriptionOptions
   */
  subscriptionOptions: TRPCSubscriptionOptions<TDef>;
}

export type DecorateProcedure<
  TType extends TRPCProcedureType,
  TDef extends ResolverDef,
> = TType extends 'query'
  ? DecorateQueryProcedure<TDef> &
      (TDef['input'] extends OptionalCursorInput
        ? DecorateInfiniteQueryProcedure<TDef>
        : Record<string, never>)
  : TType extends 'mutation'
    ? DecorateMutationProcedure<TDef>
    : TType extends 'subscription'
      ? DecorateSubscriptionProcedure<TDef>
      : never;

export interface DecorateRouterKeyable<TFeatureFlags extends FeatureFlags> {
  /**
   * Calculate the TanStack Query Key for any path, could be used to invalidate every procedure beneath this path
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#queryKey
   */
  pathKey: () => TRPCQueryKey<TFeatureFlags['keyPrefix']>;

  /**
   * Calculate a TanStack Query Filter for any path, could be used to manipulate every procedure beneath this path
   *
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/filters
   * @see https://trpc.io/docs/client/tanstack-react-query/usage#queryFilter
   */
  pathFilter: (
    filters?: QueryFilters<TRPCQueryKey<TFeatureFlags['keyPrefix']>>,
  ) => WithRequired<
    QueryFilters<TRPCQueryKey<TFeatureFlags['keyPrefix']>>,
    'queryKey'
  >;
}

export type DecoratedRouterRecord<
  TRoot extends AnyTRPCRootTypes,
  TRecord extends TRPCRouterRecord,
  TFeatureFlags extends FeatureFlags = DefaultFeatureFlags,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends TRPCRouterRecord
      ? DecoratedRouterRecord<TRoot, $Value, TFeatureFlags> &
          DecorateRouterKeyable<TFeatureFlags>
      : $Value extends AnyTRPCProcedure
        ? DecorateProcedure<
            $Value['_def']['type'],
            {
              input: inferProcedureInput<$Value>;
              output: inferTransformedProcedureOutput<TRoot, $Value>;
              transformer: TRoot['transformer'];
              errorShape: TRoot['errorShape'];
              featureFlags: TFeatureFlags;
            }
          >
        : never
    : never;
};

export type TRPCOptionsProxy<
  TRouter extends AnyTRPCRouter,
  TFeatureFlags extends FeatureFlags = DefaultFeatureFlags,
> = DecoratedRouterRecord<
  TRouter['_def']['_config']['$types'],
  TRouter['_def']['record'],
  TFeatureFlags
> &
  DecorateRouterKeyable<TFeatureFlags>;

export type TRPCOptionsProxyOptionsBase<
  TFeatureFlags extends FeatureFlags = DefaultFeatureFlags,
> = {
  queryClient: QueryClient | (() => QueryClient);
  overrides?: {
    mutations?: MutationOptionsOverride;
  };
} & KeyPrefixOptions<TFeatureFlags>;

export interface TRPCOptionsProxyOptionsInternal<
  TRouter extends AnyTRPCRouter,
> {
  router: TRouter;
  ctx:
    | inferRouterContext<TRouter>
    | (() => MaybePromise<inferRouterContext<TRouter>>);
}

export interface TRPCOptionsProxyOptionsExternal<
  TRouter extends AnyTRPCRouter,
> {
  client: TRPCUntypedClient<TRouter> | TRPCClient<TRouter>;
}

export type TRPCOptionsProxyOptions<
  TRouter extends AnyTRPCRouter,
  TFeatureFlags extends FeatureFlags = DefaultFeatureFlags,
> = TRPCOptionsProxyOptionsBase<TFeatureFlags> &
  (
    | TRPCOptionsProxyOptionsInternal<TRouter>
    | TRPCOptionsProxyOptionsExternal<TRouter>
  );
