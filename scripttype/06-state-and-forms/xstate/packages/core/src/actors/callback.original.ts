/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actors/callback.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActorLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ActorRefFromLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyActorSystem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyEventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonReducibleUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Snapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
