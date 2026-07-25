/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/eventlog/EventLog.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Covariant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Entry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Event<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventGroup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Item<R> = {
    readonly event: Event.AnyWithProps
    readonly context: Context.Context<R>
    readonly handler: (options: {
      readonly storeId: StoreId
      readonly payload: unknown
      readonly entry: Entry
      readonly conflicts: ReadonlyArray<{
        readonly entry: Entry
        readonly payload: unknown
      }>
    }) => Effect.Effect<unknown, unknown, R>
  }

export interface Handlers<
  R,
  Events extends Event.Any = never
> extends Pipeable {
  readonly [HandlersTypeId]: {
    _Events: Covariant<Events>
  }
  readonly group: EventGroup.AnyWithProps
  readonly handlers: Record.ReadonlyRecord<string, Handlers.Item<R>>
  readonly context: Context.Context<R>

  /**
   * Add the implementation for an `Event` to a `Handlers` group.
   */
  handle<Tag extends Event.Tag<Events>, R1>(
    name: Tag,
    handler: (options: {
      readonly storeId: StoreId
      readonly payload: Event.PayloadWithTag<Events, Tag>
      readonly entry: Entry
      readonly conflicts: ReadonlyArray<{
        readonly entry: Entry
        readonly payload: Event.PayloadWithTag<Events, Tag>
      }>
    }) => Effect.Effect<Event.SuccessWithTag<Events, Tag>, Event.ErrorWithTag<Events, Tag>, R1>
  ): Handlers<
    R | R1,
    Event.ExcludeTag<Events, Tag>
  >
}

export type ValidateReturn<A> = A extends (
    | Handlers<
      infer _R,
      infer _Events
    >
    | Effect.Effect<
      Handlers<
        infer _R,
        infer _Events
      >,
      infer _EX,
      infer _RX
    >
  ) ? [_Events] extends [never] ? A
    : `Event not handled: ${Event.Tag<_Events>}` :
    `Must return the implemented handlers`

export type Error<A> = A extends Effect.Effect<
    Handlers<
      infer _R,
      infer _Events
    >,
    infer _EX,
    infer _RX
  > ? _EX :
    never

export type Services<A> = A extends Handlers<
    infer _R,
    infer _Events
  > ? _R | Event.Services<_Events> :
    A extends Effect.Effect<
      Handlers<
        infer _R,
        infer _Events
      >,
      infer _EX,
      infer _RX
    > ? _R | _RX | Event.Services<_Events> :
    never
