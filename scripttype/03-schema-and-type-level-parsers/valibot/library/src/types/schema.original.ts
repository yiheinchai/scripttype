/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/schema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Config<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OutputDataset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StandardProps<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownDataset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface BaseSchema<
  TInput,
  TOutput,
  TIssue extends BaseIssue<unknown>,
> {
  /**
   * The object kind.
   */
  readonly kind: 'schema';
  /**
   * The schema type.
   */
  readonly type: string;
  /**
   * The schema reference.
   */
  readonly reference: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => BaseSchema<unknown, unknown, BaseIssue<unknown>>;
  /**
   * The expected property.
   */
  readonly expects: string;
  /**
   * Whether it's async.
   */
  readonly async: false;
  /**
   * The Standard Schema properties.
   *
   * @internal
   */
  readonly '~standard': StandardProps<TInput, TOutput>;
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
  ) => OutputDataset<TOutput, TIssue>;
  /**
   * The input, output and issue type.
   *
   * @internal
   */
  readonly '~types'?:
    | {
        readonly input: TInput;
        readonly output: TOutput;
        readonly issue: TIssue;
      }
    | undefined;
}

export type GenericSchema<
  TInput = unknown,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = BaseSchema<TInput, TOutput, TIssue>;

export interface BaseSchemaAsync<
  TInput,
  TOutput,
  TIssue extends BaseIssue<unknown>,
> extends Omit<
    BaseSchema<TInput, TOutput, TIssue>,
    'reference' | 'async' | '~run'
  > {
  /**
   * The schema reference.
   */
  readonly reference: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) =>
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;
  /**
   * Whether it's async.
   */
  readonly async: true;
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
  ) => Promise<OutputDataset<TOutput, TIssue>>;
}

export type GenericSchemaAsync<
  TInput = unknown,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = BaseSchemaAsync<TInput, TOutput, TIssue>;
