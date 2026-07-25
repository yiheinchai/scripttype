/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/utils/inferReactQueryProcedure.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyMutationProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyQueryProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientErrorLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCMutationOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCMutationResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCQueryOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseTRPCQueryResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferQueryOptions<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
  TData = inferTransformedProcedureOutput<TRoot, TProcedure>,
> = Omit<
  UseTRPCQueryOptions<
    inferTransformedProcedureOutput<TRoot, TProcedure>,
    inferTransformedProcedureOutput<TRoot, TProcedure>,
    TRPCClientErrorLike<TRoot>,
    TData
  >,
  'select' | 'queryFn'
>;

export type InferMutationOptions<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
  TMeta = unknown,
> = UseTRPCMutationOptions<
  inferProcedureInput<TProcedure>,
  TRPCClientErrorLike<TRoot>,
  inferTransformedProcedureOutput<TRoot, TProcedure>,
  TMeta
>;

export type InferQueryResult<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
> = UseTRPCQueryResult<
  inferTransformedProcedureOutput<TRoot, TProcedure>,
  TRPCClientErrorLike<TRoot>
>;

export type InferMutationResult<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
  TContext = unknown,
> = UseTRPCMutationResult<
  inferTransformedProcedureOutput<TRoot, TProcedure>,
  TRPCClientErrorLike<TRoot>,
  inferProcedureInput<TProcedure>,
  TContext
>;

export type inferReactQueryProcedureOptionsInner<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyQueryProcedure
      ? InferQueryOptions<TRoot, $Value>
      : $Value extends AnyMutationProcedure
        ? InferMutationOptions<TRoot, $Value>
        : $Value extends RouterRecord
          ? inferReactQueryProcedureOptionsInner<TRoot, $Value>
          : never
    : never;
};

export type inferReactQueryProcedureOptions<TRouter extends AnyRouter> =
  inferReactQueryProcedureOptionsInner<
    TRouter['_def']['_config']['$types'],
    TRouter['_def']['record']
  >;
