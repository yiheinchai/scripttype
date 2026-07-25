/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/solid-router/src/useLoaderDeps.tsx, for comparison with the ScriptType alongside.
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
type ResolveUseLoaderDeps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictOrFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseLoaderDepsResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface UseLoaderDepsBaseOptions<
  TRouter extends AnyRouter,
  TFrom,
  TSelected,
> {
  select?: (deps: ResolveUseLoaderDeps<TRouter, TFrom>) => TSelected
}

export type UseLoaderDepsOptions<
  TRouter extends AnyRouter,
  TFrom extends string | undefined,
  TSelected,
> = StrictOrFrom<TRouter, TFrom> &
  UseLoaderDepsBaseOptions<TRouter, TFrom, TSelected>

export type UseLoaderDepsRoute<out TId> = <
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
>(
  opts?: UseLoaderDepsBaseOptions<TRouter, TId, TSelected>,
) => Accessor<UseLoaderDepsResult<TRouter, TId, TSelected>>
