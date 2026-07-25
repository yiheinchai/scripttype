/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/httpBatchStreamLink.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPBatchLinkOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HTTPBatchStreamLinkOptions<TRoot extends AnyClientTypes> =
  HTTPBatchLinkOptions<TRoot> & {
    /**
     * Which header to use to signal the server that the client wants a streaming response.
     * - `'trpc-accept'` (default): sends `trpc-accept: application/jsonl` header
     * - `'accept'`: sends `Accept: application/jsonl` header, which can avoid CORS preflight for cross-origin streaming queries. Be aware that `application/jsonl` is not an official MIME type and so this is not completely spec-compliant - you should test that your infrastructure supports this value.
     * @default 'trpc-accept'
     */
    streamHeader?: 'trpc-accept' | 'accept';
  };
