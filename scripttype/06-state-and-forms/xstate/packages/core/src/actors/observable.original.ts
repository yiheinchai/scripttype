/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actors/observable.ts, for comparison with the ScriptType alongside.
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
type Subscription<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ObservableSnapshot<
  TContext,
  TInput extends NonReducibleUnknown
> = Snapshot<undefined> & {
  context: TContext | undefined;
  input: TInput | undefined;
  _subscription: Subscription | undefined;
};

export type ObservableActorLogic<
  TContext,
  TInput extends NonReducibleUnknown,
  TEmitted extends EventObject = EventObject
> = ActorLogic<
  ObservableSnapshot<TContext, TInput>,
  { type: string; [k: string]: unknown },
  TInput,
  AnyActorSystem,
  TEmitted
>;

export type ObservableActorRef<TContext> = ActorRefFromLogic<
  ObservableActorLogic<TContext, any>
>;
