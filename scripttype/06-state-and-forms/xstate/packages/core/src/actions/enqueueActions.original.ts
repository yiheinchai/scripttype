/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actions/enqueueActions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Action<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyActorRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyEventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Guard<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MachineContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParameterizedObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProvidedActor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type assign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type cancel<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type emit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type raise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type sendParent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type sendTo<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type spawnChild<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type stopChild<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface ActionEnqueuer<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject
> {
  (
    action: Action<
      TContext,
      TExpressionEvent,
      TEvent,
      undefined,
      TActor,
      TAction,
      TGuard,
      TDelay,
      TEmitted
    >
  ): void;
  assign: (
    ...args: Parameters<
      typeof assign<TContext, TExpressionEvent, undefined, TEvent, TActor>
    >
  ) => void;
  cancel: (
    ...args: Parameters<
      typeof cancel<TContext, TExpressionEvent, undefined, TEvent>
    >
  ) => void;
  raise: (
    ...args: Parameters<
      typeof raise<
        TContext,
        TExpressionEvent,
        TEvent,
        undefined,
        TDelay,
        TDelay
      >
    >
  ) => void;
  sendTo: <TTargetActor extends AnyActorRef>(
    ...args: Parameters<
      typeof sendTo<
        TContext,
        TExpressionEvent,
        undefined,
        TTargetActor,
        TEvent,
        TDelay,
        TDelay
      >
    >
  ) => void;
  sendParent: (
    ...args: Parameters<
      typeof sendParent<
        TContext,
        TExpressionEvent,
        undefined,
        AnyEventObject,
        TEvent,
        TDelay,
        TDelay
      >
    >
  ) => void;
  spawnChild: (
    ...args: Parameters<
      typeof spawnChild<TContext, TExpressionEvent, undefined, TEvent, TActor>
    >
  ) => void;
  stopChild: (
    ...args: Parameters<
      typeof stopChild<TContext, TExpressionEvent, undefined, TEvent>
    >
  ) => void;
  emit: (
    ...args: Parameters<
      typeof emit<TContext, TExpressionEvent, undefined, TEvent, TEmitted>
    >
  ) => void;
}

export interface CollectActionsArg<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject
> extends UnifiedArg<TContext, TExpressionEvent, TEvent> {
  check: (
    guard: Guard<TContext, TExpressionEvent, undefined, TGuard>
  ) => boolean;
  enqueue: ActionEnqueuer<
    TContext,
    TExpressionEvent,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >;
}

export type CollectActions<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject
> = (
  {
    context,
    event,
    check,
    enqueue,
    self
  }: CollectActionsArg<
    TContext,
    TExpressionEvent,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >,
  params: TParams
) => void;
