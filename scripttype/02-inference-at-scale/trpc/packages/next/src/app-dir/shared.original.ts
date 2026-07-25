/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/next/src/app-dir/shared.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyClientTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyQueryProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRootTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Awaited<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ProtectedIntersection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Resolver<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RouterRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferProcedureInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferProcedureOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferTransformedProcedureOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type UseProcedureRecord<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyQueryProcedure
      ? Resolver<{
          input: inferProcedureInput<$Value>;
          output: inferTransformedProcedureOutput<TRoot, $Value>;
          errorShape: TRoot['errorShape'];
          transformer: TRoot['transformer'];
        }>
      : $Value extends RouterRecord
        ? UseProcedureRecord<TRoot, $Value>
        : never
    : never;
};

export type NextAppRouterUse<TRouter extends AnyRouter> = {
  <TData extends Promise<unknown>[]>(
    cb: (
      t: UseProcedureRecord<
        TRouter['_def']['_config']['$types'],
        TRouter['_def']['record']
      >,
    ) => [...TData],
  ): {
    [TKey in keyof TData]: Awaited<TData[TKey]>;
  };
  <TData extends Promise<unknown>>(
    cb: (
      t: UseProcedureRecord<
        TRouter['_def']['_config']['$types'],
        TRouter['_def']['record']
      >,
    ) => TData,
  ): Awaited<TData>;
};

export type CreateTRPCNextAppRouterBase<TRouter extends AnyRouter> = {
  use: NextAppRouterUse<TRouter>;
};

export type CreateTRPCNextAppRouter<TRouter extends AnyRouter> =
  ProtectedIntersection<
    CreateTRPCNextAppRouterBase<TRouter>,
    UseProcedureRecord<
      TRouter['_def']['_config']['$types'],
      TRouter['_def']['record']
    >
  >;

export type inferActionDef<
  TRoot extends AnyClientTypes,
  TProc extends AnyProcedure,
> = {
  input: inferProcedureInput<TProc>;
  output: inferProcedureOutput<TProc>;
  errorShape: TRoot['errorShape'];
};
