/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/getExamples/getExamples.ts, for comparison with the ScriptType alongside.
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
type ExamplesAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PipeItem<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PipeItemAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SchemaWithPipe<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SchemaWithPipeAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RecursiveConcat<
  TRootPipe extends readonly // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (| PipeItem<any, unknown, BaseIssue<unknown>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | PipeItemAsync<any, unknown, BaseIssue<unknown>>
  )[],
  TCollectedExamples extends unknown[] = [],
> = TRootPipe extends readonly [
  infer TFirstItem,
  ...infer TPipeRest extends readonly // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (| PipeItem<any, unknown, BaseIssue<unknown>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | PipeItemAsync<any, unknown, BaseIssue<unknown>>
  )[],
]
  ? TFirstItem extends
      | SchemaWithPipe<infer TNestedPipe>
      | SchemaWithPipeAsync<infer TNestedPipe>
    ? RecursiveConcat<
        TPipeRest,
        RecursiveConcat<TNestedPipe, TCollectedExamples>
      >
    : TFirstItem extends ExamplesAction<unknown, infer TCurrentExamples>
      ? RecursiveConcat<TPipeRest, [...TCollectedExamples, ...TCurrentExamples]>
      : RecursiveConcat<TPipeRest, TCollectedExamples>
  : TCollectedExamples;

export type Schema =
  | BaseSchema<unknown, unknown, BaseIssue<unknown>>
  | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
  | SchemaWithPipe<
      readonly [
        BaseSchema<unknown, unknown, BaseIssue<unknown>>,
        ...(
          | PipeItem<any, unknown, BaseIssue<unknown>> // eslint-disable-line @typescript-eslint/no-explicit-any
          | ExamplesAction<unknown, readonly unknown[]>
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
          | ExamplesAction<unknown, readonly unknown[]>
        )[],
      ]
    >;

export type InferExamples<TSchema extends Schema> = TSchema extends
  | SchemaWithPipe<infer TPipe>
  | SchemaWithPipeAsync<infer TPipe>
  ? Readonly<RecursiveConcat<TPipe>>
  : [];
