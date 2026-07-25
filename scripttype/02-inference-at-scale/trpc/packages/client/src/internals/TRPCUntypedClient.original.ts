/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/internals/TRPCUntypedClient.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type InferrableClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCLink<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateTRPCClientOptions<TRouter extends InferrableClientTypes> = {
  links: TRPCLink<TRouter>[];
  transformer?: TypeError<'The transformer property has moved to httpLink/httpBatchLink/wsLink'>;
};
