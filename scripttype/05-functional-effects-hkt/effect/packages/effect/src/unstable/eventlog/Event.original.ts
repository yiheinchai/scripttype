/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/eventlog/Event.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Msgpack<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TypeId = "~effect/eventlog/Event"

export interface Event<
  out Tag extends string,
  in out Payload extends Schema.Top = typeof Schema.Void,
  in out Success extends Schema.Top = typeof Schema.Void,
  in out Error extends Schema.Top = typeof Schema.Never
> {
  readonly [TypeId]: TypeId
  readonly tag: Tag
  readonly primaryKey: (payload: Schema.Schema.Type<Payload>) => string
  readonly payload: Payload
  readonly payloadMsgPack: Msgpack.schema<Payload>
  readonly success: Success
  readonly error: Error
}

export interface EventHandler<in out Tag extends string> {
  readonly _: unique symbol
  readonly tag: Tag
}

export type ToService<A> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? EventHandler<_Tag> :
  never

export type Tag<A> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? _Tag :
  never

export interface Any {
  readonly [TypeId]: TypeId
  readonly tag: string
  readonly primaryKey: (payload: any) => string
  readonly payload: Schema.Top
  readonly payloadMsgPack: Msgpack.schema<Schema.Top>
  readonly success: Schema.Top
  readonly error: Schema.Top
}

export type ErrorSchema<A extends Any> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? _Error
  : never

export type Error<A extends Any> = Schema.Schema.Type<ErrorSchema<A>>

export type AddError<A extends Any, Error extends Schema.Top> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? Event<_Tag, _Payload, _Success, _Error | Error>
  : never

export type PayloadSchema<A extends Any> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? _Payload
  : never

export type PayloadSchemaWithTag<A extends Any, Tag extends string> = A extends Event<
  Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? _Payload
  : never

export type Payload<A extends Any> = Schema.Schema.Type<PayloadSchema<A>>

export type TaggedPayload<A extends Any> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? {
    readonly _tag: _Tag
    readonly payload: Schema.Schema.Type<_Payload>
  }
  : never

export type SuccessSchema<A extends Any> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ? _Success
  : never

export type Success<A extends Any> = Schema.Schema.Type<SuccessSchema<A>>

export type ServicesClient<A> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ?
    | _Payload["EncodingServices"]
    | _Success["DecodingServices"]
    | _Error["DecodingServices"]
  : never

export type ServicesServer<A> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ?
    | _Payload["DecodingServices"]
    | _Success["EncodingServices"]
    | _Error["EncodingServices"]
  : never

export type Services<A> = A extends Event<
  infer _Tag,
  infer _Payload,
  infer _Success,
  infer _Error
> ?
    | _Payload["DecodingServices"]
    | _Success["EncodingServices"]
    | _Error["EncodingServices"]
    | _Payload["EncodingServices"]
    | _Success["DecodingServices"]
    | _Error["DecodingServices"]
  : never

export type WithTag<Events extends Any, Tag extends string> = Extract<Events, { readonly tag: Tag }>

export type ExcludeTag<Events extends Any, Tag extends string> = Exclude<Events, { readonly tag: Tag }>

export type PayloadWithTag<Events extends Any, Tag extends string> = Payload<WithTag<Events, Tag>>

export type SuccessWithTag<Events extends Any, Tag extends string> = Success<WithTag<Events, Tag>>

export type ErrorWithTag<Events extends Any, Tag extends string> = Error<WithTag<Events, Tag>>

export type ServicesClientWithTag<Events extends Any, Tag extends string> = ServicesClient<WithTag<Events, Tag>>
