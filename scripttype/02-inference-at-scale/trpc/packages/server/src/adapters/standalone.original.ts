/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/adapters/standalone.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeHTTPHandlerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeHTTPRequest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeHTTPResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type http<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type http2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StandaloneHandlerOptions<
  TRouter extends AnyRouter,
  TRequest extends NodeHTTPRequest,
  TResponse extends NodeHTTPResponse,
> = NodeHTTPHandlerOptions<TRouter, TRequest, TResponse> & {
  /**
   * The base path to handle requests for.
   * This will be sliced from the beginning of the request path
   * (Do not miss including the trailing slash)
   * @default '/'
   * @example '/trpc/'
   * @example '/trpc/api/'
   */
  basePath?: string;
};

export type CreateHTTPHandlerOptions<TRouter extends AnyRouter> =
  StandaloneHandlerOptions<TRouter, http.IncomingMessage, http.ServerResponse>;

export type CreateHTTP2HandlerOptions<TRouter extends AnyRouter> =
  StandaloneHandlerOptions<
    TRouter,
    http2.Http2ServerRequest,
    http2.Http2ServerResponse
  >;
