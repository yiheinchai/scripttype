/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/localLink.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorHandlerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferRouterContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type LocalLinkOptions<TRouter extends AnyRouter> = {
  router: TRouter;
  createContext: () => Promise<inferRouterContext<TRouter>>;
  onError?: (opts: ErrorHandlerOptions<inferRouterContext<TRouter>>) => void;
} & TransformerOptions<inferClientTypes<TRouter>>;
