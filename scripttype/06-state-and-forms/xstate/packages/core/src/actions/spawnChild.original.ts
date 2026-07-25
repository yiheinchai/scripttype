/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actions/spawnChild.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyActorLogic<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ConditionalRequired<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type EventObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InputFrom<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsLiteralString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNotNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MachineContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Mapper<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ProvidedActor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequiredActorOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnifiedArg<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ResolvableActorId<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TId extends string | undefined
> = TId | ((args: UnifiedArg<TContext, TExpressionEvent, TEvent>) => TId);

export interface SpawnActionOptions<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor
> {
  id?: ResolvableActorId<TContext, TExpressionEvent, TEvent, TActor['id']>;
  systemId?: string;
  input?:
    | Mapper<TContext, TEvent, InputFrom<TActor['logic']>, TEvent>
    | InputFrom<TActor['logic']>;
  syncSnapshot?: boolean;
}

export type DistributeActors<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor
> =
  | (TActor extends any
      ? ConditionalRequired<
          [
            src: TActor['src'],
            options?: SpawnActionOptions<
              TContext,
              TExpressionEvent,
              TEvent,
              TActor
            > & {
              [K in RequiredActorOptions<TActor>]: unknown;
            }
          ],
          IsNotNever<RequiredActorOptions<TActor>>
        >
      : never)
  | [
      src: AnyActorLogic,
      options?: SpawnActionOptions<
        TContext,
        TExpressionEvent,
        TEvent,
        ProvidedActor
      > & { id?: never }
    ];

export type SpawnArguments<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor
> =
  IsLiteralString<TActor['src']> extends true
    ? DistributeActors<TContext, TExpressionEvent, TEvent, TActor>
    : [
        src: string | AnyActorLogic,
        options?: {
          id?: ResolvableActorId<TContext, TExpressionEvent, TEvent, string>;
          systemId?: string;
          input?: unknown;
          syncSnapshot?: boolean;
        }
      ];
