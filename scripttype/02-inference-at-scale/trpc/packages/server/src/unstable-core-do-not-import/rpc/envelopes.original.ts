/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/rpc/envelopes.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type JSONRPC2<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPC_ERROR_CODE_NUMBER<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface TRPCErrorShape<TData extends object = object> {
  code: TRPC_ERROR_CODE_NUMBER;
  message: string;
  data: TData;
}

export interface TRPCErrorResponse<
  TError extends TRPCErrorShape = TRPCErrorShape,
> extends JSONRPC2.ErrorResponse<TError> {}

export interface TRPCResult<TData = unknown> {
  data: TData;
  type?: 'data';
  /**
   * The id of the message to keep track of in case of a reconnect
   */
  id?: string;
}

export interface TRPCSuccessResponse<TData>
  extends JSONRPC2.ResultResponse<TRPCResult<TData>> {}

export type TRPCResponse<
  TData = unknown,
  TError extends TRPCErrorShape = TRPCErrorShape,
> = TRPCErrorResponse<TError> | TRPCSuccessResponse<TData>;

export interface TRPCResultMessage<TData>
  extends JSONRPC2.ResultResponse<
    | { type: 'started'; data?: never }
    | { type: 'stopped'; data?: never }
    | TRPCResult<TData>
  > {}

export type TRPCResponseMessage<
  TData = unknown,
  TError extends TRPCErrorShape = TRPCErrorShape,
> = { id: JSONRPC2.RequestId } & (
  | TRPCErrorResponse<TError>
  | TRPCResultMessage<TData>
);

export interface TRPCReconnectNotification
  extends JSONRPC2.BaseRequest<'reconnect'> {
  id: JSONRPC2.RequestId;
}

export type TRPCClientIncomingRequest = TRPCReconnectNotification;

export type TRPCClientIncomingMessage<
  TResult = unknown,
  TError extends TRPCErrorShape = TRPCErrorShape,
> = TRPCClientIncomingRequest | TRPCResponseMessage<TResult, TError>;
