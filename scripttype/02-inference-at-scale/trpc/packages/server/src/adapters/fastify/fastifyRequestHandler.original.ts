/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/adapters/fastify/fastifyRequestHandler.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FastifyReply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FastifyRequest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPBaseHandlerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeHTTPCreateContextOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FastifyHandlerOptions<
  TRouter extends AnyRouter,
  TRequest extends FastifyRequest,
  TResponse extends FastifyReply,
> = HTTPBaseHandlerOptions<TRouter, TRequest> &
  NodeHTTPCreateContextOption<TRouter, TRequest, TResponse>;

export type FastifyRequestHandlerOptions<
  TRouter extends AnyRouter,
  TRequest extends FastifyRequest,
  TResponse extends FastifyReply,
> = FastifyHandlerOptions<TRouter, TRequest, TResponse> & {
  req: TRequest;
  res: TResponse;
  path: string;
};
