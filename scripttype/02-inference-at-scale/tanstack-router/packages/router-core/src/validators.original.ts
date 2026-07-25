/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/validators.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonNullable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SearchSchemaInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ValidatorFn<TInput, TOutput> = (input: TInput) => TOutput

export interface ValidatorObj<TInput, TOutput> {
  parse: ValidatorFn<TInput, TOutput>
}

export interface ValidatorAdapter<TInput, TOutput> {
  types: {
    input: TInput
    output: TOutput
  }
  parse: (input: unknown) => TOutput
}

export interface StandardSchemaValidatorTypes<TInput, TOutput> {
  readonly input: TInput
  readonly output: TOutput
}

export interface AnyStandardSchemaValidateSuccess {
  readonly value: any
  readonly issues?: undefined
}

export interface AnyStandardSchemaValidateIssue {
  readonly message: string
}

export interface AnyStandardSchemaValidateFailure {
  readonly issues: ReadonlyArray<AnyStandardSchemaValidateIssue>
}

export type AnyStandardSchemaValidate = (
  value: unknown,
) =>
  | (AnyStandardSchemaValidateSuccess | AnyStandardSchemaValidateFailure)
  | Promise<AnyStandardSchemaValidateSuccess | AnyStandardSchemaValidateFailure>

export interface StandardSchemaValidatorProps<TInput, TOutput> {
  readonly types?: StandardSchemaValidatorTypes<TInput, TOutput> | undefined
  readonly validate: AnyStandardSchemaValidate
}

export interface StandardSchemaValidator<TInput, TOutput> {
  readonly '~standard': StandardSchemaValidatorProps<TInput, TOutput>
}

export type Validator<TInput, TOutput> =
  | ValidatorObj<TInput, TOutput>
  | ValidatorFn<TInput, TOutput>
  | ValidatorAdapter<TInput, TOutput>
  | StandardSchemaValidator<TInput, TOutput>
  | undefined

export type AnySchema = {}

export type ResolveValidatorOutputFn<TValidator> = TValidator extends (
  ...args: any
) => infer TSchema
  ? TSchema
  : AnySchema

export type ResolveSearchValidatorInputFn<TValidator> = TValidator extends (
  input: infer TSchemaInput,
) => any
  ? TSchemaInput extends SearchSchemaInput
    ? Omit<TSchemaInput, keyof SearchSchemaInput>
    : ResolveValidatorOutputFn<TValidator>
  : AnySchema

export type AnyStandardSchemaValidator = StandardSchemaValidator<any, any>

export type AnyValidatorAdapter = ValidatorAdapter<any, any>

export type AnyValidatorObj = ValidatorObj<any, any>

export type ResolveSearchValidatorInput<TValidator> =
  TValidator extends AnyStandardSchemaValidator
    ? NonNullable<TValidator['~standard']['types']>['input']
    : TValidator extends AnyValidatorAdapter
      ? TValidator['types']['input']
      : TValidator extends AnyValidatorObj
        ? ResolveSearchValidatorInputFn<TValidator['parse']>
        : ResolveSearchValidatorInputFn<TValidator>

export type ResolveValidatorInputFn<TValidator> = TValidator extends (
  input: infer TInput,
) => any
  ? TInput
  : undefined

export type ResolveValidatorInput<TValidator> =
  TValidator extends AnyStandardSchemaValidator
    ? NonNullable<TValidator['~standard']['types']>['input']
    : TValidator extends AnyValidatorAdapter
      ? TValidator['types']['input']
      : TValidator extends AnyValidatorObj
        ? ResolveValidatorInputFn<TValidator['parse']>
        : ResolveValidatorInputFn<TValidator>

export type ResolveValidatorOutput<TValidator> = unknown extends TValidator
  ? TValidator
  : TValidator extends AnyStandardSchemaValidator
    ? NonNullable<TValidator['~standard']['types']>['output']
    : TValidator extends AnyValidatorAdapter
      ? TValidator['types']['output']
      : TValidator extends AnyValidatorObj
        ? ResolveValidatorOutputFn<TValidator['parse']>
        : ResolveValidatorOutputFn<TValidator>
