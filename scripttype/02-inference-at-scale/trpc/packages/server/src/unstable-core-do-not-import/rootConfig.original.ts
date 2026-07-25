/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/rootConfig.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DefaultErrorShape<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface RootTypes {
  ctx: object;
  meta: object;
  errorShape: DefaultErrorShape;
  transformer: boolean;
}

export type CreateRootTypes<TGenerics extends RootTypes> = TGenerics;

export type PartialIf<TCondition extends boolean, TType> = TCondition extends true
  ? Partial<TType>
  : TType;

export type CreateContextCallback<
  TContext,
  TFunction extends (...args: any[]) => any,
> = PartialIf<
  object extends TContext ? true : false,
  {
    /**
     * @see https://trpc.io/docs/v11/context
     **/
    createContext: TFunction;
  }
>;
