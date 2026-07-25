/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/stream/sse.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EventSourceLike<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferTrackedOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface ConsumerConfig {
  data: unknown;
  error: unknown;
  EventSource: EventSourceLike.AnyConstructor;
}

export interface ConsumerStreamResultData<TConfig extends ConsumerConfig>
  extends ConsumerStreamResultBase<TConfig> {
  type: 'data';
  data: inferTrackedOutput<TConfig['data']>;
}

export interface ConsumerStreamResultError<TConfig extends ConsumerConfig>
  extends ConsumerStreamResultBase<TConfig> {
  type: 'serialized-error';
  error: TConfig['error'];
}

export interface ConsumerStreamResultConnecting<TConfig extends ConsumerConfig>
  extends ConsumerStreamResultBase<TConfig> {
  type: 'connecting';
  event: EventSourceLike.EventOf<TConfig['EventSource']> | null;
}

export interface ConsumerStreamResultTimeout<TConfig extends ConsumerConfig>
  extends ConsumerStreamResultBase<TConfig> {
  type: 'timeout';
  ms: number;
}

export interface ConsumerStreamResultPing<TConfig extends ConsumerConfig>
  extends ConsumerStreamResultBase<TConfig> {
  type: 'ping';
}

export interface SSEClientOptions {
  /**
   * Timeout and reconnect after inactivity in milliseconds
   * @default undefined
   */
  reconnectAfterInactivityMs?: number;
}

export interface ConsumerStreamResultConnected<TConfig extends ConsumerConfig>
  extends ConsumerStreamResultBase<TConfig> {
  type: 'connected';
  options: SSEClientOptions;
}

export type ConsumerStreamResult<TConfig extends ConsumerConfig> =
  | ConsumerStreamResultData<TConfig>
  | ConsumerStreamResultError<TConfig>
  | ConsumerStreamResultConnecting<TConfig>
  | ConsumerStreamResultTimeout<TConfig>
  | ConsumerStreamResultPing<TConfig>
  | ConsumerStreamResultConnected<TConfig>;
