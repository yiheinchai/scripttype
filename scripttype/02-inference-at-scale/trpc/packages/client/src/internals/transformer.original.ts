/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/client/src/internals/transformer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyClientTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DataTransformerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TransformerOptionYes = {
  /**
   * Data transformer
   *
   * You must use the same transformer on the backend and frontend
   * @see https://trpc.io/docs/v11/data-transformers
   **/
  transformer: DataTransformerOptions;
};

export type TransformerOptionNo = {
  /**
   * Data transformer
   *
   * You must use the same transformer on the backend and frontend
   * @see https://trpc.io/docs/v11/data-transformers
   **/
  transformer?: TypeError<'You must define a transformer on your your `initTRPC`-object first'>;
};

export type TransformerOptions<
  TRoot extends Pick<AnyClientTypes, 'transformer'>,
> = TRoot['transformer'] extends true
  ? TransformerOptionYes
  : TransformerOptionNo;
