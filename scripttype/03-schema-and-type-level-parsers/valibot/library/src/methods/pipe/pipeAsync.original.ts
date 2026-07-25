/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/pipe/pipeAsync.ts, for comparison with the ScriptType alongside.
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
type Config<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FirstTupleItem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LastTupleItem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutputDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeItem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PipeItemAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SchemaWithPipeAsync<
  TPipe extends readonly [
    (
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
    ),
    ...(
      | PipeItem<any, unknown, BaseIssue<unknown>> // eslint-disable-line @typescript-eslint/no-explicit-any
      | PipeItemAsync<any, unknown, BaseIssue<unknown>> // eslint-disable-line @typescript-eslint/no-explicit-any
    )[],
  ],
> = Omit<
  FirstTupleItem<TPipe>,
  'async' | 'pipe' | '~standard' | '~run' | '~types'
> & {
  /**
   * The pipe items.
   */
  readonly pipe: TPipe;
  /**
   * Whether it's async.
   */
  readonly async: true;
  /**
   * The Standard Schema properties.
   *
   * @internal
   */
  readonly '~standard': StandardProps<
    InferInput<FirstTupleItem<TPipe>>,
    InferOutput<LastTupleItem<TPipe>>
  >;
  /**
   * Parses unknown input values.
   *
   * @param dataset The input dataset.
   * @param config The configuration.
   *
   * @returns The output dataset.
   *
   * @internal
   */
  readonly '~run': (
    dataset: UnknownDataset,
    config: Config<BaseIssue<unknown>>
  ) => Promise<
    OutputDataset<InferOutput<LastTupleItem<TPipe>>, InferIssue<TPipe[number]>>
  >;
  /**
   * The input, output and issue type.
   *
   * @internal
   */
  readonly '~types'?:
    | {
        readonly input: InferInput<FirstTupleItem<TPipe>>;
        readonly output: InferOutput<LastTupleItem<TPipe>>;
        readonly issue: InferIssue<TPipe[number]>;
      }
    | undefined;
};
