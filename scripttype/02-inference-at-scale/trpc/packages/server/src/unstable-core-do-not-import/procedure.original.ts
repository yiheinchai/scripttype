/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/procedure.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type inferAsyncIterableYield<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface BuiltProcedureDef {
  meta: unknown;
  input: unknown;
  output: unknown;
}

export interface QueryProcedure<TDef extends BuiltProcedureDef>
  extends Procedure<'query', TDef> {}

export type AnyQueryProcedure = QueryProcedure<any>;

export interface MutationProcedure<TDef extends BuiltProcedureDef>
  extends Procedure<'mutation', TDef> {}

export type AnyMutationProcedure = MutationProcedure<any>;

export interface SubscriptionProcedure<TDef extends BuiltProcedureDef>
  extends Procedure<'subscription', TDef> {}

export interface LegacyObservableSubscriptionProcedure<
  TDef extends BuiltProcedureDef,
> extends SubscriptionProcedure<TDef> {
  _observable: true;
}

export type AnySubscriptionProcedure =
  | SubscriptionProcedure<any>
  | LegacyObservableSubscriptionProcedure<any>;

export type AnyProcedure =
  | AnyQueryProcedure
  | AnyMutationProcedure
  | AnySubscriptionProcedure;

export type inferProcedureParams<TProcedure> = TProcedure extends AnyProcedure
  ? TProcedure['_def']
  : never;

export type inferProcedureInput<TProcedure extends AnyProcedure> =
  undefined extends inferProcedureParams<TProcedure>['$types']['input']
    ? void | inferProcedureParams<TProcedure>['$types']['input']
    : inferProcedureParams<TProcedure>['$types']['input'];

export type inferProcedureOutput<TProcedure> =
  inferProcedureParams<TProcedure>['$types']['output'];

export type inferSubscriptionInput<
  TProcedure extends AnySubscriptionProcedure,
> = inferProcedureInput<TProcedure>;

export type inferSubscriptionOutput<
  TProcedure extends AnySubscriptionProcedure,
> =
  TProcedure extends LegacyObservableSubscriptionProcedure<any>
    ? inferProcedureOutput<TProcedure>
    : inferAsyncIterableYield<inferProcedureOutput<TProcedure>>;
