/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/httpSubscriptionLink.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventSource<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventSourceLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Operation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UrlOptionsWithConnectionParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HTTPSubscriptionLinkOptions<
  TRoot extends AnyClientTypes,
  TEventSource extends EventSourceLike.AnyConstructor = typeof EventSource,
> = {
  /**
   * EventSource ponyfill
   */
  EventSource?: TEventSource;
  /**
   * EventSource options or a callback that returns them
   */
  eventSourceOptions?:
    | EventSourceLike.InitDictOf<TEventSource>
    | ((opts: {
        op: Operation;
      }) =>
        | EventSourceLike.InitDictOf<TEventSource>
        | Promise<EventSourceLike.InitDictOf<TEventSource>>);
} & TransformerOptions<TRoot> &
  UrlOptionsWithConnectionParams;
