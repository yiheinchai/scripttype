/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/createTRPCReact.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateReactUtils<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedInitialDataInfiniteOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedUseInfiniteQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedUseTRPCQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedUseTRPCQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProcedureType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProtectedIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SkipToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientErrorLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCFetchInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCFetchQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCHookResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCProvider<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCSubscriptionResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUseQueries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUseQueryBaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUseSuspenseQueries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedInitialDataInfiniteOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseInfiniteQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseInfiniteQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCMutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCMutationResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCSubscriptionOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCSuspenseQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type createTRPCClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAsyncIterableYield<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ResolverDef = {
  input: any;
  output: any;
  transformer: boolean;
  errorShape: any;
};

export type ProcedureUsePrefetchQuery<TDef extends ResolverDef> = (
  input: TDef['input'] | SkipToken,
  opts?: TRPCFetchQueryOptions<TDef['output'], TRPCClientErrorLike<TDef>>,
) => void;

export type ReservedInfiniteQueryKeys = 'cursor' | 'direction';

export type InfiniteInput<TInput> =
  | Omit<TInput, ReservedInfiniteQueryKeys>
  | SkipToken;

export type inferCursorType<TInput> = TInput extends { cursor?: any }
  ? TInput['cursor']
  : unknown;

export type makeInfiniteQueryOptions<TCursor, TOptions> = Omit<
  TOptions,
  'queryKey' | 'initialPageParam' | 'queryFn' | 'queryHash' | 'queryHashFn'
> &
  TRPCUseQueryBaseOptions & {
    initialCursor?: TCursor;
  };

export type trpcInfiniteData<TDef extends ResolverDef> = Simplify<
  InfiniteData<TDef['output'], inferCursorType<TDef['input']>>
>;

export type useTRPCSuspenseInfiniteQuery<TDef extends ResolverDef> = (
  input: InfiniteInput<TDef['input']>,
  opts: makeInfiniteQueryOptions<
    inferCursorType<TDef['input']>,
    UseSuspenseInfiniteQueryOptions<
      //     TQueryFnData,
      TDef['output'],
      //     TError,
      TRPCClientErrorLike<TDef>,
      //     TData,
      trpcInfiniteData<TDef>,
      //     TQueryKey,
      any,
      //     TPageParam
      inferCursorType<TDef['input']>
    >
  >,
) => [
  trpcInfiniteData<TDef>,
  TRPCHookResult &
    UseSuspenseInfiniteQueryResult<
      trpcInfiniteData<TDef>,
      TRPCClientErrorLike<TDef>
    >,
];

export type CursorInput = {
  cursor?: any;
} | void;

export interface useTRPCInfiniteQuery<TDef extends ResolverDef> {
  // 1st
  <TData = trpcInfiniteData<TDef>>(
    input: InfiniteInput<TDef['input']>,
    opts: makeInfiniteQueryOptions<
      inferCursorType<TDef['input']>,
      DefinedInitialDataInfiniteOptions<
        //     TQueryFnData,
        TDef['output'],
        //     TError,
        TRPCClientErrorLike<TDef>,
        //     TData,
        TData,
        //     TQueryKey,
        any,
        //     TPageParam
        inferCursorType<TDef['input']>
      >
    >,
  ): TRPCHookResult &
    DefinedUseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;

  // 2nd
  <TData = trpcInfiniteData<TDef>>(
    input: InfiniteInput<TDef['input']>,
    opts?: makeInfiniteQueryOptions<
      inferCursorType<TDef['input']>,
      UndefinedInitialDataInfiniteOptions<
        //     TQueryFnData,
        TDef['output'],
        //     TError,
        TRPCClientErrorLike<TDef>,
        //     TData,
        TData,
        //     TQueryKey,
        any,
        //     TPageParam
        inferCursorType<TDef['input']>
      >
    >,
  ): TRPCHookResult & UseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;

  // 3rd:
  <TData = trpcInfiniteData<TDef>>(
    input: InfiniteInput<TDef['input']>,
    opts?: makeInfiniteQueryOptions<
      inferCursorType<TDef['input']>,
      UseInfiniteQueryOptions<
        //     TQueryFnData,
        TDef['output'],
        //     TError,
        TRPCClientErrorLike<TDef>,
        //     TData,
        TData,
        //     TQueryKey,
        any,
        //     TPageParam
        inferCursorType<TDef['input']>
      >
    >,
  ): TRPCHookResult & UseInfiniteQueryResult<TData, TRPCClientErrorLike<TDef>>;
}

export type MaybeDecoratedInfiniteQuery<TDef extends ResolverDef> =
  TDef['input'] extends CursorInput
    ? {
        /**
         * @see https://trpc.io/docs/v11/client/react/useInfiniteQuery
         */
        useInfiniteQuery: useTRPCInfiniteQuery<TDef>;
        /**
         * @see https://trpc.io/docs/client/react/suspense#usesuspenseinfinitequery
         */
        useSuspenseInfiniteQuery: useTRPCSuspenseInfiniteQuery<TDef>;

        usePrefetchInfiniteQuery: (
          input: Omit<TDef['input'], ReservedInfiniteQueryKeys> | SkipToken,
          opts: TRPCFetchInfiniteQueryOptions<
            TDef['input'],
            TDef['output'],
            TRPCClientErrorLike<TDef>
          >,
        ) => void;
      }
    : object;

export interface ProcedureUseQuery<TDef extends ResolverDef> {
  <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(
    input: TDef['input'] | SkipToken,
    opts: DefinedUseTRPCQueryOptions<
      TQueryFnData,
      TData,
      TRPCClientErrorLike<{
        errorShape: TDef['errorShape'];
        transformer: TDef['transformer'];
      }>,
      TDef['output']
    >,
  ): DefinedUseTRPCQueryResult<
    TData,
    TRPCClientErrorLike<{
      errorShape: TDef['errorShape'];
      transformer: TDef['transformer'];
    }>
  >;

  <TQueryFnData extends TDef['output'] = TDef['output'], TData = TQueryFnData>(
    input: TDef['input'] | SkipToken,
    opts?: UseTRPCQueryOptions<
      TQueryFnData,
      TData,
      TRPCClientErrorLike<TDef>,
      TDef['output']
    >,
  ): UseTRPCQueryResult<TData, TRPCClientErrorLike<TDef>>;
}

export type DecoratedQueryMethods<TDef extends ResolverDef> = {
  /**
   * @see https://trpc.io/docs/v11/client/react/useQuery
   */
  useQuery: ProcedureUseQuery<TDef>;
  usePrefetchQuery: ProcedureUsePrefetchQuery<TDef>;
  /**
   * @see https://trpc.io/docs/v11/client/react/suspense#usesuspensequery
   */
  useSuspenseQuery: <
    TQueryFnData extends TDef['output'] = TDef['output'],
    TData = TQueryFnData,
  >(
    input: TDef['input'],
    opts?: UseTRPCSuspenseQueryOptions<
      TQueryFnData,
      TData,
      TRPCClientErrorLike<TDef>
    >,
  ) => [
    TData,
    UseSuspenseQueryResult<TData, TRPCClientErrorLike<TDef>> & TRPCHookResult,
  ];
};

export type DecoratedQuery<TDef extends ResolverDef> =
  MaybeDecoratedInfiniteQuery<TDef> & DecoratedQueryMethods<TDef>;

export type DecoratedMutation<TDef extends ResolverDef> = {
  /**
   * @see https://trpc.io/docs/v11/client/react/useMutation
   */
  useMutation: <TContext = unknown>(
    opts?: UseTRPCMutationOptions<
      TDef['input'],
      TRPCClientErrorLike<TDef>,
      TDef['output'],
      TContext
    >,
  ) => UseTRPCMutationResult<
    TDef['output'],
    TRPCClientErrorLike<TDef>,
    TDef['input'],
    TContext
  >;
};

export interface ProcedureUseSubscription<TDef extends ResolverDef> {
  // Without skip token
  (
    input: TDef['input'],
    opts?: UseTRPCSubscriptionOptions<
      inferAsyncIterableYield<TDef['output']>,
      TRPCClientErrorLike<TDef>
    >,
  ): TRPCSubscriptionResult<
    inferAsyncIterableYield<TDef['output']>,
    TRPCClientErrorLike<TDef>
  >;

  // With skip token
  (
    input: TDef['input'] | SkipToken,
    opts?: Omit<
      UseTRPCSubscriptionOptions<
        inferAsyncIterableYield<TDef['output']>,
        TRPCClientErrorLike<TDef>
      >,
      'enabled'
    >,
  ): TRPCSubscriptionResult<
    inferAsyncIterableYield<TDef['output']>,
    TRPCClientErrorLike<TDef>
  >;
}

export type DecorateProcedure<
  TType extends ProcedureType,
  TDef extends ResolverDef,
> = TType extends 'query'
  ? DecoratedQuery<TDef>
  : TType extends 'mutation'
    ? DecoratedMutation<TDef>
    : TType extends 'subscription'
      ? {
          /**
           * @see https://trpc.io/docs/v11/subscriptions
           */
          useSubscription: ProcedureUseSubscription<TDef>;
        }
      : never;

export type DecorateRouterRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyProcedure
      ? DecorateProcedure<
          $Value['_def']['type'],
          {
            input: inferProcedureInput<$Value>;
            output: inferTransformedProcedureOutput<TRoot, $Value>;
            transformer: TRoot['transformer'];
            errorShape: TRoot['errorShape'];
          }
        >
      : $Value extends RouterRecord
        ? DecorateRouterRecord<TRoot, $Value>
        : never
    : never;
};

export type CreateTRPCReactBase<TRouter extends AnyRouter, TSSRContext> = {
  /**
   * @deprecated renamed to `useUtils` and will be removed in a future tRPC version
   *
   * @see https://trpc.io/docs/v11/client/react/useUtils
   */
  useContext(): CreateReactUtils<TRouter, TSSRContext>;
  /**
   * @see https://trpc.io/docs/v11/client/react/useUtils
   */
  useUtils(): CreateReactUtils<TRouter, TSSRContext>;
  Provider: TRPCProvider<TRouter, TSSRContext>;
  createClient: typeof createTRPCClient<TRouter>;
  useQueries: TRPCUseQueries<TRouter>;
  useSuspenseQueries: TRPCUseSuspenseQueries<TRouter>;
};

export type CreateTRPCReact<
  TRouter extends AnyRouter,
  TSSRContext,
> = ProtectedIntersection<
  CreateTRPCReactBase<TRouter, TSSRContext>,
  DecorateRouterRecord<
    TRouter['_def']['_config']['$types'],
    TRouter['_def']['record']
  >
>;
