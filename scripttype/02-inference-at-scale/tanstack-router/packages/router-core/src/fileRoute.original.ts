/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/fileRoute.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyPathParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyValidator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Register<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Route<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteConstraints<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdatableRouteOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface FileRouteTypes {
  fileRoutesByFullPath: any
  fullPaths: any
  to: any
  fileRoutesByTo: any
  id: any
  fileRoutesById: any
}

export type InferFileRouteTypes<TRouteTree extends AnyRoute> =
  unknown extends TRouteTree['types']['fileRouteTypes']
    ? never
    : TRouteTree['types']['fileRouteTypes'] extends FileRouteTypes
      ? TRouteTree['types']['fileRouteTypes']
      : never

export interface FileRouteOptions<
  TRegister,
  TFilePath extends string,
  TParentRoute extends AnyRoute,
  TId extends RouteConstraints['TId'],
  TPath extends RouteConstraints['TPath'],
  TFullPath extends RouteConstraints['TFullPath'],
  TSearchValidator = undefined,
  TParams = ResolveParams<TPath>,
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TSSR = unknown,
  TServerMiddlewares = unknown,
  THandlers = undefined,
>
  extends
    FileBaseRouteOptions<
      TRegister,
      TParentRoute,
      TId,
      TPath,
      TSearchValidator,
      TParams,
      TLoaderDeps,
      TLoaderFn,
      AnyContext,
      TRouteContextFn,
      TBeforeLoadFn,
      AnyContext,
      TSSR,
      TServerMiddlewares,
      THandlers
    >,
    UpdatableRouteOptions<
      TParentRoute,
      TId,
      TFullPath,
      TParams,
      TSearchValidator,
      TLoaderFn,
      TLoaderDeps,
      AnyContext,
      TRouteContextFn,
      TBeforeLoadFn
    > {}

export type CreateFileRoute<
  TFilePath extends string,
  TParentRoute extends AnyRoute,
  TId extends RouteConstraints['TId'],
  TPath extends RouteConstraints['TPath'],
  TFullPath extends RouteConstraints['TFullPath'],
> = <
  TRegister = Register,
  TSearchValidator = undefined,
  TParams = ResolveParams<TPath>,
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TSSR = unknown,
  TServerMiddlewares = unknown,
  THandlers = undefined,
>(
  options?: FileRouteOptions<
    TRegister,
    TFilePath,
    TParentRoute,
    TId,
    TPath,
    TFullPath,
    TSearchValidator,
    TParams,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TSSR,
    TServerMiddlewares,
    THandlers
  >,
) => Route<
  TRegister,
  TParentRoute,
  TPath,
  TFullPath,
  TFilePath,
  TId,
  TSearchValidator,
  TParams,
  AnyContext,
  TRouteContextFn,
  TBeforeLoadFn,
  TLoaderDeps,
  TLoaderFn,
  unknown,
  unknown,
  TSSR,
  TServerMiddlewares,
  THandlers
>

export type LazyRouteOptions = Pick<
  UpdatableRouteOptions<
    AnyRoute,
    string,
    string,
    AnyPathParams,
    AnyValidator,
    {},
    AnyContext,
    AnyContext,
    AnyContext,
    AnyContext
  >,
  'component' | 'errorComponent' | 'pendingComponent' | 'notFoundComponent'
>

export interface LazyRoute<in out TRoute extends AnyRoute> {
  options: {
    id: string
  } & LazyRouteOptions
}

export type CreateLazyFileRoute<TRoute extends AnyRoute> = (
  opts: LazyRouteOptions,
) => LazyRoute<TRoute>
