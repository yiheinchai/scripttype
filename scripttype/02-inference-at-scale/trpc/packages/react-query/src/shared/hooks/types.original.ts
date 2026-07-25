/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/shared/hooks/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateTRPCClientOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedUseQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DistributiveOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FetchInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InfiniteQueryObserverSuccessResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JSX<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryObserverSuccessResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReactNode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCContextProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCRequestOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUntypedClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseInfiniteQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseMutationResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseInfiniteQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type coerceAsyncIterableToArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OutputWithCursor<TData, TCursor = any> = {
  cursor: TCursor | null;
  data: TData;
};

export type ExtractCursorType<TInput> = TInput extends { cursor?: any }
  ? TInput['cursor']
  : unknown;

export interface TRPCReactRequestOptions
  // For RQ, we use their internal AbortSignals instead of letting the user pass their own
  extends Omit<TRPCRequestOptions, 'signal'> {
  /**
   * Opt out of SSR for this query by passing `ssr: false`
   */
  ssr?: boolean;
  /**
   * Opt out or into aborting request on unmount
   */
  abortOnUnmount?: boolean;
}

export interface TRPCUseQueryBaseOptions {
  /**
   * tRPC-related options
   */
  trpc?: TRPCReactRequestOptions;
}

export type UseTRPCPrefetchInfiniteQueryOptions<TInput, TOutput, TError> =
  DistributiveOmit<
    FetchInfiniteQueryOptions<
      TOutput,
      TError,
      TOutput,
      any,
      ExtractCursorType<TInput>
    >,
    'queryKey' | 'initialPageParam'
  > &
    TRPCUseQueryBaseOptions & {
      initialCursor?: ExtractCursorType<TInput>;
    };

export interface TRPCSubscriptionIdleResult<TOutput>
  extends TRPCSubscriptionBaseResult<TOutput, null> {
  status: 'idle';
  data: undefined;
  error: null;
}

export interface TRPCSubscriptionConnectingResult<TOutput, TError>
  extends TRPCSubscriptionBaseResult<TOutput, TError> {
  status: 'connecting';
  data: undefined | TOutput;
  error: TError | null;
}

export interface TRPCSubscriptionErrorResult<TOutput, TError>
  extends TRPCSubscriptionBaseResult<TOutput, TError> {
  status: 'error';
  data: TOutput | undefined;
  error: TError;
}

export interface TRPCSubscriptionPendingResult<TOutput>
  extends TRPCSubscriptionBaseResult<TOutput, undefined> {
  status: 'pending';
  data: TOutput | undefined;
  error: null;
}

export type TRPCSubscriptionResult<TOutput, TError> =
  | TRPCSubscriptionIdleResult<TOutput>
  | TRPCSubscriptionConnectingResult<TOutput, TError>
  | TRPCSubscriptionErrorResult<TOutput, TError>
  | TRPCSubscriptionPendingResult<TOutput>;

export interface TRPCProviderProps<TRouter extends AnyRouter, TSSRContext>
  extends Omit<TRPCContextProps<TRouter, TSSRContext>, 'client'> {
  children: ReactNode;
  client: TRPCClient<TRouter> | TRPCUntypedClient<TRouter>;
}

export type TRPCProvider<TRouter extends AnyRouter, TSSRContext> = (
  props: TRPCProviderProps<TRouter, TSSRContext>,
) => JSX.Element;

export type CreateClient<TRouter extends AnyRouter> = (
  opts: CreateTRPCClientOptions<TRouter>,
) => TRPCUntypedClient<TRouter>;

export interface TRPCHookResult {
  trpc: {
    path: string;
  };
}

export type UseTRPCQueryResult<TData, TError> = TRPCHookResult &
  UseQueryResult<coerceAsyncIterableToArray<TData>, TError>;

export type DefinedUseTRPCQueryResult<TData, TError> = DefinedUseQueryResult<
  TData,
  TError
> &
  TRPCHookResult;

export type UseTRPCQuerySuccessResult<TData, TError> =
  QueryObserverSuccessResult<TData, TError> & TRPCHookResult;

export type UseTRPCSuspenseQueryResult<TData, TError> = [
  TData,
  UseSuspenseQueryResult<TData, TError> & TRPCHookResult,
];

export type UseTRPCInfiniteQueryResult<TData, TError, TInput> = TRPCHookResult &
  UseInfiniteQueryResult<
    InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>,
    TError
  >;

export type UseTRPCInfiniteQuerySuccessResult<TData, TError, TInput> =
  InfiniteQueryObserverSuccessResult<
    InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>,
    TError
  > &
    TRPCHookResult;

export type UseTRPCSuspenseInfiniteQueryResult<TData, TError, TInput> = [
  InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>,
  UseSuspenseInfiniteQueryResult<
    InfiniteData<TData, NonNullable<ExtractCursorType<TInput>> | null>,
    TError
  > &
    TRPCHookResult,
];

export type UseTRPCMutationResult<TData, TError, TVariables, TContext> =
  TRPCHookResult & UseMutationResult<TData, TError, TVariables, TContext>;
