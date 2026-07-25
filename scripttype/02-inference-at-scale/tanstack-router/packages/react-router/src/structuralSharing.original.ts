/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-router/src/structuralSharing.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constrain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalStructuralSharing<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateJSON<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DefaultStructuralSharingEnabled<TRouter extends AnyRouter> =
  boolean extends TRouter['options']['defaultStructuralSharing']
    ? // for now, default to false.
      // TODO in V2: default to true
      false
    : NonNullable<TRouter['options']['defaultStructuralSharing']>

export interface RequiredStructuralSharing<TStructuralSharing, TConstraint> {
  readonly structuralSharing: Constrain<TStructuralSharing, TConstraint>
}

export type StructuralSharingOption<
  TRouter extends AnyRouter,
  TSelected,
  TStructuralSharing,
> = unknown extends TSelected
  ? OptionalStructuralSharing<TStructuralSharing, boolean>
  : unknown extends TRouter['routeTree']
    ? OptionalStructuralSharing<TStructuralSharing, boolean>
    : TSelected extends ValidateJSON<TSelected>
      ? OptionalStructuralSharing<TStructuralSharing, boolean>
      : DefaultStructuralSharingEnabled<TRouter> extends true
        ? RequiredStructuralSharing<TStructuralSharing, false>
        : OptionalStructuralSharing<TStructuralSharing, false>

export type StructuralSharingEnabled<
  TRouter extends AnyRouter,
  TStructuralSharing,
> = boolean extends TStructuralSharing
  ? DefaultStructuralSharingEnabled<TRouter>
  : TStructuralSharing

export type ValidateSelected<
  TRouter extends AnyRouter,
  TSelected,
  TStructuralSharing,
> =
  StructuralSharingEnabled<TRouter, TStructuralSharing> extends true
    ? ValidateJSON<TSelected>
    : TSelected
