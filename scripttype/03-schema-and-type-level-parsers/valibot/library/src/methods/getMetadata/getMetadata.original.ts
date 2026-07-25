/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/getMetadata/getMetadata.ts, for comparison with the ScriptType alongside.
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
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MetadataAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeItem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeItemAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithPipe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithPipeAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type BasicPipeItem =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | PipeItem<any, unknown, BaseIssue<unknown>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | PipeItemAsync<any, unknown, BaseIssue<unknown>>
  | MetadataAction<unknown, Record<string, unknown>>;

export type RecursiveMerge<
  TRootPipe extends readonly BasicPipeItem[],
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TCollectedMetadata extends Record<string, unknown> = {},
> = TRootPipe extends readonly [
  infer TFirstItem,
  ...infer TPipeRest extends readonly BasicPipeItem[],
]
  ? TFirstItem extends
      | SchemaWithPipe<infer TNestedPipe>
      | SchemaWithPipeAsync<infer TNestedPipe>
    ? RecursiveMerge<TPipeRest, RecursiveMerge<TNestedPipe, TCollectedMetadata>>
    : TFirstItem extends MetadataAction<unknown, infer TCurrentMetadata>
      ? RecursiveMerge<TPipeRest, Merge<TCollectedMetadata, TCurrentMetadata>>
      : RecursiveMerge<TPipeRest, TCollectedMetadata>
  : TCollectedMetadata;

export type Schema =
  | BaseSchema<unknown, unknown, BaseIssue<unknown>>
  | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
  | SchemaWithPipe<
      readonly [
        BaseSchema<unknown, unknown, BaseIssue<unknown>>,
        ...(
          | PipeItem<any, unknown, BaseIssue<unknown>> // eslint-disable-line @typescript-eslint/no-explicit-any
          | MetadataAction<unknown, Record<string, unknown>>
        )[],
      ]
    >
  | SchemaWithPipeAsync<
      readonly [
        (
          | BaseSchema<unknown, unknown, BaseIssue<unknown>>
          | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
        ),
        ...(
          | PipeItem<any, unknown, BaseIssue<unknown>> // eslint-disable-line @typescript-eslint/no-explicit-any
          | PipeItemAsync<any, unknown, BaseIssue<unknown>> // eslint-disable-line @typescript-eslint/no-explicit-any
          | MetadataAction<unknown, Record<string, unknown>>
        )[],
      ]
    >;

export type InferMetadata<TSchema extends Schema> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BaseSchema<any, any, any> extends TSchema
    ? Record<string, unknown>
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      BaseSchemaAsync<any, any, any> extends TSchema
      ? Record<string, unknown>
      : TSchema extends
            | SchemaWithPipe<infer TPipe>
            | SchemaWithPipeAsync<infer TPipe>
        ? Prettify<RecursiveMerge<TPipe>>
        : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
          {};
