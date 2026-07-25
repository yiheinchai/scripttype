/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-client-core/src/serverRoute.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRequestMiddleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRoute<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Assign<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AssignAllServerRequestContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Constrain<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Expand<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Request<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ResolveAllParamsFromParent<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Response<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToIntersection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RouteMethod =
  | 'ANY'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'

export type ResolveAllServerContext<
  TRegister,
  TParentRoute extends AnyRoute,
  TServerMiddlewares,
> = unknown extends TParentRoute
  ? AssignAllServerRequestContext<TRegister, TServerMiddlewares, {}>
  : Assign<
      TParentRoute['types']['allServerContext'],
      AssignAllServerRequestContext<TRegister, TServerMiddlewares, {}>
    >

export type MergeMethodMiddlewares<TServerMiddlewares, TMethodMiddlewares> =
  TServerMiddlewares extends ReadonlyArray<any>
    ? TMethodMiddlewares extends ReadonlyArray<any>
      ? readonly [...TServerMiddlewares, ...TMethodMiddlewares]
      : TServerMiddlewares
    : TMethodMiddlewares

export type AssignAllMethodContext<
  TRegister,
  TParentRoute extends AnyRoute,
  TServerMiddlewares,
  TMethodMiddlewares,
> = ResolveAllServerContext<
  TRegister,
  TParentRoute,
  MergeMethodMiddlewares<TServerMiddlewares, TMethodMiddlewares>
>

export type RouteMethodNextResult<TContext> = {
  isNext: true
  context: TContext
}

export interface RouteMethodHandlerCtx<
  in out TRegister,
  in out TParentRoute extends AnyRoute,
  in out TFullPath extends string,
  in out TParams,
  in out TServerMiddlewares,
  in out TMethodMiddlewares,
> {
  context: Expand<
    AssignAllMethodContext<
      TRegister,
      TParentRoute,
      TServerMiddlewares,
      TMethodMiddlewares
    >
  >
  request: Request
  params: Expand<ResolveAllParamsFromParent<TParentRoute, TParams>>
  pathname: TFullPath
  next: <TContext = undefined>(options?: {
    context?: TContext
  }) => RouteMethodNextResult<TContext>
}

export type RouteMethodResult<TContext> =
  | Response
  | undefined
  | RouteMethodNextResult<TContext>

export type RouteMethodHandlerFn<
  TRegister,
  TParentRoute extends AnyRoute,
  TFullPath extends string,
  TParams,
  TServerMiddlewares,
  TMethodMiddlewares,
  TServerContext,
> = (
  ctx: RouteMethodHandlerCtx<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodMiddlewares
  >,
) =>
  | RouteMethodResult<TServerContext>
  | Promise<RouteMethodResult<TServerContext>>

export interface RouteMethodBuilderOptions<
  TRegister,
  TParentRoute extends AnyRoute,
  TFullPath extends string,
  TParams,
  TServerMiddlewares,
  TMethodMiddlewares,
  TResponse,
> {
  handler?: RouteMethodHandlerFn<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodMiddlewares,
    TResponse
  >
  middleware?: Constrain<
    TMethodMiddlewares,
    ReadonlyArray<AnyRequestMiddleware>
  >
}

export type RouteMethodHandler<
  TRegister,
  TParentRoute extends AnyRoute,
  TFullPath extends string,
  TParams,
  TServerMiddlewares,
  TMethodMiddlewares,
  TServerContext,
> =
  | RouteMethodHandlerFn<
      TRegister,
      TParentRoute,
      TFullPath,
      TParams,
      TServerMiddlewares,
      TMethodMiddlewares,
      TServerContext
    >
  | RouteMethodBuilderOptions<
      TRegister,
      TParentRoute,
      TFullPath,
      TParams,
      TServerMiddlewares,
      TMethodMiddlewares,
      TServerContext
    >

export type CustomHandlerFunctionsRecord<
  TRegister,
  TParentRoute extends AnyRoute,
  TFullPath extends string,
  TParams,
  TServerMiddlewares,
  TMethodMiddlewares,
  TServerContext,
> = {
  [createHandlersSymbol]: true
} & Partial<
  Record<
    RouteMethod,
    RouteMethodHandler<
      TRegister,
      TParentRoute,
      TFullPath,
      TParams,
      TServerMiddlewares,
      TMethodMiddlewares,
      TServerContext
    >
  >
>

export type ExtractHandlersContext<THandlers> = THandlers extends (
  ...args: any
) => CustomHandlerFunctionsRecord<
  any,
  any,
  any,
  any,
  any,
  any,
  infer TServerContext
>
  ? UnionToIntersection<TServerContext>
  : THandlers extends Record<
        string,
        RouteMethodHandler<any, any, any, any, any, any, infer TServerContext>
      >
    ? UnionToIntersection<TServerContext>
    : undefined

export interface CreateMethodFnOpts<
  TRegister,
  TParentRoute extends AnyRoute,
  TFullPath extends string,
  TParams,
  TServerMiddlewares,
  TMethodAllMiddlewares,
  TMethodGetMiddlewares,
  TMethodPostMiddlewares,
  TMethodPutMiddlewares,
  TMethodPatchMiddlewares,
  TMethodDeleteMiddlewares,
  TMethodOptionsMiddlewares,
  TMethodHeadMiddlewares,
  TServerContext,
> {
  ANY?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodAllMiddlewares,
    TServerContext
  >
  GET?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodGetMiddlewares,
    TServerContext
  >
  POST?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodPostMiddlewares,
    TServerContext
  >
  PUT?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodPutMiddlewares,
    TServerContext
  >
  PATCH?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodPatchMiddlewares,
    TServerContext
  >
  DELETE?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodDeleteMiddlewares,
    TServerContext
  >
  OPTIONS?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodOptionsMiddlewares,
    TServerContext
  >
  HEAD?: RouteMethodHandler<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodHeadMiddlewares,
    TServerContext
  >
}

export type CreateHandlersFn<
  TRegister,
  TParentRoute extends AnyRoute,
  TFullPath extends string,
  TParams,
  TServerMiddlewares,
> = <
  const TMethodAllMiddlewares,
  const TMethodGetMiddlewares,
  const TMethodPostMiddlewares,
  const TMethodPutMiddlewares,
  const TMethodPatchMiddlewares,
  const TMethodDeleteMiddlewares,
  const TMethodOptionsMiddlewares,
  const TMethodHeadMiddlewares,
  TServerContext,
>(
  opts: CreateMethodFnOpts<
    TRegister,
    TParentRoute,
    TFullPath,
    TParams,
    TServerMiddlewares,
    TMethodAllMiddlewares,
    TMethodGetMiddlewares,
    TMethodPostMiddlewares,
    TMethodPutMiddlewares,
    TMethodPatchMiddlewares,
    TMethodDeleteMiddlewares,
    TMethodOptionsMiddlewares,
    TMethodHeadMiddlewares,
    TServerContext
  >,
) => CustomHandlerFunctionsRecord<
  TRegister,
  TParentRoute,
  TFullPath,
  TParams,
  TServerMiddlewares,
  any,
  TServerContext
>
