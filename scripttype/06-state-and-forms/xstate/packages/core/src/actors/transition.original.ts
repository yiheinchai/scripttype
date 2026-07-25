/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actors/transition.ts, for comparison with the ScriptType alongside.
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
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonReducibleUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Snapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TransitionSnapshot<TContext> = Snapshot<undefined> & {
  context: TContext;
};

export type TransitionActorLogic<
  TContext,
  TEvent extends EventObject,
  TInput extends NonReducibleUnknown,
  TEmitted extends EventObject = EventObject
> = ActorLogic<
  TransitionSnapshot<TContext>,
  TEvent,
  TInput,
  AnyActorSystem,
  TEmitted
>;

export type TransitionActorRef<
  TContext,
  TEvent extends EventObject
> = ActorRefFromLogic<
  TransitionActorLogic<TransitionSnapshot<TContext>, TEvent, unknown>
>;
