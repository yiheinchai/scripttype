/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/other.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Awaited<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Config<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeDeepReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybePromise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ErrorMessage<TIssue extends BaseIssue<unknown>> =
  | ((issue: TIssue) => string)
  | string;

export type Default<
  TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  TInput extends null | undefined,
> =
  | MaybeDeepReadonly<InferInput<TWrapped> | TInput>
  | ((
      dataset?: UnknownDataset,
      config?: Config<InferIssue<TWrapped>>
    ) => MaybeDeepReadonly<InferInput<TWrapped> | TInput>)
  | undefined;

export type DefaultAsync<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
  TInput extends null | undefined,
> =
  | MaybeDeepReadonly<InferInput<TWrapped> | TInput>
  | ((
      dataset?: UnknownDataset,
      config?: Config<InferIssue<TWrapped>>
    ) => MaybePromise<MaybeDeepReadonly<InferInput<TWrapped> | TInput>>)
  | undefined;

export type DefaultValue<
  TDefault extends
    | Default<
        BaseSchema<unknown, unknown, BaseIssue<unknown>>,
        null | undefined
      >
    | DefaultAsync<
        | BaseSchema<unknown, unknown, BaseIssue<unknown>>
        | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
        null | undefined
      >,
> =
  TDefault extends DefaultAsync<
    infer TWrapped extends
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
    infer TInput
  >
    ? TDefault extends (
        dataset?: UnknownDataset,
        config?: Config<InferIssue<TWrapped>>
      ) => MaybePromise<MaybeDeepReadonly<InferInput<TWrapped> | TInput>>
      ? Awaited<ReturnType<TDefault>>
      : TDefault
    : never;
