/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actions/spawnChild.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyActorLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConditionalRequired<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InputFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsLiteralString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNotNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MachineContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Mapper<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProvidedActor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequiredActorOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnifiedArg<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
