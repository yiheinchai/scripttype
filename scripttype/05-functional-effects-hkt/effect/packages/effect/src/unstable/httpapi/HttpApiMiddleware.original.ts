/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiMiddleware.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiEndpoint<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiGroup<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiSecurity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpServerResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlySet<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SecurityTypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unhandled<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
