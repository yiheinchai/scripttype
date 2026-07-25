/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/shared/polymorphism/mutationLike.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferMutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferMutationResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MutationLike<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
> = {
  useMutation: (
    opts?: InferMutationOptions<TRoot, TProcedure>,
  ) => InferMutationResult<TRoot, TProcedure>;
};

export type InferMutationLikeInput<
  TMutationLike extends MutationLike<any, any>,
> =
  TMutationLike extends MutationLike<any, infer $Procedure>
    ? inferProcedureInput<$Procedure>
    : never;

export type InferMutationLikeData<
  TMutationLike extends MutationLike<any, any>,
> =
  TMutationLike extends MutationLike<infer TRoot, infer TProcedure>
    ? inferTransformedProcedureOutput<TRoot, TProcedure>
    : never;
