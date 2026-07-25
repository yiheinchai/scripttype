/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/zod-adapter/src/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ValidatorAdapter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface ZodTypeLike {
  _input: any
  _output: any
  parse: (input: any) => any
}

export type InputOutputOption = 'input' | 'output'

export interface zodValidatorOptions {
  readonly schema: ZodTypeLike
  readonly input?: InputOutputOption
  readonly output?: InputOutputOption
}

export type zodValidatorInput<
  TOptions extends ZodTypeLike | zodValidatorOptions,
> = TOptions extends zodValidatorOptions
  ? 'input' extends TOptions['input']
    ? TOptions['schema']['_input']
    : TOptions['schema']['_output']
  : TOptions extends ZodTypeLike
    ? TOptions['_input']
    : never

export type zodValidatorOutput<
  TOptions extends ZodTypeLike | zodValidatorOptions,
> = TOptions extends zodValidatorOptions
  ? 'output' extends TOptions['output']
    ? TOptions['schema']['_output']
    : TOptions['schema']['_input']
  : TOptions extends ZodTypeLike
    ? TOptions['_output']
    : never

export type zodValidatorAdapter<
  TOptions extends ZodTypeLike | zodValidatorOptions,
> = ValidatorAdapter<zodValidatorInput<TOptions>, zodValidatorOutput<TOptions>>
