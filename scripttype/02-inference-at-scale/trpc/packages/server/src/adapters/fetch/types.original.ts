/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/adapters/fetch/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateContextCallback<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPBaseHandlerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Headers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Request<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCRequestInfo<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferRouterContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FetchCreateContextFnOptions = {
  req: Request;
  resHeaders: Headers;
  info: TRPCRequestInfo;
};

export type FetchCreateContextFn<TRouter extends AnyRouter> = (
  opts: FetchCreateContextFnOptions,
) => inferRouterContext<TRouter> | Promise<inferRouterContext<TRouter>>;

export type FetchCreateContextOption<TRouter extends AnyRouter> =
  CreateContextCallback<
    inferRouterContext<TRouter>,
    FetchCreateContextFn<TRouter>
  >;

export type FetchHandlerOptions<TRouter extends AnyRouter> =
  FetchCreateContextOption<TRouter> &
    HTTPBaseHandlerOptions<TRouter, Request> & {
      req: Request;
      endpoint: string;
    };

export type FetchHandlerRequestOptions<TRouter extends AnyRouter> =
  HTTPBaseHandlerOptions<TRouter, Request> &
    CreateContextCallback<
      inferRouterContext<TRouter>,
      FetchCreateContextFn<TRouter>
    > & {
      req: Request;
      endpoint: string;
    };
