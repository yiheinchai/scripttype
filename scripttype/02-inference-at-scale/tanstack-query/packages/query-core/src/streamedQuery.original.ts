/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/streamedQuery.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AsyncIterable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryFunctionContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BaseStreamedQueryParams<TQueryFnData, TQueryKey extends QueryKey> = {
  streamFn: (
    context: QueryFunctionContext<TQueryKey>,
  ) => AsyncIterable<TQueryFnData> | Promise<AsyncIterable<TQueryFnData>>
  refetchMode?: 'append' | 'reset' | 'replace'
}

export type SimpleStreamedQueryParams<
  TQueryFnData,
  TQueryKey extends QueryKey,
> = BaseStreamedQueryParams<TQueryFnData, TQueryKey> & {
  reducer?: never
  initialValue?: never
}

export type ReducibleStreamedQueryParams<
  TQueryFnData,
  TData,
  TQueryKey extends QueryKey,
> = BaseStreamedQueryParams<TQueryFnData, TQueryKey> & {
  reducer: (acc: TData, chunk: TQueryFnData) => TData
  initialValue: TData
}

export type StreamedQueryParams<TQueryFnData, TData, TQueryKey extends QueryKey> =
  | SimpleStreamedQueryParams<TQueryFnData, TQueryKey>
  | ReducibleStreamedQueryParams<TQueryFnData, TData, TQueryKey>
