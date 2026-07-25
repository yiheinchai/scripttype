/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/validation.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Config<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutputDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface BaseValidation<
  TInput,
  TOutput,
  TIssue extends BaseIssue<unknown>,
> {
  /**
   * The object kind.
   */
  readonly kind: 'validation';
  /**
   * The validation type.
   */
  readonly type: string;
  /**
   * The validation reference.
   */
  readonly reference: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => BaseValidation<any, any, BaseIssue<unknown>>;
  /**
   * The expected property.
   */
  readonly expects: string | null;
  /**
   * Whether it's async.
   */
  readonly async: false;
  /**
   * Validates known input values.
   *
   * @param dataset The input dataset.
   * @param config The configuration.
   *
   * @returns The output dataset.
   *
   * @internal
   */
  readonly '~run': (
    dataset: OutputDataset<TInput, BaseIssue<unknown>>,
    config: Config<BaseIssue<unknown>>
  ) => OutputDataset<TOutput, BaseIssue<unknown> | TIssue>;
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

export type GenericValidation<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TInput = any,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = BaseValidation<TInput, TOutput, TIssue>;

export interface BaseValidationAsync<
  TInput,
  TOutput,
  TIssue extends BaseIssue<unknown>,
> extends Omit<
    BaseValidation<TInput, TOutput, TIssue>,
    'reference' | 'async' | '~run'
  > {
  /**
   * The validation reference.
   */
  readonly reference: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | BaseValidation<any, any, BaseIssue<unknown>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | BaseValidationAsync<any, any, BaseIssue<unknown>>;
  /**
   * Whether it's async.
   */
  readonly async: true;
  /**
   * Validates known input values.
   *
   * @param dataset The input dataset.
   * @param config The configuration.
   *
   * @returns The output dataset.
   *
   * @internal
   */
  readonly '~run': (
    dataset: OutputDataset<TInput, BaseIssue<unknown>>,
    config: Config<BaseIssue<unknown>>
  ) => Promise<OutputDataset<TOutput, BaseIssue<unknown> | TIssue>>;
}

export type GenericValidationAsync<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TInput = any,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = BaseValidationAsync<TInput, TOutput, TIssue>;
