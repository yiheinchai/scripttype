/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/shared/polymorphism/queryLike.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DecoratedQuery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientErrorLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCSuspenseQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type QueryLike<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
> = {
  useQuery: (
    variables: inferProcedureInput<TProcedure>,
    opts?: InferQueryOptions<TRoot, TProcedure, any>,
  ) => InferQueryResult<TRoot, TProcedure>;

  useSuspenseQuery: (
    variables: inferProcedureInput<TProcedure>,
    opts?: InferQueryOptions<TRoot, TProcedure, any>,
  ) => UseTRPCSuspenseQueryResult<
    inferProcedureOutput<TProcedure>,
    TRPCClientErrorLike<TRoot>
  >;
};

export type InferQueryLikeInput<TQueryLike> =
  TQueryLike extends DecoratedQuery<infer $Def>
    ? $Def['input']
    : TQueryLike extends QueryLike<any, infer TProcedure>
      ? inferProcedureInput<TProcedure>
      : never;

export type InferQueryLikeData<TQueryLike> =
  TQueryLike extends DecoratedQuery<infer $Def>
    ? $Def['output']
    : TQueryLike extends QueryLike<infer TRoot, infer TProcedure>
      ? inferTransformedProcedureOutput<TRoot, TProcedure>
      : never;
