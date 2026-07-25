/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/solid-router/src/useParams.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Accessor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveUseParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictOrFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseParamsResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface UseParamsBaseOptions<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean,
  TThrow extends boolean,
  TSelected,
> {
  select?: (params: ResolveUseParams<TRouter, TFrom, TStrict>) => TSelected
  shouldThrow?: TThrow
}

export type UseParamsOptions<
  TRouter extends AnyRouter,
  TFrom extends string | undefined,
  TStrict extends boolean,
  TThrow extends boolean,
  TSelected,
> = StrictOrFrom<TRouter, TFrom, TStrict> &
  UseParamsBaseOptions<TRouter, TFrom, TStrict, TThrow, TSelected>

export type UseParamsRoute<out TFrom> = <
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: UseParamsBaseOptions<
    TRouter,
    TFrom,
    /* TStrict */ true,
    /* TThrow */ true,
    TSelected
  >,
) => Accessor<UseParamsResult<TRouter, TFrom, true, TSelected>>
