/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/next/src/app-dir/create-action-hook.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActionHandlerDef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormData<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCProcedureOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
