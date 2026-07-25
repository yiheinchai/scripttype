/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cluster/EntityProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AlreadyProcessingMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EntityId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HttpApiEndpoint<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MailboxFull<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PersistenceError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Rpc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ConvertRpcs<Rpcs extends Rpc.Any, Prefix extends string> = Rpcs extends Rpc.Rpc<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error,
  infer _Middleware,
  infer _Requires
> ?
    | Rpc.Rpc<
      `${Prefix}.${_Tag}`,
      Schema.Struct<{
        entityId: typeof Schema.String
        payload: _Payload
      }>,
      _Success,
      Schema.Codec<
        _Error["Type"] | MailboxFull | AlreadyProcessingMessage | PersistenceError,
        | _Error["Encoded"]
        | typeof MailboxFull["Encoded"]
        | typeof AlreadyProcessingMessage["Encoded"]
        | typeof PersistenceError["Encoded"],
        _Error["DecodingServices"],
        _Error["EncodingServices"]
      >
    >
    | Rpc.Rpc<
      `${Prefix}.${_Tag}Discard`,
      Schema.Struct<{
        entityId: typeof Schema.String
        payload: _Payload
      }>,
      typeof Schema.Void,
      Schema.Union<[
        typeof MailboxFull,
        typeof AlreadyProcessingMessage,
        typeof PersistenceError
      ]>
    >
  : never

export type ConvertHttpApi<Rpcs extends Rpc.Any> = Rpcs extends Rpc.Rpc<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error,
  infer _Middleware,
  infer _Requires
> ?
    | HttpApiEndpoint.HttpApiEndpoint<
      _Tag,
      "POST",
      `/${Lowercase<_Tag>}/:entityId`,
      Schema.Struct<{ entityId: typeof EntityId }>,
      never,
      _Payload,
      never,
      _Success,
      | _Error
      | typeof MailboxFull
      | typeof AlreadyProcessingMessage
      | typeof PersistenceError
    >
    | HttpApiEndpoint.HttpApiEndpoint<
      `${_Tag}Discard`,
      "POST",
      `/${Lowercase<_Tag>}/:entityId/discard`,
      Schema.Struct<{ entityId: typeof EntityId }>,
      never,
      _Payload,
      never,
      Schema.Void,
      typeof MailboxFull | typeof AlreadyProcessingMessage | typeof PersistenceError
    >
  : never
