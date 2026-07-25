/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/links/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferrableClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Maybe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Observable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Observer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCClientError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCConnectionState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCResultMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRPCSuccessResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface OperationContext extends Record<string, unknown> {}

export type Operation<TInput = unknown> = {
  id: number;
  type: 'mutation' | 'query' | 'subscription';
  input: TInput;
  path: string;
  context: OperationContext;
  signal: Maybe<AbortSignal>;
};

export interface OperationResultEnvelope<TOutput, TError> {
  result:
    | TRPCResultMessage<TOutput>['result']
    | TRPCSuccessResponse<TOutput>['result']
    | TRPCConnectionState<TError>;
  context?: OperationContext;
}

export type OperationResultObservable<
  TInferrable extends InferrableClientTypes,
  TOutput,
> = Observable<
  OperationResultEnvelope<TOutput, TRPCClientError<TInferrable>>,
  TRPCClientError<TInferrable>
>;

export type OperationResultObserver<
  TInferrable extends InferrableClientTypes,
  TOutput,
> = Observer<
  OperationResultEnvelope<TOutput, TRPCClientError<TInferrable>>,
  TRPCClientError<TInferrable>
>;

export type OperationLink<
  TInferrable extends InferrableClientTypes,
  TInput = unknown,
  TOutput = unknown,
> = (opts: {
  op: Operation<TInput>;
  next: (
    op: Operation<TInput>,
  ) => OperationResultObservable<TInferrable, TOutput>;
}) => OperationResultObservable<TInferrable, TOutput>;

export interface TRPCClientRuntime {
  // nothing here anymore
}

export type TRPCLink<TInferrable extends InferrableClientTypes> = (
  opts: TRPCClientRuntime,
) => OperationLink<TInferrable>;
