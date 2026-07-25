/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/error/formatter.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ProcedureType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCErrorShape<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPC_ERROR_CODE_KEY<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPC_ERROR_CODE_NUMBER<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DefaultErrorData = {
  code: TRPC_ERROR_CODE_KEY;
  httpStatus: number;
  /**
   * Path to the procedure that threw the error
   */
  path?: string;
  /**
   * Stack trace of the error (only in development)
   */
  stack?: string;
};

export interface DefaultErrorShape extends TRPCErrorShape<DefaultErrorData> {
  message: string;
  code: TRPC_ERROR_CODE_NUMBER;
}

export type ErrorFormatter<TContext, TShape extends TRPCErrorShape> = (opts: {
  error: TRPCError;
  type: ProcedureType | 'unknown';
  path: string | undefined;
  input: unknown;
  ctx: TContext | undefined;
  shape: DefaultErrorShape;
}) => TShape;
