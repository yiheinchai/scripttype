/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/next/src/withTRPC.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateTRPCClientOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateTRPCReactOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateTRPCReactQueryClientConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NextComponentType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NextPageContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResponseMeta<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUntypedClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type WithTRPCConfig<TRouter extends AnyRouter> =
  CreateTRPCClientOptions<TRouter> &
    CreateTRPCReactQueryClientConfig & {
      abortOnUnmount?: boolean;
    };

export type WithTRPCOptions<TRouter extends AnyRouter> =
  CreateTRPCReactOptions<TRouter> & {
    config: (info: { ctx?: NextPageContext }) => WithTRPCConfig<TRouter>;
  } & TransformerOptions<inferClientTypes<TRouter>>;

export type TRPCPrepassHelper = (opts: {
  parent: WithTRPCSSROptions<AnyRouter>;
  WithTRPC: NextComponentType<any, any, any>;
  AppOrPage: NextComponentType<any, any, any>;
}) => void;

export type WithTRPCSSROptions<TRouter extends AnyRouter> =
  WithTRPCOptions<TRouter> & {
    /**
     * If you enable this, you also need to add a `ssrPrepass`-prop
     * @see https://trpc.io/docs/client/nextjs/ssr
     */
    ssr:
      | true
      | ((opts: { ctx: NextPageContext }) => boolean | Promise<boolean>);
    responseMeta?: (opts: {
      ctx: NextPageContext;
      clientErrors: TRPCClientError<TRouter>[];
    }) => ResponseMeta;
    /**
     * use `import { ssrPrepass } from '@trpc/next/ssrPrepass'`
     * @see https://trpc.io/docs/client/nextjs/ssr
     */
    ssrPrepass: TRPCPrepassHelper;
  };

export type WithTRPCNoSSROptions<TRouter extends AnyRouter> =
  WithTRPCOptions<TRouter> & {
    ssr?: false;
  };

export type TRPCPrepassProps<
  TRouter extends AnyRouter,
  TSSRContext extends NextPageContext = NextPageContext,
> = {
  config: WithTRPCConfig<TRouter>;
  queryClient: QueryClient;
  trpcClient: TRPCUntypedClient<TRouter> | TRPCClient<TRouter>;
  ssrState: 'prepass';
  ssrContext: TSSRContext;
};
