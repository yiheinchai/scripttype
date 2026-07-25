/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/next/src/createTRPCNext.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateReactUtils<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DecorateRouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NextPageContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProtectedIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUseQueries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUseSuspenseQueries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type withTRPC<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface CreateTRPCNextBase<
  TRouter extends AnyRouter,
  TSSRContext extends NextPageContext,
> {
  /**
   * @deprecated renamed to `useUtils` and will be removed in a future tRPC version
   *
   * @see https://trpc.io/docs/v11/client/react/useUtils
   */
  useContext(): CreateReactUtils<TRouter, TSSRContext>;
  /**
   * @see https://trpc.io/docs/v11/client/react/useUtils
   */
  useUtils(): CreateReactUtils<TRouter, TSSRContext>;
  withTRPC: ReturnType<typeof withTRPC<TRouter, TSSRContext>>;
  useQueries: TRPCUseQueries<TRouter>;
  useSuspenseQueries: TRPCUseSuspenseQueries<TRouter>;
}

export type CreateTRPCNext<
  TRouter extends AnyRouter,
  TSSRContext extends NextPageContext,
> = ProtectedIntersection<
  CreateTRPCNextBase<TRouter, TSSRContext>,
  DecorateRouterRecord<
    TRouter['_def']['_config']['$types'],
    TRouter['_def']['record']
  >
>;
