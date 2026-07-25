/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/getExamples/getExamples.ts, for comparison with the ScriptType alongside.
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
type ExamplesAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeItem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeItemAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithPipe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithPipeAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
