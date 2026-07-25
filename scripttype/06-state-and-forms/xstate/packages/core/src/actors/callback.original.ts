/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actors/callback.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActorLogic<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ActorRefFromLogic<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyActorSystem<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyEventObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EventObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NonReducibleUnknown<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Snapshot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type CallbackSnapshot<TInput> = Snapshot<undefined> & {
  input: TInput;
};

export type CallbackActorLogic<
  TEvent extends EventObject,
  TInput = NonReducibleUnknown,
  TEmitted extends EventObject = EventObject
> = ActorLogic<
  CallbackSnapshot<TInput>,
  TEvent,
  TInput,
  AnyActorSystem,
  TEmitted
>;

export type CallbackActorRef<
  TEvent extends EventObject,
  TInput = NonReducibleUnknown
> = ActorRefFromLogic<CallbackActorLogic<TEvent, TInput>>;

export type Receiver<TEvent extends EventObject> = (
  listener: {
    bivarianceHack(event: TEvent): void;
  }['bivarianceHack']
) => void;

export type CallbackLogicFunction<
  TEvent extends EventObject = AnyEventObject,
  TSentEvent extends EventObject = AnyEventObject,
  TInput = NonReducibleUnknown,
  TEmitted extends EventObject = EventObject
> = ({
  input,
  system,
  self,
  sendBack,
  receive,
  emit
}: {
  /**
   * Data that was provided to the callback actor
   *
   * @see {@link https://stately.ai/docs/input | Input docs}
   */
  input: TInput;
  /** The actor system to which the callback actor belongs */
  system: AnyActorSystem;
  /** The parent actor of the callback actor */
  self: CallbackActorRef<TEvent>;
  /** A function that can send events back to the parent actor */
  sendBack: (event: TSentEvent) => void;
  /**
   * A function that can be called with a listener function argument; the
   * listener is then called whenever events are received by the callback actor
   */
  receive: Receiver<TEvent>;
  emit: (emitted: TEmitted) => void;
}) => (() => void) | void;
