/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/State.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyActorRef<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EventObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MachineContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MetaObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NonNullable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StateSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StateValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ToTestStateValue<TStateValue extends StateValue> =
  TStateValue extends string
    ? TStateValue
    : IsNever<keyof TStateValue> extends true
      ? never
      :
          | keyof TStateValue
          | {
              [K in keyof TStateValue]?: ToTestStateValue<
                NonNullable<TStateValue[K]>
              >;
            };

export interface ActiveMachineSnapshot<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TChildren extends Record<string, AnyActorRef | undefined>,
  TStateValue extends StateValue,
  TTag extends string,
  TOutput,
  TMeta extends MetaObject,
  TStateSchema extends StateSchema
> extends MachineSnapshotBase<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TStateSchema
  > {
  status: 'active';
  output: undefined;
  error: undefined;
}

export interface DoneMachineSnapshot<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TChildren extends Record<string, AnyActorRef | undefined>,
  TStateValue extends StateValue,
  TTag extends string,
  TOutput,
  TMeta extends MetaObject,
  TStateSchema extends StateSchema
> extends MachineSnapshotBase<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TStateSchema
  > {
  status: 'done';
  output: TOutput;
  error: undefined;
}

export interface ErrorMachineSnapshot<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TChildren extends Record<string, AnyActorRef | undefined>,
  TStateValue extends StateValue,
  TTag extends string,
  TOutput,
  TMeta extends MetaObject,
  TStateSchema extends StateSchema
> extends MachineSnapshotBase<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TStateSchema
  > {
  status: 'error';
  output: undefined;
  error: unknown;
}

export interface StoppedMachineSnapshot<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TChildren extends Record<string, AnyActorRef | undefined>,
  TStateValue extends StateValue,
  TTag extends string,
  TOutput,
  TMeta extends MetaObject,
  TStateSchema extends StateSchema
> extends MachineSnapshotBase<
    TContext,
    TEvent,
    TChildren,
    TStateValue,
    TTag,
    TOutput,
    TMeta,
    TStateSchema
  > {
  status: 'stopped';
  output: undefined;
  error: undefined;
}

export type MachineSnapshot<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TChildren extends Record<string, AnyActorRef | undefined>,
  TStateValue extends StateValue,
  TTag extends string,
  TOutput,
  TMeta extends MetaObject,
  TStateSchema extends StateSchema
> =
  | ActiveMachineSnapshot<
      TContext,
      TEvent,
      TChildren,
      TStateValue,
      TTag,
      TOutput,
      TMeta,
      TStateSchema
    >
  | DoneMachineSnapshot<
      TContext,
      TEvent,
      TChildren,
      TStateValue,
      TTag,
      TOutput,
      TMeta,
      TStateSchema
    >
  | ErrorMachineSnapshot<
      TContext,
      TEvent,
      TChildren,
      TStateValue,
      TTag,
      TOutput,
      TMeta,
      TStateSchema
    >
  | StoppedMachineSnapshot<
      TContext,
      TEvent,
      TChildren,
      TStateValue,
      TTag,
      TOutput,
      TMeta,
      TStateSchema
    >;
