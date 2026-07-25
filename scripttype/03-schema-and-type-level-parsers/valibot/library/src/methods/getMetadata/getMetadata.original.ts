/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/getMetadata/getMetadata.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseSchemaAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Merge<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MetadataAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PipeItem<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PipeItemAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Prettify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SchemaWithPipe<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SchemaWithPipeAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
