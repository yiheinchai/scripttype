/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-query/packages/query-core/src/infiniteQueryObserver.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type InfiniteQueryObserverResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InfiniteQueryObserverListener<TData, TError> = (
  result: InfiniteQueryObserverResult<TData, TError>,
) => void

export type ReplaceReturnType<
  TFunction extends (...args: Array<any>) => unknown,
  TReturn,
> = (...args: Parameters<TFunction>) => TReturn
