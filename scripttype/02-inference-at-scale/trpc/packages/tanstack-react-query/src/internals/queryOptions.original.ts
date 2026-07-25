/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/queryOptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DataTag<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultFeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedInitialDataOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NoInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCQueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedInitialDataOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnusedSkipTokenOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type coerceAsyncIterableToArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReservedOptions = 'queryKey' | 'queryFn' | 'queryHashFn' | 'queryHash';

export interface DefinedTRPCQueryOptionsIn<
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      DefinedInitialDataOptions<
        coerceAsyncIterableToArray<NoInfer<TQueryFnData>>,
        TError,
        coerceAsyncIterableToArray<TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {}

export interface UnusedSkipTokenTRPCQueryOptionsIn<
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      UnusedSkipTokenOptions<
        coerceAsyncIterableToArray<TQueryFnData>,
        TError,
        coerceAsyncIterableToArray<TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {}

export interface UndefinedTRPCQueryOptionsIn<
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      UndefinedInitialDataOptions<
        coerceAsyncIterableToArray<TQueryFnData>,
        TError,
        coerceAsyncIterableToArray<TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {}

export type AnyTRPCQueryOptionsIn<TFeatureFlags extends FeatureFlags> =
  | DefinedTRPCQueryOptionsIn<unknown, unknown, unknown, TFeatureFlags>
  | UnusedSkipTokenTRPCQueryOptionsIn<unknown, unknown, unknown, TFeatureFlags>
  | UndefinedTRPCQueryOptionsIn<unknown, unknown, unknown, TFeatureFlags>;

export interface DefinedTRPCQueryOptionsOut<
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DefinedInitialDataOptions<
      coerceAsyncIterableToArray<TQueryFnData>,
      TError,
      coerceAsyncIterableToArray<TData>,
      TRPCQueryKey<TFeatureFlags['keyPrefix']>
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<
    TRPCQueryKey<TFeatureFlags['keyPrefix']>,
    coerceAsyncIterableToArray<TData>,
    TError
  >;
}

export interface UnusedSkipTokenTRPCQueryOptionsOut<
  TQueryFnData,
  TOutput,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends UnusedSkipTokenOptions<
      coerceAsyncIterableToArray<TQueryFnData>,
      TError,
      coerceAsyncIterableToArray<TOutput>,
      TRPCQueryKey<TFeatureFlags['keyPrefix']>
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<
    TRPCQueryKey<TFeatureFlags['keyPrefix']>,
    coerceAsyncIterableToArray<TOutput>,
    TError
  >;
}

export interface UndefinedTRPCQueryOptionsOut<
  TQueryFnData,
  TOutput,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends UndefinedInitialDataOptions<
      coerceAsyncIterableToArray<TQueryFnData>,
      TError,
      coerceAsyncIterableToArray<TOutput>,
      TRPCQueryKey<TFeatureFlags['keyPrefix']>
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<
    TRPCQueryKey<TFeatureFlags['keyPrefix']>,
    coerceAsyncIterableToArray<TOutput>,
    TError
  >;
}

export type AnyTRPCQueryOptionsOut<
  TFeatureFlags extends FeatureFlags = DefaultFeatureFlags,
> =
  | DefinedTRPCQueryOptionsOut<unknown, unknown, unknown, TFeatureFlags>
  | UnusedSkipTokenTRPCQueryOptionsOut<unknown, unknown, unknown, TFeatureFlags>
  | UndefinedTRPCQueryOptionsOut<unknown, unknown, unknown, TFeatureFlags>;
