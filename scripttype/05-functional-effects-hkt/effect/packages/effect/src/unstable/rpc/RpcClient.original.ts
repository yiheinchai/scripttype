/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/rpc/RpcClient.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cause<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Headers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Queue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Rpc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RpcGroup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RpcSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Scope<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Stream<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Struct<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RpcClient<Rpcs extends Rpc.Any, E = never> = Struct.Simplify<RpcClient.From<Rpcs, E>>

export type From<Rpcs extends Rpc.Any, E = never> = {
    readonly [Current in Rpcs as Current["_tag"]]: <
      const AsQueue extends boolean = false,
      const Discard = false
    >(
      input: Rpc.PayloadConstructor<Current>,
      options?: Rpc.Success<Current> extends Stream.Stream<infer _A, infer _E, infer _R> ? {
          readonly asQueue?: AsQueue | undefined
          readonly streamBufferSize?: number | undefined
          readonly headers?: Headers.Input | undefined
          readonly context?: Context.Context<never> | undefined
        } :
        {
          readonly headers?: Headers.Input | undefined
          readonly context?: Context.Context<never> | undefined
          readonly discard?: Discard | undefined
        }
    ) => Current extends Rpc.Rpc<
      infer _Tag,
      infer _Payload,
      infer _Success,
      infer _Error,
      infer _Middleware,
      infer _Requires
    > ? [_Success] extends [RpcSchema.Stream<infer _A, infer _E>] ? AsQueue extends true ? Effect.Effect<
            Queue.Dequeue<
              _A["Type"],
              _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"] | Cause.Done
            >,
            never,
            | Scope.Scope
            | _Payload["EncodingServices"]
            | _Success["DecodingServices"]
            | _Error["DecodingServices"]
            | _Middleware["error"]["DecodingServices"]
          >
        : Stream.Stream<
          _A["Type"],
          _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"],
          | _Payload["EncodingServices"]
          | _Success["DecodingServices"]
          | _Error["DecodingServices"]
          | _Middleware["error"]["DecodingServices"]
        >
      : Effect.Effect<
        Discard extends true ? void : _Success["Type"],
        | (Discard extends true ? never : _Error["Type"])
        | E
        | _Middleware["error"]["Type"]
        | _Middleware["~ClientError"],
        | _Payload["EncodingServices"]
        | _Success["DecodingServices"]
        | _Error["DecodingServices"]
        | _Middleware["error"]["DecodingServices"]
      > :
      never
  }

export type Flat<Rpcs extends Rpc.Any, E = never> = <
    const Tag extends Rpcs["_tag"],
    const AsQueue extends boolean = false,
    const Discard = false
  >(
    tag: Tag,
    payload: Rpc.PayloadConstructor<Rpc.ExtractTag<Rpcs, Tag>>,
    options?: Rpc.Success<Rpc.ExtractTag<Rpcs, Tag>> extends Stream.Stream<infer _A, infer _E, infer _R> ? {
        readonly asQueue?: AsQueue | undefined
        readonly streamBufferSize?: number | undefined
        readonly headers?: Headers.Input | undefined
        readonly context?: Context.Context<never> | undefined
      } :
      {
        readonly headers?: Headers.Input | undefined
        readonly context?: Context.Context<never> | undefined
        readonly discard?: Discard | undefined
      }
  ) => Rpc.ExtractTag<Rpcs, Tag> extends Rpc.Rpc<
    infer _Tag,
    infer _Payload,
    infer _Success,
    infer _Error,
    infer _Middleware,
    infer _Requires
  > ? [_Success] extends [RpcSchema.Stream<infer _A, infer _E>] ? AsQueue extends true ? Effect.Effect<
          Queue.Dequeue<
            _A["Type"],
            _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"]
          >,
          never,
          | Scope.Scope
          | _Payload["EncodingServices"]
          | _Success["DecodingServices"]
          | _Error["DecodingServices"]
          | _Middleware["error"]["DecodingServices"]
        >
      : Stream.Stream<
        _A["Type"],
        _E["Type"] | _Error["Type"] | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"],
        | _Payload["EncodingServices"]
        | _Success["DecodingServices"]
        | _Error["DecodingServices"]
        | _Middleware["error"]["DecodingServices"]
      >
    : Effect.Effect<
      Discard extends true ? void : _Success["Type"],
      (Discard extends true ? never : _Error["Type"]) | E | _Middleware["error"]["Type"] | _Middleware["~ClientError"],
      | _Payload["EncodingServices"]
      | _Success["DecodingServices"]
      | _Error["DecodingServices"]
      | _Middleware["error"]["DecodingServices"]
    > :
    never

export type FromGroup<Group, E = never> = RpcClient<RpcGroup.Rpcs<Group>, E>
