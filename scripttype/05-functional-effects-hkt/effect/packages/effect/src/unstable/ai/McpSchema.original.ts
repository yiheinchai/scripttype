/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/ai/McpSchema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type RpcGroup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RequestEncoded<Group extends RpcGroup.Any> = RpcGroup.Rpcs<
  Group
> extends infer Rpc ? Rpc extends Rpc.Rpc<
    infer _Tag,
    infer _Payload,
    infer _Success,
    infer _Error,
    infer _Middleware
  > ? {
      readonly _tag: "Request"
      readonly id: string | number
      readonly method: _Tag
      readonly payload: _Payload["Encoded"]
    }
  : never
  : never

export type NotificationEncoded<Group extends RpcGroup.Any> = RpcGroup.Rpcs<
  Group
> extends infer Rpc ? Rpc extends Rpc.Rpc<
    infer _Tag,
    infer _Payload,
    infer _Success,
    infer _Error,
    infer _Middleware
  > ? {
      readonly _tag: "Notification"
      readonly method: _Tag
      readonly payload: _Payload["Encoded"]
    }
  : never
  : never

export type SuccessEncoded<Group extends RpcGroup.Any> = RpcGroup.Rpcs<
  Group
> extends infer Rpc ? Rpc extends Rpc.Rpc<
    infer _Tag,
    infer _Payload,
    infer _Success,
    infer _Error,
    infer _Middleware
  > ? {
      readonly _tag: "Success"
      readonly id: string | number
      readonly result: _Success["Encoded"]
    }
  : never
  : never

export type FailureEncoded<Group extends RpcGroup.Any> = RpcGroup.Rpcs<
  Group
> extends infer Rpc ? Rpc extends Rpc.Rpc<
    infer _Tag,
    infer _Payload,
    infer _Success,
    infer _Error,
    infer _Middleware
  > ? {
      readonly _tag: "Failure"
      readonly id: string | number
      readonly error: _Error["Encoded"]
    }
  : never
  : never
