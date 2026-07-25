/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/rsc.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterCaller<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCFetchInfiniteQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCFetchQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferRouterRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DecorateProcedure<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
> = {
  (
    input: inferProcedureInput<TProcedure>,
  ): Promise<inferProcedureOutput<TProcedure>>;
  prefetch: (
    input: inferProcedureInput<TProcedure>,
    opts?: TRPCFetchQueryOptions<
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      TRPCClientError<TRoot>
    >,
  ) => Promise<void>;
  prefetchInfinite: (
    input: inferProcedureInput<TProcedure>,
    opts?: TRPCFetchInfiniteQueryOptions<
      inferProcedureInput<TProcedure>,
      inferTransformedProcedureOutput<TRoot, TProcedure>,
      TRPCClientError<TRoot>
    >,
  ) => Promise<void>;
};

export type DecorateRouterRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyProcedure
      ? DecorateProcedure<TRoot, $Value>
      : $Value extends RouterRecord
        ? DecorateRouterRecord<TRoot, $Value>
        : never
    : never;
};

export type Caller<TRouter extends AnyRouter> = ReturnType<
  RouterCaller<inferRouterRootTypes<TRouter>, TRouter['_def']['record']>
>;
