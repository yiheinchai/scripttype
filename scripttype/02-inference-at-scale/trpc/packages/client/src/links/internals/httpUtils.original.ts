/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/internals/httpUtils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FetchEsque<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type URL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HTTPLinkBaseOptions<
  TRoot extends Pick<AnyClientTypes, 'transformer'>,
> = {
  url: string | URL;
  /**
   * Add ponyfill for fetch
   */
  fetch?: FetchEsque;
  /**
   * Send all requests `as POST`s requests regardless of the procedure type
   * The HTTP handler must separately allow overriding the method. See:
   * @see https://trpc.io/docs/rpc
   */
  methodOverride?: 'POST';
} & TransformerOptions<TRoot>;
