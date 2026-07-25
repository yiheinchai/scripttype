/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/vue-router/src/useSearch.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveUseSearch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictOrFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSearchResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Vue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface UseSearchBaseOptions<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean,
  TThrow extends boolean,
  TSelected,
> {
  select?: (state: ResolveUseSearch<TRouter, TFrom, TStrict>) => TSelected
  shouldThrow?: TThrow
}

export type UseSearchOptions<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean,
  TThrow extends boolean,
  TSelected,
> = StrictOrFrom<TRouter, TFrom, TStrict> &
  UseSearchBaseOptions<TRouter, TFrom, TStrict, TThrow, TSelected>

export type UseSearchRoute<out TFrom> = <
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: UseSearchBaseOptions<
    TRouter,
    TFrom,
    /* TStrict */ true,
    /* TThrow */ true,
    TSelected
  >,
) => Vue.Ref<UseSearchResult<TRouter, TFrom, true, TSelected>>
