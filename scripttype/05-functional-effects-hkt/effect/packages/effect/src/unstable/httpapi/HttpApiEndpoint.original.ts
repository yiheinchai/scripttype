/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiEndpoint.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Brand<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FormData<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiGroup<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiMiddleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpMethod<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpServerRequest<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpServerResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Multipart<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlySet<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Stream<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Types<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Uint8Array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SuccessType<S> = S extends HttpApiSchema.StreamSse<
  infer _Events,
  infer _Error,
  infer _Value
> ? Stream.Stream<_Value, _Error["Type"], never>
  : S extends HttpApiSchema.StreamUint8Array ? Stream.Stream<Uint8Array, unknown, never>
  : S extends Schema.Constraint ? S["Type"]
  : never

export type SuccessEncodingServices<S> = S extends HttpApiSchema.StreamSse<
  infer _Events,
  infer _Error,
  infer _Value
> ? _Events["EncodingServices"] | _Error["EncodingServices"]
  : S extends HttpApiSchema.StreamUint8Array ? never
  : S extends Schema.Constraint ? S["EncodingServices"]
  : never

export type SuccessDecodingServices<S> = S extends HttpApiSchema.StreamSse<
  infer _Events,
  infer _Error,
  infer _Value
> ? _Events["DecodingServices"] | _Error["DecodingServices"]
  : S extends HttpApiSchema.StreamUint8Array ? never
  : S extends Schema.Constraint ? S["DecodingServices"]
  : never

export type UnwrapReadonlyArray<S> = S extends ReadonlyArray<infer A> ? A : S

export type SuccessConstraint = Schema.Top | ReadonlyArray<Schema.Top>

export type ExtractBufferedSuccess<S extends SuccessConstraint> = Exclude<
  Extract<UnwrapReadonlyArray<S>, Schema.Top>,
  HttpApiSchema.StreamSchema
>

export type ExtractStreamSuccess<S extends SuccessConstraint> = UnwrapReadonlyArray<S> extends infer Success ?
  Success extends HttpApiSchema.StreamSchema ? Success : never
  : never

export type ToSuccessCodec<S extends SuccessConstraint> = [ExtractBufferedSuccess<S>] extends [never] ? ExtractStreamSuccess<S>
  : Schema.toCodecJson<ExtractBufferedSuccess<S>> | ExtractStreamSuccess<S>

export type ToJsonCodec<S> = [S] extends [never] ? never
  : [S] extends [Schema.Constraint] ? Schema.toCodecJson<S>
  : never

export type ToStringTreeCodec<S> = [S] extends [never] ? never
  : [S] extends [Schema.Struct.Fields] ? Schema.toCodecStringTree<Schema.Struct<S>>
  : [S] extends [Schema.Constraint] ? Schema.toCodecStringTree<S>
  : never

export type RequestFromParts<Endpoint, ParamsType, QueryType, PayloadType, HeadersType> =
  & ([ParamsType] extends [never] ? {} : { readonly params: Simplify<ParamsType> })
  & ([QueryType] extends [never] ? {} : { readonly query: Simplify<QueryType> })
  & ([PayloadType] extends [never] ? {}
    : PayloadType extends Brand<HttpApiSchema.MultipartStreamTypeId> ?
      { readonly payload: Stream.Stream<Multipart.Part, Multipart.MultipartError> }
    : { readonly payload: Simplify<PayloadType> })
  & ([HeadersType] extends [never] ? {} : { readonly headers: Simplify<HeadersType> })
  & {
    readonly request: HttpServerRequest
    readonly endpoint: Endpoint
    readonly group: HttpApiGroup.Top
  }

export type RequestRawFromParts<Endpoint, ParamsType, QueryType, HeadersType> =
  & ([ParamsType] extends [never] ? {} : { readonly params: Simplify<ParamsType> })
  & ([QueryType] extends [never] ? {} : { readonly query: Simplify<QueryType> })
  & ([HeadersType] extends [never] ? {} : { readonly headers: Simplify<HeadersType> })
  & {
    readonly request: HttpServerRequest
    readonly endpoint: Endpoint
    readonly group: HttpApiGroup.Top
  }

export interface Constraint {
  readonly [TypeId]: typeof TypeId
  readonly identifier: string
  readonly ["~Success"]: Schema.Constraint
  readonly ["~Error"]: Schema.Constraint
  readonly ["~Request"]: unknown
  readonly ["~RequestRaw"]: unknown
}

export type Identifier<Endpoint> = Endpoint extends Constraint ? Endpoint["identifier"] : never

export type Success<Endpoint> = Endpoint extends Constraint ? Endpoint["~Success"] : never

export type Error<Endpoint> = Endpoint extends Constraint ? Endpoint["~Error"] : never

export interface ConstraintRequest extends Constraint {
  readonly ["~Params"]: Schema.Constraint
  readonly ["~Query"]: Schema.Constraint
  readonly ["~Payload"]: Schema.Constraint
  readonly ["~Headers"]: Schema.Constraint
  readonly ["~Middleware"]: unknown
}

export type Params<Endpoint> = Endpoint extends ConstraintRequest ? Endpoint["~Params"]
  : never

export type Query<Endpoint> = Endpoint extends ConstraintRequest ? Endpoint["~Query"]
  : never

export type Payload<Endpoint> = Endpoint extends ConstraintRequest ? Endpoint["~Payload"]
  : never

export type Headers<Endpoint> = Endpoint extends ConstraintRequest ? Endpoint["~Headers"]
  : never

export type Middleware<Endpoint> = Endpoint extends { readonly "~Middleware": infer M } ? M
  : never

export type MiddlewareProvides<Endpoint> = HttpApiMiddleware.Provides<Middleware<Endpoint>>

export type MiddlewareClient<Endpoint> = HttpApiMiddleware.MiddlewareClient<Middleware<Endpoint>>

export type MiddlewareError<Endpoint> = HttpApiMiddleware.Error<Middleware<Endpoint>>

export type Errors<Endpoint> = Endpoint extends ConstraintRequest ?
  Endpoint["~Error"]["Type"] | HttpApiMiddleware.Error<Endpoint["~Middleware"]>
  : never

export type ErrorServicesEncode<Endpoint> = Endpoint extends ConstraintRequest ?
    | Endpoint["~Error"]["EncodingServices"]
    | HttpApiMiddleware.ErrorServicesEncode<Endpoint["~Middleware"]>
  : never

export type Request<Endpoint> = Endpoint extends ConstraintRequest ? Endpoint["~Request"]
  : {}

export type RequestRaw<Endpoint> = Endpoint extends ConstraintRequest ? Endpoint["~RequestRaw"]
  : {}

export type ClientResponseMode = "decoded-only" | "decoded-and-response" | "response-only"

export type ClientRequest<
  Params extends Schema.Constraint,
  Query extends Schema.Constraint,
  Payload extends Schema.Constraint,
  Headers extends Schema.Constraint,
  ResponseMode extends ClientResponseMode
> = (
  & ([Params["Type"]] extends [never] ? {} : { readonly params: Params["Type"] })
  & ([Query["Type"]] extends [never] ? {} : { readonly query: Query["Type"] })
  & ([Headers["Type"]] extends [never] ? {} : { readonly headers: Headers["Type"] })
  & ([Payload["Type"]] extends [never] ? {}
    : Payload["Type"] extends infer P ?
      P extends Brand<HttpApiSchema.MultipartTypeId> | Brand<HttpApiSchema.MultipartStreamTypeId>
        ? { readonly payload: FormData }
      : { readonly payload: Payload["Type"] }
    : { readonly payload: Payload["Type"] })
) extends infer Req ? keyof Req extends never ? (void | { readonly responseMode?: ResponseMode }) :
  Req & { readonly responseMode?: ResponseMode } :
  void

export type ServerServices<Endpoint> = Endpoint extends ConstraintRequest ?
    | Endpoint["~Params"]["DecodingServices"]
    | Endpoint["~Query"]["DecodingServices"]
    | Endpoint["~Payload"]["DecodingServices"]
    | Endpoint["~Headers"]["DecodingServices"]
    | SuccessEncodingServices<Endpoint["~Success"]>
    | Endpoint["~Error"]["EncodingServices"]
    | HttpApiMiddleware.ErrorServicesEncode<Endpoint["~Middleware"]>
  : never

export type ClientServices<Endpoint> = Endpoint extends ConstraintRequest ?
    | Endpoint["~Params"]["EncodingServices"]
    | Endpoint["~Query"]["EncodingServices"]
    | Endpoint["~Payload"]["EncodingServices"]
    | Endpoint["~Headers"]["EncodingServices"]
    | SuccessDecodingServices<Endpoint["~Success"]>
    | Endpoint["~Error"]["DecodingServices"]
  : never

export type MiddlewareServices<Endpoint> = Endpoint extends { readonly "~MiddlewareServices": infer R } ? R
  : never

export type ErrorServicesDecode<Endpoint> = Endpoint extends ConstraintRequest ?
    | Endpoint["~Error"]["DecodingServices"]
    | HttpApiMiddleware.ErrorServicesDecode<Endpoint["~Middleware"]>
  : never

export type Handler<Endpoint extends Constraint, E, R> = (
  request: Simplify<Endpoint["~Request"]>
) => Effect<SuccessType<Endpoint["~Success"]> | HttpServerResponse, Endpoint["~Error"]["Type"] | E, R>

export type HandlerRaw<Endpoint extends Constraint, E, R> = (
  request: Simplify<Endpoint["~RequestRaw"]>
) => Effect<SuccessType<Endpoint["~Success"]> | HttpServerResponse, Endpoint["~Error"]["Type"] | E, R>

export type WithIdentifier<Endpoints, Identifier extends string> = Extract<
  Endpoints,
  { readonly identifier: Identifier }
>

export type ExcludeIdentifier<Endpoints, Identifier extends string> = Exclude<
  Endpoints,
  { readonly identifier: Identifier }
>

export type HandlerWithIdentifier<Endpoints extends Constraint, Identifier extends string, E, R> = Handler<
  WithIdentifier<Endpoints, Identifier>,
  E,
  R
>

export type HandlerRawWithIdentifier<Endpoints extends Constraint, Identifier extends string, E, R> = HandlerRaw<
  WithIdentifier<Endpoints, Identifier>,
  E,
  R
>

export type SuccessWithIdentifier<Endpoints extends Constraint, Identifier extends string> = Success<
  WithIdentifier<Endpoints, Identifier>
> extends infer S ? SuccessType<S> : never

export type ErrorsWithIdentifier<Endpoints extends Constraint, Identifier extends string> = Errors<
  WithIdentifier<Endpoints, Identifier>
>

export type ServerServicesWithIdentifier<Endpoints extends Constraint, Identifier extends string> = ServerServices<
  WithIdentifier<Endpoints, Identifier>
>

export type MiddlewareWithIdentifier<Endpoints extends Constraint, Identifier extends string> = Middleware<
  WithIdentifier<Endpoints, Identifier>
>

export type MiddlewareServicesWithIdentifier<Endpoints extends Constraint, Identifier extends string> =
  MiddlewareServices<WithIdentifier<Endpoints, Identifier>>

export type ExcludeProvided<Endpoint extends Constraint, R> = Exclude<
  R,
  | HttpRouter.Provided
  | HttpApiMiddleware.Provides<Middleware<Endpoint>>
>

export type ExcludeProvidedWithIdentifier<Endpoints extends Constraint, Identifier extends string, R> = ExcludeProvided<
  WithIdentifier<Endpoints, Identifier>,
  R
>

export type PayloadMap = ReadonlyMap<string, {
  readonly encoding: HttpApiSchema.PayloadEncoding
  readonly schemas: readonly [Schema.Top, ...Array<Schema.Top>]
}>

export interface HttpApiEndpoint<
  out Identifier extends string,
  out Method extends HttpMethod,
  out Path extends string,
  out Params extends Schema.Top = never,
  out Query extends Schema.Top = never,
  out Payload extends Schema.Top = never,
  out Headers extends Schema.Top = never,
  out Success extends Schema.Top = typeof HttpApiSchema.NoContent,
  out Error extends Schema.Top = never,
  in out Middleware = never,
  out MiddlewareServices = never
> extends Pipeable {
  new(_: never): {}
  readonly [TypeId]: typeof TypeId
  readonly "~Params": Params
  readonly "~Query": Query
  readonly "~Headers": Headers
  readonly "~Payload": Payload
  readonly "~Success": Success
  readonly "~Error": Error
  readonly "~Middleware": Middleware
  readonly "~MiddlewareServices": MiddlewareServices
  readonly "~Request": RequestFromParts<this, Params["Type"], Query["Type"], Payload["Type"], Headers["Type"]>
  readonly "~RequestRaw": RequestRawFromParts<this, Params["Type"], Query["Type"], Headers["Type"]>

  readonly identifier: Identifier
  readonly path: Path
  readonly method: Method
  readonly params: Schema.Top | undefined
  readonly query: Schema.Top | undefined
  readonly headers: Schema.Top | undefined
  readonly payload: PayloadMap
  readonly success: ReadonlySet<Schema.Top>
  readonly error: ReadonlySet<Schema.Top>
  readonly annotations: Context.Context<never>
  readonly middlewares: ReadonlySet<Context.Key<Middleware, any>>

  /**
   * Add a prefix to the path of the endpoint.
   */
  prefix<const Prefix extends HttpRouter.PathInput>(
    prefix: Prefix
  ): HttpApiEndpoint<
    Identifier,
    Method,
    `${Prefix}${Path}`,
    Params,
    Query,
    Payload,
    Headers,
    Success,
    Error,
    Middleware,
    MiddlewareServices
  >

  /**
   * Add an `HttpApiMiddleware` to the endpoint.
   */
  middleware<I extends HttpApiMiddleware.AnyId, S>(middleware: Context.Key<I, S>): HttpApiEndpoint<
    Identifier,
    Method,
    Path,
    Params,
    Query,
    Payload,
    Headers,
    Success,
    Error,
    Middleware | I,
    HttpApiMiddleware.ApplyServices<I, MiddlewareServices>
  >

  /**
   * Add an annotation on the endpoint.
   */
  annotate<I, S>(
    key: Context.Key<I, S>,
    value: Types.NoInfer<S>
  ): HttpApiEndpoint<
    Identifier,
    Method,
    Path,
    Params,
    Query,
    Payload,
    Headers,
    Success,
    Error,
    Middleware,
    MiddlewareServices
  >

  /**
   * Merge the annotations of the endpoint with the provided context.
   */
  annotateMerge<I>(
    annotations: Context.Context<I>
  ): HttpApiEndpoint<
    Identifier,
    Method,
    Path,
    Params,
    Query,
    Payload,
    Headers,
    Success,
    Error,
    Middleware,
    MiddlewareServices
  >
}

export type AddPrefix<Endpoint, Prefix extends HttpRouter.PathInput> = Endpoint extends HttpApiEndpoint<
  infer _Identifier,
  infer _Method,
  infer _Path,
  infer _Params,
  infer _Query,
  infer _Payload,
  infer _Headers,
  infer _Success,
  infer _Error,
  infer _M,
  infer _MR
> ? HttpApiEndpoint<
    _Identifier,
    _Method,
    `${Prefix}${_Path}`,
    _Params,
    _Query,
    _Payload,
    _Headers,
    _Success,
    _Error,
    _M,
    _MR
  > :
  never

export type AddMiddleware<Endpoint, M extends HttpApiMiddleware.AnyId> = Endpoint extends HttpApiEndpoint<
  infer _Identifier,
  infer _Method,
  infer _Path,
  infer _Params,
  infer _Query,
  infer _Payload,
  infer _Headers,
  infer _Success,
  infer _Error,
  infer _M,
  infer _MR
> ? HttpApiEndpoint<
    _Identifier,
    _Method,
    _Path,
    _Params,
    _Query,
    _Payload,
    _Headers,
    _Success,
    _Error,
    _M | M,
    HttpApiMiddleware.ApplyServices<M, _MR>
  > :
  never

export type PayloadConstraint<Method extends HttpMethod> = Method extends HttpMethod.NoBody ? Record<
    string,
    Schema.Encoder<string | ReadonlyArray<string> | undefined, unknown>
  > :
  Schema.Top | ReadonlyArray<Schema.Top>

export type PayloadConstraintCodecs<Method extends HttpMethod> = Method extends HttpMethod.NoBody ?
  Record<string, Schema.Top> :
  Schema.Top | ReadonlyArray<Schema.Top>

export type ErrorConstraint = Schema.Top | ReadonlyArray<Schema.Top>

export type ErrorNoStream<S extends ErrorConstraint> = [
  Extract<
    S extends ReadonlyArray<Schema.Constraint> ? S[number] : S,
    HttpApiSchema.StreamSchema
  >
] extends [never] ? S : never

export type ToSchema<S extends Schema.Struct.Fields | Schema.Constraint | ReadonlyArray<Schema.Constraint>> = S extends
  Schema.Struct.Fields ? Schema.Struct<S>
  : S extends ReadonlyArray<Schema.Constraint> ? S[number]
  : S
