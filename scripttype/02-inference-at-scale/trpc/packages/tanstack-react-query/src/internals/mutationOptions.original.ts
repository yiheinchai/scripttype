/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/mutationOptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DistributiveOmit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FeatureFlags<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type KeyPrefixOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCMutationKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCQueryBaseOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseMutationOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ReservedOptions = 'mutationKey' | 'mutationFn';

export type TRPCMutationOptionsIn<
  TInput,
  TError,
  TOutput,
  TContext,
  TFeatureFlags extends FeatureFlags,
> = DistributiveOmit<
  UseMutationOptions<TOutput, TError, TInput, TContext>,
  ReservedOptions
> &
  TRPCQueryBaseOptions &
  KeyPrefixOptions<TFeatureFlags>;

export type AnyTRPCMutationOptionsIn<TFeatureFlags extends FeatureFlags> =
  TRPCMutationOptionsIn<unknown, unknown, unknown, unknown, TFeatureFlags>;

export interface TRPCMutationOptionsOut<
  TInput,
  TError,
  TOutput,
  TContext,
  TFeatureFlags extends FeatureFlags,
> extends UseMutationOptions<TOutput, TError, TInput, TContext>,
    TRPCQueryOptionsResult {
  mutationKey: TRPCMutationKey<TFeatureFlags['keyPrefix']>;
}

export type AnyTRPCMutationOptionsOut<TFeatureFlags extends FeatureFlags> =
  TRPCMutationOptionsOut<unknown, unknown, unknown, unknown, TFeatureFlags>;
