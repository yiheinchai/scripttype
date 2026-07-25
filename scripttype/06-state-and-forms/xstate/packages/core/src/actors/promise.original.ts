/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actors/promise.ts, for comparison with the ScriptType alongside.
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
type Snapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PromiseSnapshot<TOutput, TInput> = Snapshot<TOutput> & {
  input: TInput | undefined;
};

export type PromiseActorLogic<
  TOutput,
  TInput = unknown,
  TEmitted extends EventObject = EventObject
> = ActorLogic<
  PromiseSnapshot<TOutput, TInput>,
  { type: string; [k: string]: unknown },
  TInput, // input
  AnyActorSystem,
  TEmitted // TEmitted
>;

export type PromiseActorRef<TOutput> = ActorRefFromLogic<
  PromiseActorLogic<TOutput, unknown>
>;
