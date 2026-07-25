/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/internals/useQueries.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DistributiveOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseQueriesProcedureRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseQueriesProcedureRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSuspenseQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCSuspenseQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UseQueryOptionsForUseQueries<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = DistributiveOmit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey'
>;

export type UseQueryOptionsForUseSuspenseQueries<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = DistributiveOmit<
  UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey'
>;

export type TrpcQueryOptionsForUseQueries<TOutput, TData, TError> =
  DistributiveOmit<UseTRPCQueryOptions<TOutput, TData, TError>, 'queryKey'>;

export type TrpcQueryOptionsForUseSuspenseQueries<TOutput, TData, TError> =
  DistributiveOmit<
    UseTRPCSuspenseQueryOptions<TOutput, TData, TError>,
    'queryKey'
  >;

export declare type QueriesResults<
  TQueriesOptions extends UseQueryOptionsForUseQueries<any, any, any, any>[],
> = {
  [TKey in keyof TQueriesOptions]: TQueriesOptions[TKey] extends UseQueryOptionsForUseQueries<
    infer TQueryFnData,
    infer TError,
    infer TData,
    any
  >
    ? UseTRPCQueryResult<unknown extends TData ? TQueryFnData : TData, TError>
    : never;
};

export declare type SuspenseQueriesResults<
  TQueriesOptions extends UseQueryOptionsForUseSuspenseQueries<
    any,
    any,
    any,
    any
  >[],
> = [
  {
    [TKey in keyof TQueriesOptions]: TQueriesOptions[TKey] extends UseQueryOptionsForUseSuspenseQueries<
      infer TQueryFnData,
      any,
      infer TData,
      any
    >
      ? unknown extends TData
        ? TQueryFnData
        : TData
      : never;
  },
  {
    [TKey in keyof TQueriesOptions]: TQueriesOptions[TKey] extends UseQueryOptionsForUseSuspenseQueries<
      infer TQueryFnData,
      infer TError,
      infer TData,
      any
    >
      ? UseSuspenseQueryResult<
          unknown extends TData ? TQueryFnData : TData,
          TError
        >
      : never;
  },
];

export type GetOptions<TQueryOptions> =
  TQueryOptions extends UseQueryOptionsForUseQueries<any, any, any, any>
    ? TQueryOptions
    : never;

export type QueriesOptions<
  TQueriesOptions extends any[],
  TResult extends any[] = [],
> = TQueriesOptions extends []
  ? []
  : TQueriesOptions extends [infer Head]
    ? [...TResult, GetOptions<Head>]
    : TQueriesOptions extends [infer Head, ...infer Tail]
      ? QueriesOptions<Tail, [...TResult, GetOptions<Head>]>
      : unknown[] extends TQueriesOptions
        ? TQueriesOptions
        : TQueriesOptions extends UseQueryOptionsForUseQueries<
              infer TQueryFnData,
              infer TError,
              infer TData,
              infer TQueryKey
            >[]
          ? UseQueryOptionsForUseQueries<
              TQueryFnData,
              TError,
              TData,
              TQueryKey
            >[]
          : UseQueryOptionsForUseQueries[];

export type GetSuspenseOptions<TQueryOptions> =
  TQueryOptions extends UseQueryOptionsForUseSuspenseQueries<any, any, any, any>
    ? TQueryOptions
    : never;

export type SuspenseQueriesOptions<
  TQueriesOptions extends any[],
  TResult extends any[] = [],
> = TQueriesOptions extends []
  ? []
  : TQueriesOptions extends [infer Head]
    ? [...TResult, GetSuspenseOptions<Head>]
    : TQueriesOptions extends [infer Head, ...infer Tail]
      ? SuspenseQueriesOptions<Tail, [...TResult, GetSuspenseOptions<Head>]>
      : unknown[] extends TQueriesOptions
        ? TQueriesOptions
        : TQueriesOptions extends UseQueryOptionsForUseSuspenseQueries<
              infer TQueryFnData,
              infer TError,
              infer TData,
              infer TQueryKey
            >[]
          ? UseQueryOptionsForUseSuspenseQueries<
              TQueryFnData,
              TError,
              TData,
              TQueryKey
            >[]
          : UseQueryOptionsForUseSuspenseQueries[];

export type TRPCUseQueries<TRouter extends AnyRouter> = <
  TQueryOptions extends UseQueryOptionsForUseQueries<any, any, any, any>[],
  TCombinedResult = QueriesResults<TQueryOptions>,
>(
  queriesCallback: (
    t: UseQueriesProcedureRecord<
      TRouter['_def']['_config']['$types'],
      TRouter['_def']['record']
    >,
  ) => readonly [...QueriesOptions<TQueryOptions>],
  options?: {
    combine?: (results: QueriesResults<TQueryOptions>) => TCombinedResult;
  },
) => TCombinedResult;

export type TRPCUseSuspenseQueries<TRouter extends AnyRouter> = <
  TQueryOptions extends UseQueryOptionsForUseSuspenseQueries<
    any,
    any,
    any,
    any
  >[],
>(
  queriesCallback: (
    t: UseSuspenseQueriesProcedureRecord<
      TRouter['_def']['_config']['$types'],
      TRouter['_def']['record']
    >,
  ) => readonly [...SuspenseQueriesOptions<TQueryOptions>],
) => SuspenseQueriesResults<TQueryOptions>;
