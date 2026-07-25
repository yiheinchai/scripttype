/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/TRPCClientError.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultErrorShape<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferrableClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Maybe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type inferErrorShape<TInferrable extends InferrableClientTypes> =
  inferClientTypes<TInferrable>['errorShape'];

export interface TRPCClientErrorBase<TShape extends DefaultErrorShape> {
  readonly message: string;
  readonly shape: Maybe<TShape>;
  readonly data: Maybe<TShape['data']>;
}

export type TRPCClientErrorLike<TInferrable extends InferrableClientTypes> =
  TRPCClientErrorBase<inferErrorShape<TInferrable>>;
