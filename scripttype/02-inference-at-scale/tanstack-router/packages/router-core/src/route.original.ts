/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/route.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortController<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouteMatch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnySchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyStandardSchemaValidator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyValidator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyValidatorAdapter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyValidatorObj<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Assign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Awaitable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constrain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultValidator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Expand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntersectAssign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LazyRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseAsyncReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakePreValidationErrorHandlingRouteMatchUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeRouteMatchFromRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NavigateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NoInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParsePathParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParseRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParsedLocation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RedirectFnRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveSearchValidatorInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveValidatorOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RootRouteId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteById<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteMatch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RoutePaths<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SSROption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardSchemaValidator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateSerializableLifecycleResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidatorAdapter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidatorFn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidatorObj<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RoutePathOptions<TCustomId, TPath> =
  | {
      path: TPath
    }
  | {
      id: TCustomId
    }

export type RoutePathOptionsIntersection<TCustomId, TPath> = {
  path: TPath
  id: TCustomId
}

export type SearchFilter<TInput, TResult = TInput> = (prev: TInput) => TResult

export type SearchMiddlewareMeta = {
  removed?: Map<string, unknown>
  removedAny?: Set<string>
  defaulted?: Map<string, unknown>
  explicit?: unknown
}

export type SearchMiddlewareContext<TSearchSchema> = {
  search: TSearchSchema
  next: (newSearch: TSearchSchema) => TSearchSchema
  meta?: SearchMiddlewareMeta
}

export type SearchMiddleware<TSearchSchema> = (
  ctx: SearchMiddlewareContext<TSearchSchema>,
) => TSearchSchema

export type TrimPathRight<T extends string> = T extends '/'
  ? '/'
  : T extends `${infer U}/`
    ? TrimPathRight<U>
    : T

export type TrimPathLeft<T extends string> =
  T extends `${RootRouteId}/${infer U}`
    ? TrimPathLeft<U>
    : T extends `/${infer U}`
      ? TrimPathLeft<U>
      : T

export type TrimPath<T extends string> = '' extends T
  ? ''
  : TrimPathRight<TrimPathLeft<T>>

export type RoutePrefix<
  TPrefix extends string,
  TPath extends string,
> = string extends TPath
  ? RootRouteId
  : TPath extends string
    ? TPrefix extends RootRouteId
      ? TPath extends '/'
        ? '/'
        : `/${TrimPath<TPath>}`
      : `${TPrefix}/${TPath}` extends '/'
        ? '/'
        : `/${TrimPathLeft<`${TrimPathRight<TPrefix>}/${TrimPath<TPath>}`>}`
    : never

export type ResolveId<
  TParentRoute,
  TCustomId extends string,
  TPath extends string,
> = TParentRoute extends { id: infer TParentId extends string }
  ? RoutePrefix<TParentId, string extends TCustomId ? TPath : TCustomId>
  : RootRouteId

export type InferFullSearchSchema<TRoute> = TRoute extends {
  types: {
    fullSearchSchema: infer TFullSearchSchema
  }
}
  ? TFullSearchSchema
  : {}

export type InferFullSearchSchemaInput<TRoute> = TRoute extends {
  types: {
    fullSearchSchemaInput: infer TFullSearchSchemaInput
  }
}
  ? TFullSearchSchemaInput
  : {}

export type InferAllParams<TRoute> = TRoute extends {
  types: {
    allParams: infer TAllParams
  }
}
  ? TAllParams
  : {}

export type InferAllContext<TRoute> = unknown extends TRoute
  ? TRoute
  : TRoute extends {
        types: {
          allContext: infer TAllContext
        }
      }
    ? TAllContext
    : {}

export type SearchSchemaInput = {
  __TSearchSchemaInput__: 'TSearchSchemaInput'
}

export type ResolveSearchSchemaFn<TSearchValidator> = TSearchValidator extends (
  ...args: any
) => infer TSearchSchema
  ? TSearchSchema
  : AnySchema

export type ResolveSearchSchemaFnInput<TSearchValidator> =
  TSearchValidator extends (input: infer TSearchSchemaInput) => any
    ? TSearchSchemaInput extends SearchSchemaInput
      ? Omit<TSearchSchemaInput, keyof SearchSchemaInput>
      : ResolveSearchSchemaFn<TSearchValidator>
    : AnySchema

export type ResolveSearchSchemaInput<TSearchValidator> =
  TSearchValidator extends AnyStandardSchemaValidator
    ? NonNullable<TSearchValidator['~standard']['types']>['input']
    : TSearchValidator extends AnyValidatorAdapter
      ? TSearchValidator['types']['input']
      : TSearchValidator extends AnyValidatorObj
        ? ResolveSearchSchemaFnInput<TSearchValidator['parse']>
        : ResolveSearchSchemaFnInput<TSearchValidator>

export type ResolveSearchSchema<TSearchValidator> =
  unknown extends TSearchValidator
    ? TSearchValidator
    : TSearchValidator extends AnyStandardSchemaValidator
      ? NonNullable<TSearchValidator['~standard']['types']>['output']
      : TSearchValidator extends AnyValidatorAdapter
        ? TSearchValidator['types']['output']
        : TSearchValidator extends AnyValidatorObj
          ? ResolveSearchSchemaFn<TSearchValidator['parse']>
          : ResolveSearchSchemaFn<TSearchValidator>

export type ResolveRequiredParams<TPath extends string, T> = {
  [K in ParsePathParams<TPath>['required']]: T
}

export type ResolveOptionalParams<TPath extends string, T> = {
  [K in ParsePathParams<TPath>['optional']]?: T | undefined
}

export type ResolveParams<
  TPath extends string,
  T = string,
> = ResolveRequiredParams<TPath, T> & ResolveOptionalParams<TPath, T>

export type ParseParamsFn<in out TPath extends string, in out TParams> = (
  rawParams: Expand<ResolveParams<TPath>>,
) => TParams | false

export type ValidateParsedParams<TPath extends string, TParams> = [TParams] extends [
  ResolveParams<TPath, any>,
]
  ? unknown
  : never

export type StringifyParamsFn<in out TPath extends string, in out TParams> = (
  params: TParams,
) => ResolveParams<TPath>

export type ParamsOptions<in out TPath extends string, in out TParams> = {
  params?: {
    parse?: ParseParamsFn<TPath, TParams> & ValidateParsedParams<TPath, TParams>
    /**
     * When multiple route candidates use `params.parse` during matching,
     * higher priorities are tried first.
     *
     * @default 0
     */
    priority?: number
    stringify?: StringifyParamsFn<TPath, TParams>
  }

  /** 
  @deprecated Use params.parse instead
  */
  parseParams?: ParseParamsFn<TPath, TParams> &
    ValidateParsedParams<TPath, TParams>

  /** 
  @deprecated Use params.stringify instead
  */
  stringifyParams?: StringifyParamsFn<TPath, TParams>
}

export type SearchValidator<TInput, TOutput> =
  | ValidatorObj<TInput, TOutput>
  | ValidatorFn<TInput, TOutput>
  | ValidatorAdapter<TInput, TOutput>
  | StandardSchemaValidator<TInput, TOutput>
  | undefined

export type AnyContext = {}

export type ContextReturnType<TContextFn> = unknown extends TContextFn
  ? TContextFn
  : LooseReturnType<TContextFn> extends never
    ? AnyContext
    : LooseReturnType<TContextFn>

export type ContextAsyncReturnType<TContextFn> = unknown extends TContextFn
  ? TContextFn
  : LooseAsyncReturnType<TContextFn> extends never
    ? AnyContext
    : LooseAsyncReturnType<TContextFn>

export type ResolveRouteContext<TRouteContextFn, TBeforeLoadFn> = Assign<
  ContextReturnType<TRouteContextFn>,
  ContextAsyncReturnType<TBeforeLoadFn>
>

export type ResolveRouteLoaderFn<TLoaderFn> = TLoaderFn extends {
  handler: infer THandler
}
  ? THandler
  : TLoaderFn

export type ResolveFullSearchSchema<
  TParentRoute extends AnyRoute,
  TSearchValidator,
> = unknown extends TParentRoute
  ? ResolveValidatorOutput<TSearchValidator>
  : IntersectAssign<
      InferFullSearchSchema<TParentRoute>,
      ResolveValidatorOutput<TSearchValidator>
    >

export type ResolveFullSearchSchemaInput<
  TParentRoute extends AnyRoute,
  TSearchValidator,
> = IntersectAssign<
  InferFullSearchSchemaInput<TParentRoute>,
  ResolveSearchValidatorInput<TSearchValidator>
>

export type ResolveAllParamsFromParent<
  TParentRoute extends AnyRoute,
  TParams,
> = Assign<InferAllParams<TParentRoute>, TParams>

export type RouteContextParameter<
  TParentRoute extends AnyRoute,
  TRouterContext,
> = unknown extends TParentRoute
  ? TRouterContext
  : Assign<TRouterContext, InferAllContext<TParentRoute>>

export type BeforeLoadContextParameter<
  TParentRoute extends AnyRoute,
  TRouterContext,
  TRouteContextFn,
> = Assign<
  RouteContextParameter<TParentRoute, TRouterContext>,
  ContextReturnType<TRouteContextFn>
>

export type ResolveAllContext<
  TParentRoute extends AnyRoute,
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn,
> = Assign<
  BeforeLoadContextParameter<TParentRoute, TRouterContext, TRouteContextFn>,
  ContextAsyncReturnType<TBeforeLoadFn>
>

export type ResolveLoaderData<TLoaderFn> = unknown extends TLoaderFn
  ? TLoaderFn
  : LooseAsyncReturnType<ResolveRouteLoaderFn<TLoaderFn>> extends never
    ? undefined
    : LooseAsyncReturnType<ResolveRouteLoaderFn<TLoaderFn>>

export type ResolveSSR<TSSR> = TSSR extends (...args: ReadonlyArray<any>) => any
  ? LooseReturnType<TSSR>
  : TSSR

export type ResolveAllSSR<
  TParentRoute extends AnyRoute,
  TSSR,
> = unknown extends TParentRoute
  ? ResolveSSR<TSSR>
  : unknown extends TSSR
    ? TParentRoute['types']['allSsr']
    : ResolveSSR<TSSR>

export interface RouteTypes<
  in out TRegister,
  in out TParentRoute extends AnyRoute,
  in out TPath extends string,
  in out TFullPath extends string,
  in out TCustomId extends string,
  in out TId extends string,
  in out TSearchValidator,
  in out TParams,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TBeforeLoadFn,
  in out TLoaderDeps,
  in out TLoaderFn,
  in out TChildren,
  in out TFileRouteTypes,
  in out TSSR,
  in out TServerMiddlewares,
  in out THandlers,
> {
  parentRoute: TParentRoute
  path: TPath
  to: TrimPathRight<TFullPath>
  fullPath: TFullPath
  customId: TCustomId
  id: TId
  searchSchema: ResolveValidatorOutput<TSearchValidator>
  searchSchemaInput: ResolveSearchValidatorInput<TSearchValidator>
  searchValidator: TSearchValidator
  fullSearchSchema: ResolveFullSearchSchema<TParentRoute, TSearchValidator>
  fullSearchSchemaInput: ResolveFullSearchSchemaInput<
    TParentRoute,
    TSearchValidator
  >
  params: TParams
  allParams: ResolveAllParamsFromParent<TParentRoute, TParams>
  routerContext: TRouterContext
  routeContext: ResolveRouteContext<TRouteContextFn, TBeforeLoadFn>
  routeContextFn: TRouteContextFn
  beforeLoadFn: TBeforeLoadFn
  allContext: ResolveAllContext<
    TParentRoute,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn
  >
  children: TChildren
  loaderData: ResolveLoaderData<TLoaderFn>
  loaderDeps: TLoaderDeps
  fileRouteTypes: TFileRouteTypes
  ssr: ResolveSSR<TSSR>
  allSsr: ResolveAllSSR<TParentRoute, TSSR>
}

export type AnyPathParams = {}

export interface LoaderFnContext<
  in out TRegister = unknown,
  in out TParentRoute extends AnyRoute = AnyRoute,
  in out TId extends string = string,
  in out TParams = {},
  in out TLoaderDeps = {},
  in out TRouterContext = {},
  in out TRouteContextFn = AnyContext,
  in out TBeforeLoadFn = AnyContext,
  in out TServerMiddlewares = unknown,
  in out THandlers = undefined,
> {
  abortController: AbortController
  preload: boolean
  params: Expand<ResolveAllParamsFromParent<TParentRoute, TParams>>
  deps: TLoaderDeps
  context: Expand<
    ResolveAllContext<
      TParentRoute,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn
    >
  >
  location: ParsedLocation // Do not supply search schema here so as to demotivate people from trying to shortcut loaderDeps
  /**
   * @deprecated Use `throw redirect({ to: '/somewhere' })` instead
   **/
  navigate: (opts: NavigateOptions<AnyRouter>) => Promise<void> | void
  // root route does not have a parent match
  parentMatchPromise: TId extends RootRouteId
    ? never
    : Promise<MakeRouteMatchFromRoute<TParentRoute>>
  cause: 'preload' | 'enter' | 'stay'
  route: AnyRoute
}

export interface RouteContextOptions<
  in out TParentRoute extends AnyRoute,
  in out TParams,
  in out TRouterContext,
  in out TLoaderDeps,
  in out TRouteId,
> extends ContextOptions<TParentRoute, TParams, TRouteId> {
  deps: TLoaderDeps
  context: Expand<RouteContextParameter<TParentRoute, TRouterContext>>
}

export interface SsrContextOptions<
  in out TParentRoute extends AnyRoute,
  in out TSearchValidator,
  in out TParams,
> {
  params:
    | {
        status: 'success'
        value: Expand<ResolveAllParamsFromParent<TParentRoute, TParams>>
      }
    | { status: 'error'; error: unknown }
  search:
    | {
        status: 'success'
        value: Expand<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>
      }
    | { status: 'error'; error: unknown }
  location: ParsedLocation
  matches: Array<MakePreValidationErrorHandlingRouteMatchUnion>
}

export interface BeforeLoadContextOptions<
  in out TRegister,
  in out TParentRoute extends AnyRoute,
  in out TSearchValidator,
  in out TParams,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TRouteId,
  in out TServerMiddlewares,
  in out THandlers,
>
  extends
    ContextOptions<TParentRoute, TParams, TRouteId>,
    FullSearchSchemaOption<TParentRoute, TSearchValidator> {
  context: Expand<
    BeforeLoadContextParameter<TParentRoute, TRouterContext, TRouteContextFn>
  >
}

export interface FullSearchSchemaOption<
  in out TParentRoute extends AnyRoute,
  in out TSearchValidator,
> {
  search: Expand<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>
}

export interface RemountDepsOptions<
  in out TRouteId,
  in out TFullSearchSchema,
  in out TAllParams,
  in out TLoaderDeps,
> {
  routeId: TRouteId
  search: TFullSearchSchema
  params: TAllParams
  loaderDeps: TLoaderDeps
}

export type RouteLoaderFn<
  in out TRegister,
  in out TParentRoute extends AnyRoute = AnyRoute,
  in out TId extends string = string,
  in out TParams = {},
  in out TLoaderDeps = {},
  in out TRouterContext = {},
  in out TRouteContextFn = AnyContext,
  in out TBeforeLoadFn = AnyContext,
  in out TServerMiddlewares = unknown,
  in out THandlers = undefined,
> = (
  match: LoaderFnContext<
    TRegister,
    TParentRoute,
    TId,
    TParams,
    TLoaderDeps,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TServerMiddlewares,
    THandlers
  >,
) => any

export interface FilebaseRouteOptionsInterface<
  TRegister,
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TPath extends string = string,
  TSearchValidator = undefined,
  TParams = {},
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TRemountDepsFn = AnyContext,
  TSSR = unknown,
  TServerMiddlewares = unknown,
  THandlers = undefined,
> {
  validateSearch?: Constrain<TSearchValidator, AnyValidator, DefaultValidator>

  shouldReload?:
    | boolean
    | ((
        match: LoaderFnContext<
          TRegister,
          TParentRoute,
          TId,
          TParams,
          TLoaderDeps,
          TRouterContext,
          TRouteContextFn,
          TBeforeLoadFn,
          TServerMiddlewares,
          THandlers
        >,
      ) => any)

  context?: Constrain<
    TRouteContextFn,
    (
      ctx: RouteContextOptions<
        TParentRoute,
        TParams,
        TRouterContext,
        TLoaderDeps,
        TId
      >,
    ) => any
  >

  ssr?: Constrain<
    TSSR,
    | undefined
    | SSROption
    | ((
        ctx: SsrContextOptions<TParentRoute, TSearchValidator, TParams>,
      ) => Awaitable<undefined | SSROption>)
  >

  // This async function is called before a route is loaded.
  // If an error is thrown here, the route's loader will not be called.
  // If thrown during a navigation, the navigation will be cancelled and the error will be passed to the `onError` function.
  // If thrown during a preload event, the error will be logged to the console.
  beforeLoad?: Constrain<
    TBeforeLoadFn,
    (
      ctx: BeforeLoadContextOptions<
        TRegister,
        TParentRoute,
        TSearchValidator,
        TParams,
        TRouterContext,
        TRouteContextFn,
        TId,
        TServerMiddlewares,
        THandlers
      >,
    ) => ValidateSerializableLifecycleResult<
      TRegister,
      TParentRoute,
      TSSR,
      TBeforeLoadFn
    >
  >

  loaderDeps?: (
    opts: FullSearchSchemaOption<TParentRoute, TSearchValidator>,
  ) => TLoaderDeps

  remountDeps?: Constrain<
    TRemountDepsFn,
    (
      opt: RemountDepsOptions<
        TId,
        ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
        Expand<ResolveAllParamsFromParent<TParentRoute, TParams>>,
        TLoaderDeps
      >,
    ) => any
  >

  loader?: Constrain<
    TLoaderFn,
    | RouteLoaderFn<
        TRegister,
        TParentRoute,
        TId,
        TParams,
        TLoaderDeps,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn,
        TServerMiddlewares,
        THandlers
      >
    | RouteLoaderObject<
        TRegister,
        TParentRoute,
        TId,
        TParams,
        TLoaderDeps,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn,
        TServerMiddlewares,
        THandlers
      >
  >
}

export type FileBaseRouteOptions<
  TRegister,
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TPath extends string = string,
  TSearchValidator = undefined,
  TParams = {},
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TRemountDepsFn = AnyContext,
  TSSR = unknown,
  TServerMiddlewares = unknown,
  THandlers = undefined,
> = ParamsOptions<TPath, TParams> &
  FilebaseRouteOptionsInterface<
    TRegister,
    TParentRoute,
    TId,
    TPath,
    TSearchValidator,
    TParams,
    TLoaderDeps,
    TLoaderFn,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TRemountDepsFn,
    TSSR,
    TServerMiddlewares,
    THandlers
  >

export type BaseRouteOptions<
  TRegister,
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TCustomId extends string = string,
  TPath extends string = string,
  TSearchValidator = undefined,
  TParams = {},
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TSSR = unknown,
  TServerMiddlewares = unknown,
  THandlers = undefined,
> = RoutePathOptions<TCustomId, TPath> &
  FileBaseRouteOptions<
    TRegister,
    TParentRoute,
    TId,
    TPath,
    TSearchValidator,
    TParams,
    TLoaderDeps,
    TLoaderFn,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    AnyContext,
    TSSR,
    TServerMiddlewares,
    THandlers
  > & {
    getParentRoute: () => TParentRoute
  }

export type AssetFnContextOptions<
  in out TRouteId,
  in out TFullPath,
  in out TParentRoute extends AnyRoute,
  in out TParams,
  in out TSearchValidator,
  in out TLoaderFn,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TBeforeLoadFn,
  in out TLoaderDeps,
> = {
  ssr?: {
    nonce?: string
  }
  matches: Array<
    RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >
  >
  match: RouteMatch<
    TRouteId,
    TFullPath,
    ResolveAllParamsFromParent<TParentRoute, TParams>,
    ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
    ResolveLoaderData<TLoaderFn>,
    ResolveAllContext<
      TParentRoute,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn
    >,
    TLoaderDeps
  >
  params: ResolveAllParamsFromParent<TParentRoute, TParams>
  loaderData?: ResolveLoaderData<TLoaderFn>
}

export interface UpdatableRouteOptions<
  in out TParentRoute extends AnyRoute,
  in out TRouteId,
  in out TFullPath,
  in out TParams,
  in out TSearchValidator,
  in out TLoaderFn,
  in out TLoaderDeps,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TBeforeLoadFn,
>
  extends UpdatableStaticRouteOption, UpdatableRouteOptionsExtensions {
  /**
   * If true, this route will be matched as case-sensitive
   *
   * @default false
   */
  caseSensitive?: boolean
  /**
   * If true, this route will be forcefully wrapped in a suspense boundary
   */
  wrapInSuspense?: boolean
  // The content to be rendered when the route is matched. If no component is provided, defaults to `<Outlet />`

  pendingMs?: number
  pendingMinMs?: number
  staleTime?: number
  gcTime?: number
  preload?: boolean
  preloadStaleTime?: number
  preloadGcTime?: number
  search?: {
    middlewares?: Array<
      SearchMiddleware<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>
    >
  }
  /** 
  @deprecated Use search.middlewares instead
  */
  preSearchFilters?: Array<
    SearchFilter<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>
  >
  /** 
  @deprecated Use search.middlewares instead
  */
  postSearchFilters?: Array<
    SearchFilter<ResolveFullSearchSchema<TParentRoute, TSearchValidator>>
  >
  onCatch?: (error: Error) => void
  onError?: (err: any) => void
  // These functions are called as route matches are loaded, stick around and leave the active
  // matches
  onEnter?: (
    match: RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >,
  ) => void
  onStay?: (
    match: RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >,
  ) => void
  onLeave?: (
    match: RouteMatch<
      TRouteId,
      TFullPath,
      ResolveAllParamsFromParent<TParentRoute, TParams>,
      ResolveFullSearchSchema<TParentRoute, TSearchValidator>,
      ResolveLoaderData<TLoaderFn>,
      ResolveAllContext<
        TParentRoute,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn
      >,
      TLoaderDeps
    >,
  ) => void
  headers?: (
    ctx: AssetFnContextOptions<
      TRouteId,
      TFullPath,
      TParentRoute,
      TParams,
      TSearchValidator,
      TLoaderFn,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TLoaderDeps
    >,
  ) => Awaitable<Record<string, string> | undefined>
  head?: (
    ctx: AssetFnContextOptions<
      TRouteId,
      TFullPath,
      TParentRoute,
      TParams,
      TSearchValidator,
      TLoaderFn,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TLoaderDeps
    >,
  ) => Awaitable<{
    links?: AnyRouteMatch['links']
    scripts?: AnyRouteMatch['headScripts']
    meta?: AnyRouteMatch['meta']
    styles?: AnyRouteMatch['styles']
  }>
  scripts?: (
    ctx: AssetFnContextOptions<
      TRouteId,
      TFullPath,
      TParentRoute,
      TParams,
      TSearchValidator,
      TLoaderFn,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TLoaderDeps
    >,
  ) => Awaitable<AnyRouteMatch['scripts']>
  codeSplitGroupings?: Array<
    Array<
      | 'loader'
      | 'component'
      | 'pendingComponent'
      | 'notFoundComponent'
      | 'errorComponent'
    >
  >
}

export type RouteOptions<
  TRegister,
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TCustomId extends string = string,
  TFullPath extends string = string,
  TPath extends string = string,
  TSearchValidator = undefined,
  TParams = AnyPathParams,
  TLoaderDeps extends Record<string, any> = {},
  TLoaderFn = undefined,
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TSSR = unknown,
  TServerMiddlewares = unknown,
  THandlers = undefined,
> = BaseRouteOptions<
  TRegister,
  TParentRoute,
  TId,
  TCustomId,
  TPath,
  TSearchValidator,
  TParams,
  TLoaderDeps,
  TLoaderFn,
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn,
  TSSR,
  TServerMiddlewares,
  THandlers
> &
  UpdatableRouteOptions<
    NoInfer<TParentRoute>,
    NoInfer<TCustomId>,
    NoInfer<TFullPath>,
    NoInfer<TParams>,
    NoInfer<TSearchValidator>,
    NoInfer<TLoaderFn>,
    NoInfer<TLoaderDeps>,
    NoInfer<TRouterContext>,
    NoInfer<TRouteContextFn>,
    NoInfer<TBeforeLoadFn>
  >

export type RouteLazyFn<TRoute extends AnyRoute> = (
  lazyFn: () => Promise<LazyRoute<TRoute>>,
) => TRoute

export type RouteAddChildrenFn<
  in out TRegister,
  in out TParentRoute extends AnyRoute,
  in out TPath extends string,
  in out TFullPath extends string,
  in out TCustomId extends string,
  in out TId extends string,
  in out TSearchValidator,
  in out TParams,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TBeforeLoadFn,
  in out TLoaderDeps extends Record<string, any>,
  in out TLoaderFn,
  in out TFileRouteTypes,
  in out TSSR,
  in out TServerMiddlewares,
  in out THandlers,
> = <const TNewChildren>(
  children: Constrain<
    TNewChildren,
    ReadonlyArray<AnyRoute> | Record<string, AnyRoute>
  >,
) => Route<
  TRegister,
  TParentRoute,
  TPath,
  TFullPath,
  TCustomId,
  TId,
  TSearchValidator,
  TParams,
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn,
  TLoaderDeps,
  TLoaderFn,
  TNewChildren,
  TFileRouteTypes,
  TSSR,
  TServerMiddlewares,
  THandlers
>

export type RouteAddFileChildrenFn<
  in out TRegister,
  in out TParentRoute extends AnyRoute,
  in out TPath extends string,
  in out TFullPath extends string,
  in out TCustomId extends string,
  in out TId extends string,
  in out TSearchValidator,
  in out TParams,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TBeforeLoadFn,
  in out TLoaderDeps extends Record<string, any>,
  in out TLoaderFn,
  in out TFileRouteTypes,
  in out TSSR,
  in out TServerMiddlewares,
  in out THandlers,
> = <const TNewChildren>(
  children: TNewChildren,
) => Route<
  TRegister,
  TParentRoute,
  TPath,
  TFullPath,
  TCustomId,
  TId,
  TSearchValidator,
  TParams,
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn,
  TLoaderDeps,
  TLoaderFn,
  TNewChildren,
  TFileRouteTypes,
  TSSR,
  TServerMiddlewares,
  THandlers
>

export type RouteAddFileTypesFn<
  TRegister,
  TParentRoute extends AnyRoute,
  TPath extends string,
  TFullPath extends string,
  TCustomId extends string,
  TId extends string,
  TSearchValidator,
  TParams,
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn,
  TLoaderDeps extends Record<string, any>,
  TLoaderFn,
  TChildren,
  TSSR,
  TServerMiddlewares,
  THandlers,
> = <TNewFileRouteTypes>() => Route<
  TRegister,
  TParentRoute,
  TPath,
  TFullPath,
  TCustomId,
  TId,
  TSearchValidator,
  TParams,
  TRouterContext,
  TRouteContextFn,
  TBeforeLoadFn,
  TLoaderDeps,
  TLoaderFn,
  TChildren,
  TNewFileRouteTypes,
  TSSR,
  TServerMiddlewares,
  THandlers
>

export interface Route<
  in out TRegister,
  in out TParentRoute extends AnyRoute,
  in out TPath extends string,
  in out TFullPath extends string,
  in out TCustomId extends string,
  in out TId extends string,
  in out TSearchValidator,
  in out TParams,
  in out TRouterContext,
  in out TRouteContextFn,
  in out TBeforeLoadFn,
  in out TLoaderDeps extends Record<string, any>,
  in out TLoaderFn,
  in out TChildren,
  in out TFileRouteTypes,
  in out TSSR,
  in out TServerMiddlewares,
  in out THandlers,
> extends RouteExtensions<TId, TFullPath> {
  path: TPath
  parentRoute: TParentRoute
  children?: TChildren
  types: RouteTypes<
    TRegister,
    TParentRoute,
    TPath,
    TFullPath,
    TCustomId,
    TId,
    TSearchValidator,
    TParams,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TChildren,
    TFileRouteTypes,
    TSSR,
    TServerMiddlewares,
    THandlers
  >
  options: RouteOptions<
    TRegister,
    TParentRoute,
    TId,
    TCustomId,
    TFullPath,
    TPath,
    TSearchValidator,
    TParams,
    TLoaderDeps,
    TLoaderFn,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TSSR,
    TServerMiddlewares,
    THandlers
  >
  isRoot: TParentRoute extends AnyRoute ? true : false
  /** @internal */
  _componentsPromise?: Promise<void>
  /** @internal */
  _componentsLoaded?: boolean
  lazyFn?: () => Promise<
    LazyRoute<
      Route<
        TRegister,
        TParentRoute,
        TPath,
        TFullPath,
        TCustomId,
        TId,
        TSearchValidator,
        TParams,
        TRouterContext,
        TRouteContextFn,
        TBeforeLoadFn,
        TLoaderDeps,
        TLoaderFn,
        TChildren,
        TFileRouteTypes,
        TSSR,
        TServerMiddlewares,
        THandlers
      >
    >
  >
  /** @internal */
  _lazyPromise?: Promise<void>
  /** @internal */
  _lazyLoaded?: boolean
  rank: number
  to: TrimPathRight<TFullPath>
  init: (opts: { originalIndex: number }) => void
  update: (
    options: UpdatableRouteOptions<
      TParentRoute,
      TCustomId,
      TFullPath,
      TParams,
      TSearchValidator,
      TLoaderFn,
      TLoaderDeps,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn
    >,
  ) => this
  lazy: RouteLazyFn<
    Route<
      TRegister,
      TParentRoute,
      TPath,
      TFullPath,
      TCustomId,
      TId,
      TSearchValidator,
      TParams,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TLoaderDeps,
      TLoaderFn,
      TChildren,
      TFileRouteTypes,
      TSSR,
      TServerMiddlewares,
      THandlers
    >
  >
  addChildren: RouteAddChildrenFn<
    TRegister,
    TParentRoute,
    TPath,
    TFullPath,
    TCustomId,
    TId,
    TSearchValidator,
    TParams,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TFileRouteTypes,
    TSSR,
    TServerMiddlewares,
    THandlers
  >
  _addFileChildren: RouteAddFileChildrenFn<
    TRegister,
    TParentRoute,
    TPath,
    TFullPath,
    TCustomId,
    TId,
    TSearchValidator,
    TParams,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TFileRouteTypes,
    TSSR,
    TServerMiddlewares,
    THandlers
  >
  _addFileTypes: RouteAddFileTypesFn<
    TRegister,
    TParentRoute,
    TPath,
    TFullPath,
    TCustomId,
    TId,
    TSearchValidator,
    TParams,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TLoaderDeps,
    TLoaderFn,
    TChildren,
    TSSR,
    TServerMiddlewares,
    THandlers
  >
  /**
   * Create a redirect with `from` automatically set to this route's path.
   * Enables relative redirects like `Route.redirect({ to: './overview' })`.
   * @param opts Redirect options (same as `redirect()` but without `from`)
   * @returns A redirect Response that can be thrown from loaders/beforeLoad
   * @link https://tanstack.com/router/latest/docs/framework/react/api/router/redirectFunction
   */
  redirect: RedirectFnRoute<TFullPath>
}

export type AnyRoute = Route<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>

export type LoaderStaleReloadMode = 'background' | 'blocking'

export type RouteLoaderObject<
  TRegister,
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TParams = {},
  TLoaderDeps = {},
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TServerMiddlewares = unknown,
  THandlers = undefined,
> = {
  handler: RouteLoaderFn<
    TRegister,
    TParentRoute,
    TId,
    TParams,
    TLoaderDeps,
    TRouterContext,
    TRouteContextFn,
    TBeforeLoadFn,
    TServerMiddlewares,
    THandlers
  >
  staleReloadMode?: LoaderStaleReloadMode
}

export type MakeRemountDepsOptionsUnion<
  TRouteTree extends AnyRoute = RegisteredRouter['routeTree'],
> =
  ParseRoute<TRouteTree> extends infer TRoute extends AnyRoute
    ? TRoute extends any
      ? RemountDepsOptions<
          TRoute['id'],
          TRoute['types']['fullSearchSchema'],
          TRoute['types']['allParams'],
          TRoute['types']['loaderDeps']
        >
      : never
    : never

export type ResolveFullPath<
  TParentRoute extends AnyRoute,
  TPath extends string,
  TPrefixed = RoutePrefix<TParentRoute['fullPath'], TPath>,
> = TPrefixed extends RootRouteId ? '/' : TPrefixed

export type AnyRouteWithContext<TContext> = AnyRoute & {
  types: { allContext: TContext }
}

export type RouteContextFn<
  in out TParentRoute extends AnyRoute,
  in out TSearchValidator,
  in out TParams,
  in out TRouterContext,
  in out TRouteId,
> = (
  ctx: RouteContextOptions<
    TParentRoute,
    TSearchValidator,
    TParams,
    TRouterContext,
    TRouteId
  >,
) => any

export type RouteLoaderEntry<
  TRegister,
  TParentRoute extends AnyRoute = AnyRoute,
  TId extends string = string,
  TParams = {},
  TLoaderDeps = {},
  TRouterContext = {},
  TRouteContextFn = AnyContext,
  TBeforeLoadFn = AnyContext,
  TServerMiddlewares = unknown,
  THandlers = undefined,
> =
  | RouteLoaderFn<
      TRegister,
      TParentRoute,
      TId,
      TParams,
      TLoaderDeps,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TServerMiddlewares,
      THandlers
    >
  | RouteLoaderObject<
      TRegister,
      TParentRoute,
      TId,
      TParams,
      TLoaderDeps,
      TRouterContext,
      TRouteContextFn,
      TBeforeLoadFn,
      TServerMiddlewares,
      THandlers
    >

export type RouteTypesById<TRouter extends AnyRouter, TId> = RouteById<
  TRouter['routeTree'],
  TId
>['types']

export type RouteMask<TRouteTree extends AnyRoute> = {
  routeTree: TRouteTree
  from: RoutePaths<TRouteTree>
  to?: any
  params?: any
  search?: any
  hash?: any
  state?: any
  unmaskOnReload?: boolean
}

export type ErrorComponentProps<TError = Error> = {
  error: TError
  info?: { componentStack: string }
  reset: () => void
}
