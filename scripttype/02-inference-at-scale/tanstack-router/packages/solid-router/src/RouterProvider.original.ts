/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/solid-router/src/RouterProvider.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RouterProps<
  TRouter extends AnyRouter = RegisteredRouter,
  TDehydrated extends Record<string, any> = Record<string, any>,
> = Omit<
  RouterOptions<
    TRouter['routeTree'],
    NonNullable<TRouter['options']['trailingSlash']>,
    false,
    TRouter['history'],
    TDehydrated
  >,
  'context'
> & {
  router: TRouter
  context?: Partial<
    RouterOptions<
      TRouter['routeTree'],
      NonNullable<TRouter['options']['trailingSlash']>,
      false,
      TRouter['history'],
      TDehydrated
    >['context']
  >
}
