/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-ssr-query-core/src/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DehydrateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HydrateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RouterSsrQueryOptions<TRouter extends AnyRouter> = {
  router: TRouter
  queryClient: QueryClient
  dehydrateOptions?: DehydrateOptions
  hydrateOptions?: HydrateOptions

  /**
   * If `true`, the QueryClient will handle errors thrown by `redirect()` inside of mutations and queries.
   *
   * @default true
   * @link [Guide](https://tanstack.com/router/latest/docs/framework/react/api/router/redirectFunction)
   */
  handleRedirects?: boolean
}
