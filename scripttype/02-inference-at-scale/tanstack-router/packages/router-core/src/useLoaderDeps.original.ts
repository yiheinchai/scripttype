/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/useLoaderDeps.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Expand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteById<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ResolveUseLoaderDeps<TRouter extends AnyRouter, TFrom> = Expand<
  RouteById<TRouter['routeTree'], TFrom>['types']['loaderDeps']
>

export type UseLoaderDepsResult<
  TRouter extends AnyRouter,
  TFrom,
  TSelected,
> = unknown extends TSelected ? ResolveUseLoaderDeps<TRouter, TFrom> : TSelected
