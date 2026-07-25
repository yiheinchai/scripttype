/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/next/src/app-dir/create-action-hook.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActionHandlerDef<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FormData<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCClientError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCProcedureOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type MutationArgs<TDef extends ActionHandlerDef> = TDef['input'] extends void
  ? [input?: undefined | void, opts?: TRPCProcedureOptions]
  : [input: FormData | TDef['input'], opts?: TRPCProcedureOptions];

export interface UseTRPCActionErrorResult<TDef extends ActionHandlerDef>
  extends UseTRPCActionBaseResult<TDef> {
  data?: never;
  error: TRPCClientError<TDef['errorShape']>;
  status: 'error';
}

export interface UseTRPCActionIdleResult<TDef extends ActionHandlerDef>
  extends UseTRPCActionBaseResult<TDef> {
  data?: never;
  error?: never;
  status: 'idle';
}

export interface UseTRPCActionLoadingResult<TDef extends ActionHandlerDef>
  extends UseTRPCActionBaseResult<TDef> {
  data?: never;
  error?: never;
  status: 'loading';
}

export interface UseTRPCActionSuccessResult<TDef extends ActionHandlerDef>
  extends UseTRPCActionBaseResult<TDef> {
  data: TDef['output'];
  error?: never;
  status: 'success';
}

export type UseTRPCActionResult<TDef extends ActionHandlerDef> =
  | UseTRPCActionErrorResult<TDef>
  | UseTRPCActionIdleResult<TDef>
  | UseTRPCActionLoadingResult<TDef>
  | UseTRPCActionSuccessResult<TDef>;
