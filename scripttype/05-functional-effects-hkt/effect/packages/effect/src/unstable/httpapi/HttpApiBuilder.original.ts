/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiBuilder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Etag<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FileSystem<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HandlersTypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiEndpoint<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiGroup<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpPlatform<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpServerRequest<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpServerResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Path<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Request<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type EndpointMap<Endpoints extends HttpApiEndpoint.Constraint> = {
  readonly [Endpoint in Endpoints as HttpApiEndpoint.Identifier<Endpoint>]: Endpoint
}

export type HandlerRequirements<
  Endpoint extends HttpApiEndpoint.Constraint,
  R1,
  R = HttpApiEndpoint.ExcludeProvided<
    Endpoint,
    R1 | HttpApiEndpoint.ServerServices<Endpoint>
  >
> =
  | HttpApiEndpoint.Middleware<Endpoint>
  | HttpApiEndpoint.MiddlewareServices<Endpoint>
  | ([R] extends [never] ? never : HttpRouter.Request.From<"Requires", R>)

export interface HandlerOptions {
  readonly uninterruptible?: boolean | undefined
}

export type HandleAllEntry<Endpoint extends HttpApiEndpoint.Constraint> =
  | HttpApiEndpoint.Handler<
    Endpoint,
    HttpApiEndpoint.MiddlewareError<Endpoint>,
    unknown
  >
  | {
    readonly handler: HttpApiEndpoint.Handler<
      Endpoint,
      HttpApiEndpoint.MiddlewareError<Endpoint>,
      unknown
    >
    readonly options?: HandlerOptions | undefined
  }

export type HandleAllHandlers<EndpointsByIdentifier extends Record<string, HttpApiEndpoint.Constraint>> = {
  readonly [Identifier in keyof EndpointsByIdentifier]?: HandleAllEntry<EndpointsByIdentifier[Identifier]>
}

export type HandleAllExtraKeys<
  EndpointsByIdentifier extends Record<string, HttpApiEndpoint.Constraint>,
  HandlersByIdentifier
> = {
  readonly [Identifier in Exclude<keyof HandlersByIdentifier, keyof EndpointsByIdentifier>]: never
}

export type NotHandledIdentifier<Identifier extends PropertyKey, HandledIdentifiers extends PropertyKey> = Identifier extends
  HandledIdentifiers ? never :
  unknown

export type HandleAllEntryHandler<Entry> = Entry extends { readonly handler: infer Handler } ? Handler : Entry

export type HandleAllRequirements<
  EndpointsByIdentifier extends Record<string, HttpApiEndpoint.Constraint>,
  HandlersByIdentifier extends HandleAllHandlers<EndpointsByIdentifier>
> = {
  readonly [Identifier in keyof HandlersByIdentifier & keyof EndpointsByIdentifier]: HandleAllEntryHandler<
    HandlersByIdentifier[Identifier]
  > extends HttpApiEndpoint.Handler<
    EndpointsByIdentifier[Identifier],
    HttpApiEndpoint.MiddlewareError<EndpointsByIdentifier[Identifier]>,
    infer R1
  > ? HandlerRequirements<EndpointsByIdentifier[Identifier], R1> :
    never
}[keyof HandlersByIdentifier & keyof EndpointsByIdentifier]

export type HandlersResult<A> = A extends Effect.Effect<infer H, any, any> ? H : A

export interface HandlerRuntime {
  readonly endpoint: HttpApiEndpoint.Top
  readonly handler: HttpApiEndpoint.Handler<HttpApiEndpoint.Constraint, unknown, unknown>
  readonly isRaw: boolean
  readonly uninterruptible: boolean
}

export interface Handlers<
  R,
  EndpointsByIdentifier extends Record<string, HttpApiEndpoint.Constraint> = {},
  HandledIdentifiers extends keyof EndpointsByIdentifier = never
> extends Pipeable {
  readonly [HandlersTypeId]: typeof HandlersTypeId
  readonly "~EndpointsByIdentifier": EndpointsByIdentifier
  readonly "~HandledIdentifiers": HandledIdentifiers
  /** @internal */
  readonly group: HttpApiGroup.Top
  /** @internal */
  readonly handlers: Map<string, HandlerRuntime>

  /**
   * Add the implementation for an unhandled `HttpApiEndpoint` to a `Handlers` group.
   */
  handle<
    Identifier extends keyof EndpointsByIdentifier,
    R1
  >(
    identifier: Identifier & NotHandledIdentifier<Identifier, HandledIdentifiers>,
    handler: HttpApiEndpoint.Handler<
      EndpointsByIdentifier[Identifier],
      HttpApiEndpoint.MiddlewareError<EndpointsByIdentifier[Identifier]>,
      R1
    >,
    options?: { readonly uninterruptible?: boolean | undefined } | undefined
  ): Handlers<
    R | HandlerRequirements<EndpointsByIdentifier[Identifier], R1>,
    EndpointsByIdentifier,
    HandledIdentifiers | Identifier
  >

  /**
   * Add implementations for unhandled `HttpApiEndpoint`s in a `Handlers` group.
   */
  handleAll<const HandlersByIdentifier extends HandleAllHandlers<Omit<EndpointsByIdentifier, HandledIdentifiers>>>(
    handlers:
      & HandlersByIdentifier
      & HandleAllExtraKeys<Omit<EndpointsByIdentifier, HandledIdentifiers>, HandlersByIdentifier>
  ): Handlers<
    R | HandleAllRequirements<EndpointsByIdentifier, HandlersByIdentifier>,
    EndpointsByIdentifier,
    HandledIdentifiers | keyof HandlersByIdentifier & keyof EndpointsByIdentifier
  >

  /**
   * Add the implementation for an unhandled `HttpApiEndpoint` to a `Handlers` group.
   * This version opts out of automatic payload decoding and provides the raw request.
   */
  handleRaw<
    Identifier extends keyof EndpointsByIdentifier,
    R1
  >(
    identifier: Identifier & NotHandledIdentifier<Identifier, HandledIdentifiers>,
    handler: HttpApiEndpoint.HandlerRaw<
      EndpointsByIdentifier[Identifier],
      HttpApiEndpoint.MiddlewareError<EndpointsByIdentifier[Identifier]>,
      R1
    >,
    options?: { readonly uninterruptible?: boolean | undefined } | undefined
  ): Handlers<
    R | HandlerRequirements<EndpointsByIdentifier[Identifier], R1>,
    EndpointsByIdentifier,
    HandledIdentifiers | Identifier
  >
}

export type MissingHandlerNames<H extends Handlers<any, any, any>> = Exclude<
  keyof H["~EndpointsByIdentifier"],
  H["~HandledIdentifiers"]
>

export type ValidateHandlersReturn<
  A,
  H = HandlersResult<A>,
  Missing = H extends Handlers<any, any, any> ? MissingHandlerNames<H> : never
> = H extends Handlers<any, any, any> ? [Missing] extends [never] ? A
  : `Endpoint not handled: ${Missing & string}`
  : `Must return the implemented handlers`

export type FromGroup<Group extends HttpApiGroup.Constraint> = Handlers<
    never,
    Group["endpoints"]
  >

export type ValidateReturn<A> = ValidateHandlersReturn<A>

export type Error<A> = A extends Effect.Effect<
    Handlers<
      infer _R,
      infer _EndpointsByIdentifier,
      infer _HandledIdentifiers
    >,
    infer _EX,
    infer _RX
  > ? _EX :
    never

export type Context<A> = A extends Handlers<
    infer _R,
    infer _EndpointsByIdentifier,
    infer _HandledIdentifiers
  > ? _R :
    A extends Effect.Effect<
      Handlers<
        infer _R,
        infer _EndpointsByIdentifier,
        infer _HandledIdentifiers
      >,
      infer _EX,
      infer _RX
    > ? _R | _RX :
    never

export type EndpointReturn<
  Groups extends HttpApiGroup.Constraint,
  GroupIdentifier extends HttpApiGroup.Identifier<Groups>,
  EndpointIdentifier extends HttpApiGroup.Endpoints<
    HttpApiGroup.WithIdentifier<Groups, GroupIdentifier>
  >["identifier"],
  R,
  Endpoint extends HttpApiEndpoint.Constraint = HttpApiEndpoint.WithIdentifier<
    HttpApiGroup.Endpoints<HttpApiGroup.WithIdentifier<Groups, GroupIdentifier>>,
    EndpointIdentifier
  >
> = Effect.Effect<
  Effect.Effect<
    HttpServerResponse,
    never,
    | HttpServerRequest
    | HttpRouter.RouteContext
    | Request.ParsedSearchParams
    | Exclude<R, HttpApiEndpoint.MiddlewareProvides<Endpoint>>
  >,
  never,
  | HttpApiEndpoint.ServerServices<Endpoint>
  | HttpApiEndpoint.Middleware<Endpoint>
  | HttpApiEndpoint.MiddlewareServices<Endpoint>
  | Etag.Generator
  | FileSystem
  | HttpPlatform
  | Path
>
