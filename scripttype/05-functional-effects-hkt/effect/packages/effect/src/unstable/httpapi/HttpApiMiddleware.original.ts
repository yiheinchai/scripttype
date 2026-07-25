/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiMiddleware.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpApiEndpoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpApiGroup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpApiSecurity<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpServerResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SecurityTypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unhandled<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ErrorSchemaFromConstraint<E> = E extends ReadonlyArray<Schema.Constraint> ? E[number]
  : E extends Schema.Constraint ? E
  : never

export type ErrorConstraint = Schema.Top | ReadonlyArray<Schema.Top>

export type HttpApiMiddleware<Provides, E extends ErrorConstraint, Requires> = (
  httpEffect: Effect.Effect<HttpServerResponse, unhandled, Provides>,
  options: {
    readonly endpoint: HttpApiEndpoint.Top
    readonly group: HttpApiGroup.Top
  }
) => Effect.Effect<HttpServerResponse, unhandled | ErrorSchemaFromConstraint<E>["Type"], Requires | HttpRouter.Provided>

export type HttpApiMiddlewareSecurity<
  Security extends Record<string, HttpApiSecurity.HttpApiSecurity>,
  Provides,
  E extends ErrorConstraint,
  Requires
> = {
  readonly [K in keyof Security]: (
    httpEffect: Effect.Effect<HttpServerResponse, unhandled, Provides>,
    options: {
      readonly credential: HttpApiSecurity.HttpApiSecurity.Type<Security[K]>
      readonly endpoint: HttpApiEndpoint.Top
      readonly group: HttpApiGroup.Top
    }
  ) => Effect.Effect<
    HttpServerResponse,
    unhandled | ErrorSchemaFromConstraint<E>["Type"],
    Requires | HttpRouter.Provided
  >
}

export type Provides<A> = A extends { readonly [TypeId]: { readonly provides: infer P } } ? P : never

export type Requires<A> = A extends { readonly [TypeId]: { readonly requires: infer R } } ? R : never

export interface AnyId {
  readonly [TypeId]: {
    readonly provides: any
    readonly requires: any
    readonly error: ErrorConstraint
    readonly clientError: any
    readonly requiredForClient: boolean
  }
}

export type ApplyServices<A extends AnyId, R> = Exclude<R, Provides<A>> | Requires<A>

export type ErrorSchema<A> = A extends { readonly [TypeId]: { readonly error: infer E } } ? ErrorSchemaFromConstraint<E>
  : never

export type Error<A> = ErrorSchema<A>["Type"]

export type ClientError<A> = A extends {
  readonly [TypeId]: {
    readonly clientError: infer CE
    readonly requiredForClient: true
  }
} ? CE
  : never

export interface ForClient<Id> {
  readonly _: unique symbol
  readonly id: Id
}

export type MiddlewareClient<A> = A extends {
  readonly [TypeId]: {
    readonly requiredForClient: true
  }
} ? ForClient<A>
  : never

export type ErrorServicesEncode<A> = ErrorSchema<A>["EncodingServices"]

export type ErrorServicesDecode<A> = ErrorSchema<A>["DecodingServices"]

export type ServiceClass<
  Self,
  Id extends string,
  Config extends {
    requires: any
    provides: any
    error: ErrorConstraint
    clientError: any
    requiredForClient: boolean
    security: Record<string, HttpApiSecurity.HttpApiSecurity>
  },
  Service =
    ([Config["security"]] extends [never] ? HttpApiMiddleware<Config["provides"], Config["error"], Config["requires"]>
      : HttpApiMiddlewareSecurity<Config["security"], Config["provides"], Config["error"], Config["requires"]>)
> =
  & Context.Service<Self, Service>
  & {
    new(_: never): Context.ServiceClass.Shape<Id, Service> & {
      readonly [TypeId]: {
        readonly error: Config["error"]
        readonly requires: Config["requires"]
        readonly provides: Config["provides"]
        readonly clientError: Config["clientError"]
        readonly requiredForClient: Config["requiredForClient"]
      }
    }
    readonly [TypeId]: typeof TypeId
    readonly error: ReadonlySet<Schema.Top>
    readonly requiredForClient: Config["requiredForClient"]
    readonly "~ClientError": Config["clientError"]
  }
  & ([keyof Config["security"]] extends [never] ? {} : {
    readonly [SecurityTypeId]: typeof SecurityTypeId
    readonly security: Config["security"]
  })
