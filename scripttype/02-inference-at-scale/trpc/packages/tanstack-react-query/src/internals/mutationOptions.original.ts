/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/mutationOptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DistributiveOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KeyPrefixOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCMutationKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCQueryBaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseMutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
