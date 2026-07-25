/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/pipe.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseMetadata<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseTransformation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseTransformationAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseValidation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseValidationAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PipeAction<TInput, TOutput, TIssue extends BaseIssue<unknown>> =
  | BaseValidation<TInput, TOutput, TIssue>
  | BaseTransformation<TInput, TOutput, TIssue>
  | BaseMetadata<TInput>;

export type PipeActionAsync<
  TInput,
  TOutput,
  TIssue extends BaseIssue<unknown>,
> =
  | BaseValidationAsync<TInput, TOutput, TIssue>
  | BaseTransformationAsync<TInput, TOutput, TIssue>;

export type PipeItem<TInput, TOutput, TIssue extends BaseIssue<unknown>> =
  | BaseSchema<TInput, TOutput, TIssue>
  | PipeAction<TInput, TOutput, TIssue>;

export type PipeItemAsync<TInput, TOutput, TIssue extends BaseIssue<unknown>> =
  | BaseSchemaAsync<TInput, TOutput, TIssue>
  | PipeActionAsync<TInput, TOutput, TIssue>;

export type SchemaWithoutPipe<
  TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = TSchema & { pipe?: never };

export type GenericPipeAction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TInput = any,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = PipeAction<TInput, TOutput, TIssue>;

export type GenericPipeActionAsync<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TInput = any,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = PipeActionAsync<TInput, TOutput, TIssue>;

export type GenericPipeItem<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TInput = any,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = PipeItem<TInput, TOutput, TIssue>;

export type GenericPipeItemAsync<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TInput = any,
  TOutput = TInput,
  TIssue extends BaseIssue<unknown> = BaseIssue<unknown>,
> = PipeItemAsync<TInput, TOutput, TIssue>;
