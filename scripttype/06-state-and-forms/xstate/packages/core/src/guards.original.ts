/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/guards.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Elements<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EventObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Identity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MachineContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NoRequiredParams<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ParameterizedObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type WithDynamicParams<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface GuardArgs<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject
> {
  context: TContext;
  event: TExpressionEvent;
}

export type GuardPredicate<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TGuard extends ParameterizedObject
> = {
  (args: GuardArgs<TContext, TExpressionEvent>, params: TParams): boolean;
  _out_TGuard?: TGuard;
};

export type SingleGuardArg<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TGuardArg
> = [TGuardArg] extends [{ type: string }]
  ? Identity<TGuardArg>
  : [TGuardArg] extends [string]
    ? TGuardArg
    : GuardPredicate<TContext, TExpressionEvent, TParams, ParameterizedObject>;

export type NormalizeGuardArg<TGuardArg> = TGuardArg extends { type: string }
  ? Identity<TGuardArg> & { params: unknown }
  : TGuardArg extends string
    ? { type: TGuardArg; params: undefined }
    : '_out_TGuard' extends keyof TGuardArg
      ? TGuardArg['_out_TGuard'] & ParameterizedObject
      : never;

export type NormalizeGuardArgArray<TArg extends unknown[]> = Elements<{
  [K in keyof TArg]: NormalizeGuardArg<TArg[K]>;
}>;

export type Guard<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TGuard extends ParameterizedObject
> =
  | NoRequiredParams<TGuard>
  | WithDynamicParams<TContext, TExpressionEvent, TGuard>
  | GuardPredicate<TContext, TExpressionEvent, TParams, TGuard>;
