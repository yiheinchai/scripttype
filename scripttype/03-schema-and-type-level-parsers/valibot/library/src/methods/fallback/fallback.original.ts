/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/fallback/fallback.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Config<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeDeepReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutputDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Fallback<
  TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
> =
  | MaybeDeepReadonly<InferOutput<TSchema>>
  | ((
      dataset?: OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>,
      config?: Config<InferIssue<TSchema>>
    ) => MaybeDeepReadonly<InferOutput<TSchema>>);

export type SchemaWithFallback<
  TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  TFallback extends Fallback<TSchema>,
> = TSchema & {
  /**
   * The fallback value.
   */
  readonly fallback: TFallback;
};
