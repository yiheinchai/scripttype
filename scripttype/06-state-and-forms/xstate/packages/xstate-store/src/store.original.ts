/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store/src/store.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventPayloadMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreAssigner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TransitionsFromEventPayloadMap<
  TEventPayloadMap extends EventPayloadMap,
  TContext extends StoreContext,
  TEmitted extends EventObject
> = {
  [K in keyof TEventPayloadMap & string]?: StoreAssigner<
    TContext,
    {
      type: K;
    } & TEventPayloadMap[K],
    TEmitted,
    TEventPayloadMap
  >;
};
