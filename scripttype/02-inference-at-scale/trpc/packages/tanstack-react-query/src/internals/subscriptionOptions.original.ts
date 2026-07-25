/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/subscriptionOptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type FeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCConnectionState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCQueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unsubscribable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferAsyncIterableYield<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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

export interface UnusedSkipTokenTRPCSubscriptionOptionsIn<TOutput, TError> {
  onStarted?: () => void;
  onData?: (data: inferAsyncIterableYield<TOutput>) => void;
  onError?: (err: TError) => void;
  onConnectionStateChange?: (state: TRPCConnectionState<TError>) => void;
}

export interface TRPCSubscriptionOptionsOut<
  TOutput,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends UnusedSkipTokenTRPCSubscriptionOptionsIn<TOutput, TError>,
    TRPCQueryOptionsResult {
  enabled: boolean;
  queryKey: TRPCQueryKey<TFeatureFlags['keyPrefix']>;
  subscribe: (
    innerOpts: UnusedSkipTokenTRPCSubscriptionOptionsIn<TOutput, TError>,
  ) => Unsubscribable;
}

export type AnyTRPCSubscriptionOptionsOut<TFeatureFlags extends FeatureFlags> =
  TRPCSubscriptionOptionsOut<unknown, unknown, TFeatureFlags>;
