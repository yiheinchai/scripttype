/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/infiniteQueryOptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DataTag<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefinedInitialDataInfiniteOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractCursorType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCInfiniteData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCQueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedInitialDataInfiniteOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnusedSkipTokenInfiniteOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReservedOptions =
  | 'queryKey'
  | 'queryFn'
  | 'queryHashFn'
  | 'queryHash'
  | 'initialPageParam';

export interface DefinedTRPCInfiniteQueryOptionsIn<
  TInput,
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      DefinedInitialDataInfiniteOptions<
        TQueryFnData,
        TError,
        TRPCInfiniteData<TInput, TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>,
        NonNullable<ExtractCursorType<TInput>> | null
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {
  initialCursor?: NonNullable<ExtractCursorType<TInput>> | null;
}

export interface UnusedSkipTokenTRPCInfiniteQueryOptionsIn<
  TInput,
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      UnusedSkipTokenInfiniteOptions<
        TQueryFnData,
        TError,
        TRPCInfiniteData<TInput, TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>,
        NonNullable<ExtractCursorType<TInput>> | null
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {
  initialCursor?: NonNullable<ExtractCursorType<TInput>> | null;
}

export interface UndefinedTRPCInfiniteQueryOptionsIn<
  TInput,
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      UndefinedInitialDataInfiniteOptions<
        TQueryFnData,
        TError,
        TRPCInfiniteData<TInput, TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>,
        NonNullable<ExtractCursorType<TInput>> | null
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {
  initialCursor?: NonNullable<ExtractCursorType<TInput>> | null;
}

export type AnyTRPCInfiniteQueryOptionsIn<TFeatureFlags extends FeatureFlags> =
  | DefinedTRPCInfiniteQueryOptionsIn<any, any, any, any, TFeatureFlags>
  | UnusedSkipTokenTRPCInfiniteQueryOptionsIn<any, any, any, any, TFeatureFlags>
  | UndefinedTRPCInfiniteQueryOptionsIn<any, any, any, any, TFeatureFlags>;

export interface DefinedTRPCInfiniteQueryOptionsOut<
  TInput,
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      DefinedInitialDataInfiniteOptions<
        TQueryFnData,
        TError,
        TRPCInfiniteData<TInput, TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>,
        NonNullable<ExtractCursorType<TInput>> | null
      >,
      'initialPageParam'
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<
    TRPCQueryKey<TFeatureFlags['keyPrefix']>,
    TRPCInfiniteData<TInput, TData>,
    TError
  >;
  initialPageParam: NonNullable<ExtractCursorType<TInput>> | null;
}

export interface UnusedSkipTokenTRPCInfiniteQueryOptionsOut<
  TInput,
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      UnusedSkipTokenInfiniteOptions<
        TQueryFnData,
        TError,
        TRPCInfiniteData<TInput, TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>,
        NonNullable<ExtractCursorType<TInput>> | null
      >,
      'initialPageParam'
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<
    TRPCQueryKey<TFeatureFlags['keyPrefix']>,
    TRPCInfiniteData<TInput, TData>,
    TError
  >;
  initialPageParam: NonNullable<ExtractCursorType<TInput>> | null;
}

export interface UndefinedTRPCInfiniteQueryOptionsOut<
  TInput,
  TQueryFnData,
  TData,
  TError,
  TFeatureFlags extends FeatureFlags,
> extends DistributiveOmit<
      UndefinedInitialDataInfiniteOptions<
        TQueryFnData,
        TError,
        TRPCInfiniteData<TInput, TData>,
        TRPCQueryKey<TFeatureFlags['keyPrefix']>,
        NonNullable<ExtractCursorType<TInput>> | null
      >,
      'initialPageParam'
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<
    TRPCQueryKey<TFeatureFlags['keyPrefix']>,
    TRPCInfiniteData<TInput, TData>,
    TError
  >;
  initialPageParam: NonNullable<ExtractCursorType<TInput>> | null;
}

export type AnyTRPCInfiniteQueryOptionsOut<TFeatureFlags extends FeatureFlags> =
  | DefinedTRPCInfiniteQueryOptionsOut<any, any, any, any, TFeatureFlags>
  | UnusedSkipTokenTRPCInfiniteQueryOptionsOut<
      any,
      any,
      any,
      any,
      TFeatureFlags
    >
  | UndefinedTRPCInfiniteQueryOptionsOut<any, any, any, any, TFeatureFlags>;
