/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/http/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Dict<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Headers<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ProcedureType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type URL<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferRouterContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferRouterError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TRPCAcceptHeader = 'application/jsonl';

export interface TRPCRequestInfoProcedureCall {
  path: string;
  /**
   * Read the raw input (deduped and memoized)
   */
  getRawInput: () => Promise<unknown>;
  /**
   * Get already parsed inputs - won't trigger reading the body or parsing the inputs
   */
  result: () => unknown;
  /**
   * The procedure being called, `null` if not found
   * @internal
   */
  procedure: AnyProcedure | null;
  /**
   * The index of this call in a batch request.
   */
  batchIndex: number;
}

export interface TRPCRequestInfo {
  /**
   * The `trpc-accept` header
   */
  accept: TRPCAcceptHeader | null;
  /**
   * The type of the request
   */
  type: ProcedureType | 'unknown';
  /**
   * If the content type handler has detected that this is a batch call
   */
  isBatchCall: boolean;
  /**
   * The calls being made
   */
  calls: TRPCRequestInfoProcedureCall[];
  /**
   * Connection params when using `httpSubscriptionLink` or `createWSClient`
   */
  connectionParams: Dict<string> | null;
  /**
   * Signal when the request is aborted
   * Can be used to abort async operations during the request, e.g. `fetch()`-requests
   */
  signal: AbortSignal;
  /**
   * The URL of the request if available
   */
  url: URL | null;
}

export type HTTPHeaders = Dict<string[] | string>;

export interface ResponseMeta {
  status?: number;
  headers?: Headers | HTTPHeaders;
}

export type ResponseMetaFn<TRouter extends AnyRouter> = (opts: {
  data: TRPCResponse<unknown, inferRouterError<TRouter>>[];
  ctx?: inferRouterContext<TRouter>;
  /**
   * The different tRPC paths requested
   * @deprecated use `info` instead, this will be removed in v12
   **/
  paths: readonly string[] | undefined;
  info: TRPCRequestInfo | undefined;
  type: ProcedureType | 'unknown';
  errors: TRPCError[];
  /**
   * `true` if the `ResponseMeta` is being generated without knowing the response data (e.g. for streamed requests).
   */
  eagerGeneration: boolean;
}) => ResponseMeta;

export type ResolveHTTPRequestOptionsContextFn<TRouter extends AnyRouter> =
  (opts: { info: TRPCRequestInfo }) => Promise<inferRouterContext<TRouter>>;

export interface HTTPErrorHandlerOptions<TRouter extends AnyRouter, TRequest>
  extends ErrorHandlerOptions<inferRouterContext<TRouter>> {
  req: TRequest;
}

export type HTTPErrorHandler<TRouter extends AnyRouter, TRequest> = (
  opts: HTTPErrorHandlerOptions<TRouter, TRequest>,
) => void;
