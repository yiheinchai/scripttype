/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/eventlog/EventGroup.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Event<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TypeId = "~effect/eventlog/EventGroup"

export interface EventGroup<
  out Events extends Event.Any = Event.Any
> extends Pipeable {
  readonly [TypeId]: TypeId
  readonly events: Record.ReadonlyRecord<string, Events>

  /**
   * Add an `Event` to the `EventGroup`.
   */
  add<
    Tag extends string,
    Payload extends Schema.Top = typeof Schema.Void,
    Success extends Schema.Top = typeof Schema.Void,
    Error extends Schema.Top = typeof Schema.Never
  >(options: {
    readonly tag: Tag
    readonly primaryKey: (payload: Schema.Schema.Type<Payload>) => string
    readonly payload?: Payload
    readonly success?: Success
    readonly error?: Error
  }): EventGroup<Events | Event.Event<Tag, Payload, Success, Error>>

  /**
   * Add an error schema to all the events in the `EventGroup`.
   */
  addError<Error extends Schema.Top>(error: Error): EventGroup<Event.AddError<Events, Error>>
}

export type ToService<A> = A extends EventGroup<infer _Events> ? Event.ToService<_Events>
  : never

export type Events<Group> = Group extends EventGroup<infer _Events> ? _Events
  : never

export type ServicesClient<Group> = Event.ServicesClient<Events<Group>>

export type ServicesServer<Group> = Event.ServicesServer<Events<Group>>
