/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiClient.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApi<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiEndpoint<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiGroup<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiMiddleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpClientError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpClientResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Sse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Stream<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Uint8Array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Client<Groups extends HttpApiGroup.Constraint, E = never, R = never> = Simplify<
  & {
    readonly [Group in Extract<Groups, { readonly topLevel: false }> as HttpApiGroup.Identifier<Group>]: Client.Group<
      Group,
      E,
      R
    >
  }
  & Client.TopLevelMethods<Groups, E, R>
>

export type ForApi<Api extends HttpApi.Constraint, E = never, R = never> = Api extends
  HttpApi.HttpApi<infer _Id, infer Groups> ? Client<Groups, E, R> :
  never

export type SuccessType<S> = S extends HttpApiSchema.StreamSse<
  infer _Events,
  infer _Error,
  infer _Value
> ? Stream.Stream<
    _Value,
    _Error["Type"] | HttpClientError.HttpClientError | Schema.SchemaError | Sse.Retry,
    never
  >
  : S extends HttpApiSchema.StreamUint8Array ? Stream.Stream<Uint8Array, HttpClientError.HttpClientError, never>
  : S extends Schema.Constraint ? S["Type"]
  : never

export type SuccessDecodingServices<S> = S extends HttpApiSchema.StreamSse<
  infer _Events,
  infer _Error,
  infer _Value
> ?
    | _Events["DecodingServices"]
    | _Error["DecodingServices"]
  : S extends HttpApiSchema.StreamUint8Array ? never
  : S extends Schema.Constraint ? S["DecodingServices"]
  : never

export type ResponseMode = HttpApiEndpoint.ClientResponseMode

export type Response<Success, Mode extends ResponseMode> = [Mode] extends ["decoded-and-response"]
    ? [Success, HttpClientResponse.HttpClientResponse]
    : [Mode] extends ["response-only"] ? HttpClientResponse.HttpClientResponse
    : Success

export type MethodReturn<
    Endpoint extends HttpApiEndpoint.ConstraintRequest,
    E,
    R,
    Mode extends ResponseMode
  > = Effect.Effect<
    Response<SuccessType<Endpoint["~Success"]>, Mode>,
    | HttpApiMiddleware.Error<Endpoint["~Middleware"]>
    | HttpApiMiddleware.ClientError<Endpoint["~Middleware"]>
    | E
    | HttpClientError.HttpClientError
    | ([Mode] extends ["response-only"] ? never : Endpoint["~Error"]["Type"] | Schema.SchemaError),
    | R
    | Endpoint["~Params"]["EncodingServices"]
    | Endpoint["~Query"]["EncodingServices"]
    | Endpoint["~Payload"]["EncodingServices"]
    | Endpoint["~Headers"]["EncodingServices"]
    | ([Mode] extends ["response-only"] ? never
      :
        | SuccessDecodingServices<Endpoint["~Success"]>
        | Endpoint["~Error"]["DecodingServices"])
  >

export type Method<
    Endpoint extends HttpApiEndpoint.ConstraintRequest,
    E,
    R
  > = <Mode extends ResponseMode = ResponseMode>(
    request: Simplify<
      HttpApiEndpoint.ClientRequest<
        Endpoint["~Params"],
        Endpoint["~Query"],
        Endpoint["~Payload"],
        Endpoint["~Headers"],
        Mode
      >
    >
  ) => MethodReturn<Endpoint, E, R, Mode>

export type GroupByEndpoint<Group extends HttpApiGroup.Constraint, E, R> = Group["endpoints"] extends
    infer Endpoints extends Readonly<Record<string, HttpApiEndpoint.ConstraintRequest>> ? {
      readonly [Identifier in keyof Endpoints]: Method<Endpoints[Identifier], E, R>
    }
    : {}

export type Group<Group extends HttpApiGroup.Constraint, E, R> = GroupByEndpoint<Group, E, R>

export type TopLevelMethods<Groups extends HttpApiGroup.Constraint, E, R> = {
    readonly [
      Endpoint in Extract<
        HttpApiGroup.Endpoints<Extract<Groups, { readonly topLevel: true }>>,
        HttpApiEndpoint.ConstraintRequest
      > as Endpoint["identifier"]
    ]: Method<Endpoint, E, R>
  }

export type UrlBuilderRequestPart<Key extends string, Value> = [Value] extends [never] ? {}
  : { readonly [K in Key]: Value }

export type UrlBuilderRequest<
  Endpoint extends HttpApiEndpoint.Constraint,
  Params = HttpApiEndpoint.Params<Endpoint>["Type"],
  Query = HttpApiEndpoint.Query<Endpoint>["Type"]
> = (
  & UrlBuilderRequestPart<"params", Params>
  & UrlBuilderRequestPart<"query", Query>
) extends infer Request ? keyof Request extends never ? void | undefined : Request
  : never

export type UrlBuilderArgs<Request> = [Request] extends [void | undefined] ? [request?: Request]
  : [request: Request]

export type UrlBuilderMethod<Endpoint extends HttpApiEndpoint.Constraint> = (
  ...args: UrlBuilderArgs<UrlBuilderRequest<Endpoint>>
) => string

export type UrlBuilderGroup<Endpoints extends HttpApiEndpoint.Constraint> = {
  readonly [Endpoint in Endpoints as HttpApiEndpoint.Identifier<Endpoint>]: UrlBuilderMethod<Endpoint>
}

export type UrlBuilderGroups<Groups extends HttpApiGroup.Constraint> = {
  readonly [Group in Extract<Groups, { readonly topLevel: false }> as HttpApiGroup.Identifier<Group>]: UrlBuilderGroup<
    HttpApiGroup.Endpoints<Group>
  >
}

export type UrlBuilderTopLevelMethods<Groups extends HttpApiGroup.Constraint> = {
  readonly [
    Endpoint in HttpApiGroup.Endpoints<Extract<Groups, { readonly topLevel: true }>> as HttpApiEndpoint.Identifier<
      Endpoint
    >
  ]: UrlBuilderMethod<Endpoint>
}

export type UrlBuilder<Api extends HttpApi.Constraint> = Api extends HttpApi.HttpApi<infer _ApiId, infer Groups> ?
  [Extract<Groups, { readonly topLevel: true }>] extends [never] ? UrlBuilderGroups<Groups>
  : [Extract<Groups, { readonly topLevel: false }>] extends [never] ? UrlBuilderTopLevelMethods<Groups>
  : Simplify<UrlBuilderGroups<Groups> & UrlBuilderTopLevelMethods<Groups>>
  : never

export type EndpointReturn<
  Groups extends HttpApiGroup.Constraint,
  GroupIdentifier extends HttpApiGroup.Identifier<Groups>,
  EndpointIdentifier extends HttpApiGroup.EndpointsWithIdentifier<Groups, GroupIdentifier>["identifier"],
  E,
  R,
  Endpoint extends HttpApiEndpoint.ConstraintRequest = Extract<
    HttpApiEndpoint.WithIdentifier<HttpApiGroup.EndpointsWithIdentifier<Groups, GroupIdentifier>, EndpointIdentifier>,
    HttpApiEndpoint.ConstraintRequest
  >
> = Effect.Effect<Client.Method<Endpoint, E, R>, never, HttpApiEndpoint.MiddlewareClient<Endpoint>>
