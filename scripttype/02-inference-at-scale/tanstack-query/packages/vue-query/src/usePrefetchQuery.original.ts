/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/vue-query/src/usePrefetchQuery.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FetchQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OmitKeyof<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SkipToken<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UsePrefetchQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey,
> = OmitKeyof<
  FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryFn'
> & {
  queryFn?: Exclude<
    FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>['queryFn'],
    SkipToken
  >
}
