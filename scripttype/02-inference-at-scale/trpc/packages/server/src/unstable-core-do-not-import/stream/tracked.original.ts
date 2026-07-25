/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/stream/tracked.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type trackedSymbol<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
