/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/internals/context.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DistributiveOmit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractCursorType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FetchInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCQueryKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCRequestOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUntypedClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TRPCUseUtilsOptions {
  /**
   * tRPC-related options
   */
  trpc?: TRPCRequestOptions;
}

export type TRPCFetchInfiniteQueryOptions<TInput, TOutput, TError> =
  DistributiveOmit<
    FetchInfiniteQueryOptions<
      TOutput,
      TError,
      TOutput,
      TRPCQueryKey,
      ExtractCursorType<TInput>
    >,
    'queryKey' | 'initialPageParam'
  > &
    TRPCUseUtilsOptions & {
      initialCursor?: ExtractCursorType<TInput>;
    };

export type SSRState = 'mounted' | 'mounting' | 'prepass' | false;

export interface TRPCContextPropsBase<TRouter extends AnyRouter, TSSRContext> {
  /**
   * The `TRPCClient`
   */
  client: TRPCUntypedClient<TRouter>;
  /**
   * The SSR context when server-side rendering
   * @default null
   */
  ssrContext?: TSSRContext | null;
  /**
   * State of SSR hydration.
   * - `false` if not using SSR.
   * - `prepass` when doing a prepass to fetch queries' data
   * - `mounting` before TRPCProvider has been rendered on the client
   * - `mounted` when the TRPCProvider has been rendered on the client
   * @default false
   */
  ssrState?: SSRState;
  /**
   * @deprecated pass abortOnUnmount to `createTRPCReact` instead
   * Abort loading query calls when unmounting a component - usually when navigating to a new page
   * @default false
   */
  abortOnUnmount?: boolean;
}

export type DecoratedTRPCContextProps<
  TRouter extends AnyRouter,
  TSSRContext,
> = TRPCContextPropsBase<TRouter, TSSRContext> & {
  client: TRPCClient<TRouter>;
};
