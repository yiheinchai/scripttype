/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiGroup.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpApiEndpoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpApiMiddleware<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonEmptyReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PathInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type EndpointMap<Endpoints extends HttpApiEndpoint.Constraint> = {
  readonly [Endpoint in Endpoints as HttpApiEndpoint.Identifier<Endpoint>]: Endpoint
}

export interface Constraint {
  readonly [TypeId]: typeof TypeId
  readonly identifier: string
  readonly key: string
  readonly endpoints: Record.ReadonlyRecord<string, HttpApiEndpoint.Constraint>
}

export interface Service<ApiId extends string, Identifier extends string> {
  readonly _: unique symbol
  readonly apiId: ApiId
  readonly identifier: Identifier
}

export type ToService<ApiId extends string, Group extends Constraint> = Group extends Constraint ?
  Service<ApiId, Group["identifier"]>
  : never

export type WithIdentifier<Group, Identifier extends string> = Extract<Group, { readonly identifier: Identifier }>

export type Identifier<Group> = Group extends Constraint ? Group["identifier"] : never

export interface HttpApiGroup<
  out Id extends string,
  in out Endpoints extends HttpApiEndpoint.Constraint = never,
  out TopLevel extends boolean = false
> extends Pipeable {
  new(_: never): {}
  readonly [TypeId]: typeof TypeId
  /**
   * Stable group identifier. This field intentionally is not named `name`
   * because `HttpApiGroup` values can be extended as classes, where `name`
   * would collide with JavaScript's built-in `Function.name`.
   */
  readonly identifier: Id
  readonly key: string
  readonly topLevel: TopLevel
  readonly endpoints: EndpointMap<Endpoints>
  readonly annotations: Context.Context<never>

  /**
   * Add an `HttpApiEndpoint` to an `HttpApiGroup`.
   */
  add<const A extends NonEmptyReadonlyArray<HttpApiEndpoint.Constraint>>(
    ...endpoints: A
  ): HttpApiGroup<Id, Endpoints | A[number], TopLevel>

  /**
   * Add a path prefix to all endpoints in an `HttpApiGroup`. Note that this will only
   * add the prefix to the endpoints before this api is called.
   */
  prefix<const Prefix extends PathInput>(
    prefix: Prefix
  ): HttpApiGroup<Id, HttpApiEndpoint.AddPrefix<Endpoints, Prefix>, TopLevel>

  /**
   * Adds an `HttpApiMiddleware` to every endpoint currently in the group.
   *
   * **Gotchas**
   *
   * Endpoints added after this method is called do not have the middleware
   * applied.
   */
  middleware<I extends HttpApiMiddleware.AnyId, S>(middleware: Context.Key<I, S>): HttpApiGroup<
    Id,
    HttpApiEndpoint.AddMiddleware<Endpoints, I>,
    TopLevel
  >

  /**
   * Merge the annotations of an `HttpApiGroup` with the provided annotations.
   */
  annotateMerge<I>(annotations: Context.Context<I>): HttpApiGroup<Id, Endpoints, TopLevel>

  /**
   * Add an annotation to an `HttpApiGroup`.
   */
  annotate<I, S>(key: Context.Key<I, S>, value: S): HttpApiGroup<Id, Endpoints, TopLevel>

  /**
   * Merges the provided context into every endpoint currently in the group.
   *
   * **Gotchas**
   *
   * Endpoints added after this method is called do not have these annotations.
   */
  annotateEndpointsMerge<I>(annotations: Context.Context<I>): HttpApiGroup<Id, Endpoints, TopLevel>

  /**
   * Adds an annotation to every endpoint currently in the group.
   *
   * **Gotchas**
   *
   * Endpoints added after this method is called do not have this annotation.
   */
  annotateEndpoints<I, S>(key: Context.Key<I, S>, value: S): HttpApiGroup<Id, Endpoints, TopLevel>
}

export type Endpoints<Group> = Group extends HttpApiGroup<infer _Identifier, infer _Endpoints, infer _TopLevel> ?
  _Endpoints
  : never

export type ErrorServicesEncode<Group> = HttpApiEndpoint.ErrorServicesEncode<Endpoints<Group>>

export type ErrorServicesDecode<Group> = HttpApiEndpoint.ErrorServicesDecode<Endpoints<Group>>

export type MiddlewareError<Group> = HttpApiEndpoint.MiddlewareError<Endpoints<Group>>

export type MiddlewareProvides<Group> = HttpApiEndpoint.MiddlewareProvides<Endpoints<Group>>

export type MiddlewareClient<Group> = HttpApiEndpoint.MiddlewareClient<Endpoints<Group>>

export type MiddlewareServices<Group> = HttpApiEndpoint.MiddlewareServices<Endpoints<Group>>

export type EndpointsWithIdentifier<Group extends Constraint, Identifier extends string> = Endpoints<
  WithIdentifier<Group, Identifier>
>

export type ClientServices<Group> = Group extends HttpApiGroup<infer _Identifier, infer _Endpoints, infer _TopLevel> ?
  HttpApiEndpoint.ClientServices<_Endpoints>
  : never

export type AddPrefix<Group, Prefix extends PathInput> = Group extends
  HttpApiGroup<infer _Identifier, infer _Endpoints, infer _TopLevel> ?
  HttpApiGroup<_Identifier, HttpApiEndpoint.AddPrefix<_Endpoints, Prefix>, _TopLevel>
  : never

export type AddMiddleware<Group, Id extends HttpApiMiddleware.AnyId> = Group extends
  HttpApiGroup<infer _Identifier, infer _Endpoints, infer _TopLevel> ?
  HttpApiGroup<_Identifier, HttpApiEndpoint.AddMiddleware<_Endpoints, Id>, _TopLevel>
  : never
