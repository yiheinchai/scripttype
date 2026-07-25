/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/solid-router/src/route.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface RouteTypes<TProps> extends DefaultRouteTypes<TProps> {}

export type AsyncRouteComponent<TProps> = RouteTypes<TProps>['component'] & {
  preload?: () => Promise<void>
}
