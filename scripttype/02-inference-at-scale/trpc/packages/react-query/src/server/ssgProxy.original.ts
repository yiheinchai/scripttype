/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/server/ssgProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyQueryProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateTRPCReactQueryClientConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DecorateQueryProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCUntypedClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransformerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferRouterContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateSSGHelpersInternal<TRouter extends AnyRouter> = {
  router: TRouter;
  ctx: inferRouterContext<TRouter>;
} & TransformerOptions<inferClientTypes<TRouter>>;

export interface CreateSSGHelpersExternal<TRouter extends AnyRouter> {
  client: TRPCClient<TRouter> | TRPCUntypedClient<TRouter>;
}

export type CreateServerSideHelpersOptions<TRouter extends AnyRouter> =
  CreateTRPCReactQueryClientConfig &
    (CreateSSGHelpersExternal<TRouter> | CreateSSGHelpersInternal<TRouter>);

export type SSGFns =
  | 'queryOptions'
  | 'infiniteQueryOptions'
  | 'fetch'
  | 'fetchInfinite'
  | 'prefetch'
  | 'prefetchInfinite';

export type DecoratedProcedureSSGRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyQueryProcedure
      ? Pick<DecorateQueryProcedure<TRoot, $Value>, SSGFns>
      : $Value extends RouterRecord
        ? DecoratedProcedureSSGRecord<TRoot, $Value>
        : never
    : never;
};
