/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/stateUtils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iterable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MachineContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateNode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StateNodeIterable<
  TContext extends MachineContext,
  TE extends EventObject
> = Iterable<StateNode<TContext, TE>>;
