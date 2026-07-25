/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-router/src/useLoaderData.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveUseLoaderData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictOrFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StructuralSharingOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseLoaderDataResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateSelected<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface UseLoaderDataBaseOptions<
  TRouter extends AnyRouter,
  TFrom,
  TStrict extends boolean,
  TSelected,
  TStructuralSharing,
> {
  select?: (
    match: ResolveUseLoaderData<TRouter, TFrom, TStrict>,
  ) => ValidateSelected<TRouter, TSelected, TStructuralSharing>
}

export type UseLoaderDataOptions<
  TRouter extends AnyRouter,
  TFrom extends string | undefined,
  TStrict extends boolean,
  TSelected,
  TStructuralSharing,
> = StrictOrFrom<TRouter, TFrom, TStrict> &
  UseLoaderDataBaseOptions<
    TRouter,
    TFrom,
    TStrict,
    TSelected,
    TStructuralSharing
  > &
  StructuralSharingOption<TRouter, TSelected, TStructuralSharing>

export type UseLoaderDataRoute<out TId> = <
  TRouter extends AnyRouter = RegisteredRouter,
  TSelected = unknown,
  TStructuralSharing extends boolean = boolean,
>(
  opts?: UseLoaderDataBaseOptions<
    TRouter,
    TId,
    true,
    TSelected,
    TStructuralSharing
  > &
    StructuralSharingOption<TRouter, TSelected, TStructuralSharing>,
) => UseLoaderDataResult<TRouter, TId, true, TSelected>
