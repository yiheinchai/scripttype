/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/stream/tracked.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type trackedSymbol<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TrackedId = string & {
  __brand: 'TrackedId';
};

export type TrackedEnvelope<TData> = [TrackedId, TData, typeof trackedSymbol];

export interface TrackedData<TData> {
  /**
   * The id of the message to keep track of in case the connection gets lost
   */
  id: string;
  /**
   * The data field of the message
   */
  data: TData;
}

export type inferTrackedOutput<TData> =
  TData extends TrackedEnvelope<infer $Data> ? TrackedData<$Data> : TData;
