/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cluster/EntityProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AlreadyProcessingMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EntityId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HttpApiEndpoint<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Lowercase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MailboxFull<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PersistenceError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Rpc<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
