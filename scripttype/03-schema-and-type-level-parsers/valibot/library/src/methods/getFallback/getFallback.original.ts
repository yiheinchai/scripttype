/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/getFallback/getFallback.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeDeepReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybePromise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithFallback<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithFallbackAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferFallback<
  TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = TSchema extends
  | SchemaWithFallback<
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      infer TFallback
    >
  | SchemaWithFallbackAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      infer TFallback
    >
  ? TFallback extends MaybeDeepReadonly<InferOutput<TSchema>>
    ? TFallback
    : TFallback extends () => MaybePromise<
          MaybeDeepReadonly<InferOutput<TSchema>>
        >
      ? ReturnType<TFallback>
      : never
  : undefined;
