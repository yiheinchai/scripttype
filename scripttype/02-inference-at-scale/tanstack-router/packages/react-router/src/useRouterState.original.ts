/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-router/src/useRouterState.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StructuralSharingOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateSelected<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UseRouterStateOptions<
  TRouter extends AnyRouter,
  TSelected,
  TStructuralSharing,
> = {
  router?: TRouter
  select?: (
    state: RouterState<TRouter['routeTree']>,
  ) => ValidateSelected<TRouter, TSelected, TStructuralSharing>
} & StructuralSharingOption<TRouter, TSelected, TStructuralSharing>

export type UseRouterStateResult<
  TRouter extends AnyRouter,
  TSelected,
> = unknown extends TSelected ? RouterState<TRouter['routeTree']> : TSelected
