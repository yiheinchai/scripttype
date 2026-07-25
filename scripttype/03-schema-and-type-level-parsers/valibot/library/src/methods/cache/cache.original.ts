/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/cache/cache.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cache<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CacheConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutputDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SchemaWithCache<
  TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  TCacheConfig extends CacheConfig | undefined,
> = TSchema & {
  /**
   * The cache config.
   */
  readonly cacheConfig: TCacheConfig;
  /**
   * The cache instance.
   */
  readonly cache: Cache<
    OutputDataset<InferOutput<TSchema>, InferIssue<TSchema>>
  >;
};
