/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/internals/subscriptions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface ConnectionIdleState extends ConnectionStateBase<null> {
  state: 'idle';
}

export interface ConnectionConnectingState<TError>
  extends ConnectionStateBase<TError | null> {
  state: 'connecting';
}

export interface ConnectionPendingState extends ConnectionStateBase<null> {
  state: 'pending';
}

export type TRPCConnectionState<TError> =
  | ConnectionIdleState
  | ConnectionConnectingState<TError>
  | ConnectionPendingState;
