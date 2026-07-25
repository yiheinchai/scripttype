/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/infiniteQueryOptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DataTag<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DefinedInitialDataInfiniteOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ExtractCursorType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FeatureFlags<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NonNullable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCInfiniteData<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCQueryKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UndefinedInitialDataInfiniteOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnusedSkipTokenInfiniteOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
