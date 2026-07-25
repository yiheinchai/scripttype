/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/actions/stopChild.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActionArgs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyActorRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MachineContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParameterizedObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ResolvableActorRef<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject
> =
  | string
  | AnyActorRef
  | ((
      args: ActionArgs<TContext, TExpressionEvent, TEvent>,
      params: TParams
    ) => AnyActorRef | string);
