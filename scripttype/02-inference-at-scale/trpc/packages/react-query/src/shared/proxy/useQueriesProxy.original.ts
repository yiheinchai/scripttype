/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/shared/proxy/useQueriesProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyQueryProcedure<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRootTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouterRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TrpcQueryOptionsForUseQueries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TrpcQueryOptionsForUseSuspenseQueries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferProcedureInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferTransformedProcedureOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GetQueryOptions<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyProcedure,
> = <TData = inferTransformedProcedureOutput<TRoot, TProcedure>>(
  input: inferProcedureInput<TProcedure>,
  opts?: TrpcQueryOptionsForUseQueries<
    inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData,
    TRPCClientError<TRoot>
  >,
) => TrpcQueryOptionsForUseQueries<
  inferTransformedProcedureOutput<TRoot, TProcedure>,
  TData,
  TRPCClientError<TRoot>
>;

export type UseQueriesProcedureRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyQueryProcedure
      ? GetQueryOptions<TRoot, $Value>
      : $Value extends RouterRecord
        ? UseQueriesProcedureRecord<TRoot, $Value>
        : never
    : never;
};

export type GetSuspenseQueryOptions<
  TRoot extends AnyRootTypes,
  TProcedure extends AnyQueryProcedure,
> = <TData = inferTransformedProcedureOutput<TRoot, TProcedure>>(
  input: inferProcedureInput<TProcedure>,
  opts?: TrpcQueryOptionsForUseSuspenseQueries<
    inferTransformedProcedureOutput<TRoot, TProcedure>,
    TData,
    TRPCClientError<TRoot>
  >,
) => TrpcQueryOptionsForUseSuspenseQueries<
  inferTransformedProcedureOutput<TRoot, TProcedure>,
  TData,
  TRPCClientError<TRoot>
>;

export type UseSuspenseQueriesProcedureRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyQueryProcedure
      ? GetSuspenseQueryOptions<TRoot, $Value>
      : $Value extends RouterRecord
        ? UseSuspenseQueriesProcedureRecord<TRoot, $Value>
        : never
    : never;
};
