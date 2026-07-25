/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/rpc/RpcGroup.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cause<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Headers<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Layer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Queue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyMap<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequestId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RpcMiddleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Stream<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type HandlersFrom<Rpc extends Rpc.Any> = {
  readonly [Current in Rpc as Current["_tag"]]: Rpc.ToHandlerFn<Current>
}

export type HandlerFrom<Rpc extends Rpc.Any, Tag extends Rpc["_tag"]> = Extract<Rpc, { readonly _tag: Tag }> extends
  infer Current ? Current extends Rpc.Any ? Rpc.ToHandlerFn<Current> : never : never

export type HandlerServices<Rpcs extends Rpc.Any, K extends Rpcs["_tag"], Handler> = true extends
  Rpc.IsStream<Rpcs, K> ? Handler extends (...args: any) =>
    | Stream.Stream<infer _A, infer _E, infer _R>
    | Rpc.Wrapper<Stream.Stream<infer _A, infer _E, infer _R>>
    | Effect.Effect<
      Queue.Dequeue<infer _A, infer _E | Cause.Done>,
      infer _EX,
      infer _R
    >
    | Rpc.Wrapper<
      Effect.Effect<
        Queue.Dequeue<infer _A, infer _E | Cause.Done>,
        infer _EX,
        infer _R
      >
    > ? Exclude<Rpc.ExcludeProvides<_R, Rpcs, K>, Scope> | Rpc.ExtractRequires<Rpcs, K> :
  never :
  Handler extends (
    ...args: any
  ) => Effect.Effect<infer _A, infer _E, infer _R> | Rpc.Wrapper<Effect.Effect<infer _A, infer _E, infer _R>> ?
    Exclude<Rpc.ExcludeProvides<_R, Rpcs, K>, Scope> | Rpc.ExtractRequires<Rpcs, K>
  : never

export type HandlersServices<Rpcs extends Rpc.Any, Handlers> = keyof Handlers extends infer K ?
  K extends keyof Handlers & string ? HandlerServices<Rpcs, K, Handlers[K]> : never :
  never

export interface Any {
  readonly [TypeId]: typeof TypeId
}

export interface RpcGroup<in out R extends Rpc.Any> extends Pipeable {
  new(_: never): {}

  readonly [TypeId]: typeof TypeId
  readonly requests: ReadonlyMap<string, R>
  readonly annotations: Context.Context<never>

  /**
   * Add one or more procedures to the group.
   */
  add<const Rpcs2 extends ReadonlyArray<Rpc.Any>>(
    ...rpcs: Rpcs2
  ): RpcGroup<R | Rpcs2[number]>

  /**
   * Merge this group with one or more other groups.
   */
  merge<const Groups extends ReadonlyArray<Any>>(
    ...groups: Groups
  ): RpcGroup<R | Rpcs<Groups[number]>>

  /**
   * Omit one or more procedures from the group.
   */
  omit<const Tags extends ReadonlyArray<R["_tag"]>>(
    ...tags: Tags
  ): RpcGroup<Exclude<R, { readonly _tag: Tags[number] }>>

  /**
   * Add middleware to all the procedures added to the group until this point.
   */
  middleware<M extends RpcMiddleware.AnyService>(middleware: M): RpcGroup<Rpc.AddMiddleware<R, M>>

  /**
   * Add a prefix to the procedures in this group, returning a new group
   */
  prefix<const Prefix extends string>(prefix: Prefix): RpcGroup<Rpc.Prefixed<R, Prefix>>

  /**
   * Implement the handlers for the procedures in this group, returning a
   * context object.
   */
  toHandlers<
    Handlers extends HandlersFrom<R>,
    EX = never,
    RX = never
  >(
    build:
      | Handlers
      | Effect.Effect<Handlers, EX, RX>
  ): Effect.Effect<
    Context.Context<Rpc.ToHandler<R>>,
    EX,
    | RX
    | HandlersServices<R, Handlers>
  >

  /**
   * Implement the handlers for the procedures in this group.
   */
  toLayer<
    Handlers extends HandlersFrom<R>,
    EX = never,
    RX = never
  >(
    build:
      | Handlers
      | Effect.Effect<Handlers, EX, RX>
  ): Layer.Layer<
    Rpc.ToHandler<R>,
    EX,
    | Exclude<RX, Scope>
    | HandlersServices<R, Handlers>
  >

  of<const Handlers extends HandlersFrom<R>>(handlers: Handlers): Handlers

  /**
   * Implement a single handler from the group.
   */
  toLayerHandler<
    const Tag extends R["_tag"],
    Handler extends HandlerFrom<R, Tag>,
    EX = never,
    RX = never
  >(
    tag: Tag,
    build:
      | Handler
      | Effect.Effect<Handler, EX, RX>
  ): Layer.Layer<
    Rpc.Handler<Tag>,
    EX,
    | Exclude<RX, Scope>
    | HandlerServices<R, Tag, Handler>
  >

  /**
   * Retrieve a handler for a specific procedure in the group.
   */
  accessHandler<const Tag extends R["_tag"]>(tag: Tag): Effect.Effect<
    (
      payload: Rpc.Payload<Extract<R, { readonly _tag: Tag }>>,
      options: {
        readonly client: Rpc.ServerClient
        readonly requestId: RequestId
        readonly headers: Headers
      }
    ) => Rpc.ResultFrom<Extract<R, { readonly _tag: Tag }>, never>,
    never,
    Rpc.Handler<Tag>
  >

  /**
   * Annotate the group with a value.
   */
  annotate<I, S>(service: Context.Key<I, S>, value: S): RpcGroup<R>

  /**
   * Annotate the Rpc's above this point with a value.
   */
  annotateRpcs<I, S>(service: Context.Key<I, S>, value: S): RpcGroup<R>

  /**
   * Annotate the group with the provided annotations.
   */
  annotateMerge<S>(annotations: Context.Context<S>): RpcGroup<R>

  /**
   * Annotate the Rpc's above this point with the provided annotations.
   */
  annotateRpcsMerge<S>(annotations: Context.Context<S>): RpcGroup<R>
}

export type Rpcs<Group> = Group extends RpcGroup<infer R> ? string extends R["_tag"] ? never : R : never
