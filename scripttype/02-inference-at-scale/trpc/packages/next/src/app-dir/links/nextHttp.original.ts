/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/next/src/app-dir/links/nextHttp.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPBatchLinkOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTTPLinkOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface NextLinkBaseOptions {
  revalidate?: number | false;
  batch?: boolean;
}

export type NextLinkSingleOptions<TRoot extends AnyRootTypes> = NextLinkBaseOptions &
  Omit<HTTPLinkOptions<TRoot>, 'fetch'> & {
    batch?: false;
  };

export type NextLinkBatchOptions<TRoot extends AnyRootTypes> = NextLinkBaseOptions &
  Omit<HTTPBatchLinkOptions<TRoot>, 'fetch'> & {
    batch: true;
  };
