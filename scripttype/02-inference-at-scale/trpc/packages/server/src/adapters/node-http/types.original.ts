/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/adapters/node-http/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type CreateContextCallback<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DistributiveOmit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HTTPBaseHandlerOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MaybePromise<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCRequestInfo<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Uint8Array<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type http<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type http2<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferRouterContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type NodeHTTPCreateContextFnOptions<TRequest, TResponse> = {
  req: TRequest;
  res: TResponse;
  info: TRPCRequestInfo;
};

export type NodeHTTPCreateContextFn<
  TRouter extends AnyRouter,
  TRequest,
  TResponse,
> = (
  opts: NodeHTTPCreateContextFnOptions<TRequest, TResponse>,
) => MaybePromise<inferRouterContext<TRouter>>;

export type NodeHTTPCreateContextOption<
  TRouter extends AnyRouter,
  TRequest,
  TResponse,
> = CreateContextCallback<
  inferRouterContext<TRouter>,
  NodeHTTPCreateContextFn<TRouter, TRequest, TResponse>
>;

export type NodeHTTPRequest = DistributiveOmit<
  http.IncomingMessage | http2.Http2ServerRequest,
  'socket'
> & {
  /**
   * Many adapters will add a `body` property to the incoming message and pre-parse the body
   */
  body?: unknown;
  /**
   * Socket is not always available in all deployments, so we need to make it optional
   * @see https://github.com/trpc/trpc/issues/6341
   * The socket object provided in the request does not fully implement the expected Node.js Socket interface.
   * @see https://github.com/trpc/trpc/pull/6358
   */
  socket?:
    | Partial<http.IncomingMessage['socket']>
    | Partial<http2.Http2ServerRequest['socket']>;
};

export type NodeHTTPResponse = DistributiveOmit<
  http.ServerResponse | http2.Http2ServerResponse,
  'write'
> & {
  /**
   * Force the partially-compressed response to be flushed to the client.
   *
   * Added by compression middleware
   * (depending on the environment,
   * e.g. Next 12 and below,
   * e.g. Express w/ `compression()`)
   */
  flush?: () => void;

  write: (chunk: string | Uint8Array) => boolean;
};

export type ConnectMiddleware<
  TRequest extends NodeHTTPRequest = NodeHTTPRequest,
  TResponse extends NodeHTTPResponse = NodeHTTPResponse,
> = (req: TRequest, res: TResponse, next: (err?: any) => any) => void;

export type NodeHTTPHandlerOptions<
  TRouter extends AnyRouter,
  TRequest extends NodeHTTPRequest,
  TResponse extends NodeHTTPResponse,
> = HTTPBaseHandlerOptions<TRouter, TRequest> &
  NodeHTTPCreateContextOption<TRouter, TRequest, TResponse> & {
    /**
     * By default, http `OPTIONS` requests are not handled, and CORS headers are not returned.
     *
     * This can be used to handle them manually or via the `cors` npm package: https://www.npmjs.com/package/cors
     *
     * ```ts
     * import cors from 'cors'
     *
     * nodeHTTPRequestHandler({
     *   middleware: cors()
     * })
     * ```
     *
     * You can also use it for other needs which a connect/node.js compatible middleware can solve,
     *  though you might wish to consider an alternative solution like the Express adapter if your needs are complex.
     */
    middleware?: ConnectMiddleware<TRequest, TResponse>;
    maxBodySize?: number;
  };

export type NodeHTTPRequestHandlerOptions<
  TRouter extends AnyRouter,
  TRequest extends NodeHTTPRequest,
  TResponse extends NodeHTTPResponse,
> = NodeHTTPHandlerOptions<TRouter, TRequest, TResponse> & {
  req: TRequest;
  res: TResponse;
  /**
   * The tRPC path to handle requests for
   * @example 'post.all'
   */
  path: string;
};
