/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/tanstack-react-query/src/internals/Context.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyTRPCRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DefaultFeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FeatureFlags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KeyPrefixOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type QueryClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type React<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClient<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TRPCProviderType<
  TRouter extends AnyTRPCRouter,
  TFeatureFlags extends FeatureFlags = DefaultFeatureFlags,
> = React.FC<
  {
    children: React.ReactNode;
    queryClient: QueryClient;
    trpcClient: TRPCClient<TRouter>;
  } & KeyPrefixOptions<TFeatureFlags>
>;
