/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/schemas/map/types.ts, for comparison with the ScriptType alongside.
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
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferMapInput<
  TKey extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
  TValue extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = Map<InferInput<TKey>, InferInput<TValue>>;

export type InferMapOutput<
  TKey extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
  TValue extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = Map<InferOutput<TKey>, InferOutput<TValue>>;
