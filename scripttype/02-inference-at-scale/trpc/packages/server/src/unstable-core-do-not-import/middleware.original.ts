/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/middleware.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GetRawInputFn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Overwrite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProcedureType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface MiddlewareErrorResult<_TContextOverride>
  extends MiddlewareResultBase {
  ok: false;
  error: TRPCError;
}

export interface MiddlewareOKResult<_TContextOverride> extends MiddlewareResultBase {
  ok: true;
  data: unknown;
  // this could be extended with `input`/`rawInput` later
}

export type MiddlewareResult<_TContextOverride> =
  | MiddlewareErrorResult<_TContextOverride>
  | MiddlewareOKResult<_TContextOverride>;

export type MiddlewareFunction<
  TContext,
  TMeta,
  TContextOverridesIn,
  $ContextOverridesOut,
  TInputOut,
> = {
  (opts: {
    ctx: Simplify<Overwrite<TContext, TContextOverridesIn>>;
    type: ProcedureType;
    path: string;
    input: TInputOut;
    getRawInput: GetRawInputFn;
    meta: TMeta | undefined;
    signal: AbortSignal | undefined;
    /**
     * The index of this call in a batch request.
     */
    batchIndex: number;
    next: {
      (): Promise<MiddlewareResult<TContextOverridesIn>>;
      <$ContextOverride>(opts: {
        ctx?: $ContextOverride;
        input?: unknown;
      }): Promise<MiddlewareResult<$ContextOverride>>;
      (opts: {
        getRawInput: GetRawInputFn;
      }): Promise<MiddlewareResult<TContextOverridesIn>>;
    };
  }): Promise<MiddlewareResult<$ContextOverridesOut>>;
  _type?: string | undefined;
};
