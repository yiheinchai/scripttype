/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/http/HttpRouter.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpMethod<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpServerRequest<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpServerResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Layer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Option<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RouteContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RouteTypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Types<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type PathInput = `/${string}` | "*"

export interface Route<E = never, R = never> {
  readonly [RouteTypeId]: typeof RouteTypeId
  readonly method: HttpMethod.HttpMethod | "*"
  readonly path: PathInput
  readonly handler: Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>
  readonly uninterruptible: boolean
  readonly prefix: Option.Option<string>
}

export type Error<R extends Route<any, any>> = R extends Route<infer E, infer _R> ? E : never

export type Context<T extends Route<any, any>> = T extends Route<infer _E, infer R> ? R : never

export interface Request<Kind extends string, T> {
  readonly _: unique symbol
  readonly kind: Kind
  readonly type: T
}

export type From<Kind extends string, R> = R extends infer T ? Request<Kind, T> : never

export type Only<Kind extends string, A> = A extends Request<Kind, infer T> ? T : never

export type Without<A> = A extends Request<infer _Kind, infer _> ? never : A

export type Provided =
  | HttpServerRequest.HttpServerRequest
  | Scope.Scope
  | HttpServerRequest.ParsedSearchParams
  | RouteContext

export type GlobalProvided =
  | HttpServerRequest.HttpServerRequest
  | Scope.Scope

export interface HttpRouter {
  readonly [TypeId]: typeof TypeId

  readonly prefixed: (prefix: string) => HttpRouter

  readonly add: <E = never, R = never>(
    method: "*" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS",
    path: PathInput,
    handler:
      | HttpServerResponse.HttpServerResponse
      | Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>
      | ((request: HttpServerRequest.HttpServerRequest) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>),
    options?: { readonly uninterruptible?: boolean | undefined } | undefined
  ) => Effect.Effect<
    void,
    never,
    Request.From<"Requires", Exclude<R, Provided>> | Request.From<"Error", E>
  >

  readonly addAll: <const Routes extends ReadonlyArray<Route<any, any>>>(
    routes: Routes
  ) => Effect.Effect<
    void,
    never,
    | Request.From<"Requires", Exclude<Route.Context<Routes[number]>, Provided>>
    | Request.From<"Error", Route.Error<Routes[number]>>
  >

  readonly addGlobalMiddleware: <E, R>(
    middleware:
      & ((
        effect: Effect.Effect<HttpServerResponse.HttpServerResponse, Types.unhandled>
      ) => Effect.Effect<HttpServerResponse.HttpServerResponse, E, R>)
      & (Types.unhandled extends E ? unknown : "You cannot handle any errors")
  ) => Effect.Effect<
    void,
    never,
    | Request.From<"GlobalRequires", Exclude<R, GlobalProvided>>
    | Request.From<"GlobalError", Exclude<E, Types.unhandled>>
  >

  readonly asHttpEffect: () => Effect.Effect<
    HttpServerResponse.HttpServerResponse,
    unknown,
    HttpServerRequest.HttpServerRequest | Scope.Scope
  >
}

export interface Middleware<
  Config extends {
    provides: any
    handles: any
    error: any
    requires: any
    layerError: any
    layerRequires: any
  }
> {
  readonly [MiddlewareTypeId]: Config

  readonly layer: [Config["requires"]] extends [never] ? Layer.Layer<
      Request.From<"Requires", Config["provides"]>,
      Config["layerError"],
      | Config["layerRequires"]
      | Request.From<"Requires", Config["requires"]>
      | Request.From<"Error", Config["error"]>
    >
    : "Need to .combine(middleware) that satisfy the missing request dependencies"

  readonly combine: <
    Config2 extends {
      provides: any
      handles: any
      error: any
      requires: any
      layerError: any
      layerRequires: any
    }
  >(other: Middleware<Config2>) => Middleware<{
    provides: Config2["provides"] | Config["provides"]
    handles: Config2["handles"] | Config["handles"]
    error: Config2["error"] | Exclude<Config["error"], Config2["handles"]>
    requires: Exclude<Config["requires"], Config2["provides"]> | Config2["requires"]
    layerError: Config["layerError"] | Config2["layerError"]
    layerRequires: Config["layerRequires"] | Config2["layerRequires"]
  }>
}

export type Make<Provides = never, Handles = never> = {
    <E, R, EX, RX, const Global extends boolean = false>(
      middleware: Effect.Effect<
        (
          effect: Effect.Effect<
            HttpServerResponse.HttpServerResponse,
            Types.NoInfer<Handles | Types.unhandled>,
            Types.NoInfer<Provides>
          >
        ) =>
          & Effect.Effect<
            HttpServerResponse.HttpServerResponse,
            E,
            R
          >
          & (Types.unhandled extends E ? unknown : "You must only handle the configured errors"),
        EX,
        RX
      >,
      options?: {
        readonly global?: Global | undefined
      }
    ): Global extends true ? Layer.Layer<
        | Request.From<"Requires", Provides>
        | Request.From<"Error", Handles>
        | Request.From<"GlobalRequires", Provides>
        | Request.From<"GlobalError", Handles>,
        EX,
        | HttpRouter
        | Exclude<RX, Scope.Scope>
        | Request.From<"GlobalRequires", Exclude<R, GlobalProvided>>
        | Request.From<"GlobalError", Exclude<E, Types.unhandled>>
      > :
      Middleware<{
        provides: Provides
        handles: Handles
        error: Exclude<E, Types.unhandled>
        requires: Exclude<R, Provided>
        layerError: EX
        layerRequires: Exclude<RX, Scope.Scope>
      }>
    <E, R, const Global extends boolean = false>(
      middleware:
        & ((
          effect: Effect.Effect<
            HttpServerResponse.HttpServerResponse,
            Types.NoInfer<Handles | Types.unhandled>,
            Types.NoInfer<Provides>
          >
        ) => Effect.Effect<
          HttpServerResponse.HttpServerResponse,
          E,
          R
        >)
        & (Types.unhandled extends E ? unknown : "You must only handle the configured errors"),
      options?: {
        readonly global?: Global | undefined
      }
    ): Global extends true ? Layer.Layer<
        | Request.From<"Requires", Provides>
        | Request.From<"Error", Handles>
        | Request.From<"GlobalRequires", Provides>
        | Request.From<"GlobalError", Handles>,
        never,
        | HttpRouter
        | Request.From<"GlobalRequires", Exclude<R, GlobalProvided>>
        | Request.From<"GlobalError", Exclude<E, Types.unhandled>>
      > :
      Middleware<{
        provides: Provides
        handles: Handles
        error: Exclude<E, Types.unhandled>
        requires: Exclude<R, Provided>
        layerError: never
        layerRequires: never
      }>
  }
