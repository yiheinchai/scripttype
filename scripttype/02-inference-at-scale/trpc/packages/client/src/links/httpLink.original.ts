/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/httpLink.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPHeaders<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPLinkBaseOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Operation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HTTPLinkOptions<TRoot extends AnyClientTypes> =
  HTTPLinkBaseOptions<TRoot> & {
    /**
     * Headers to be set on outgoing requests or a callback that of said headers
     * @see http://trpc.io/docs/client/headers
     */
    headers?:
      | HTTPHeaders
      | ((opts: { op: Operation }) => HTTPHeaders | Promise<HTTPHeaders>);
  };
