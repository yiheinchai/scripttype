/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/react-query/src/shared/proxy/useQueriesProxy.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyQueryProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRootTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RouterRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCClientError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TrpcQueryOptionsForUseQueries<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TrpcQueryOptionsForUseSuspenseQueries<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferProcedureInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferTransformedProcedureOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
