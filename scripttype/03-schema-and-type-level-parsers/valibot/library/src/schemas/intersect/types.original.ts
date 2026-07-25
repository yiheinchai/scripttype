/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/schemas/intersect/types.ts, for comparison with the ScriptType alongside.
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
type InferInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MaybeReadonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToIntersect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type InferOption<TInput, TOutput> =
  | BaseSchema<TInput, TOutput, BaseIssue<unknown>>
  | BaseSchemaAsync<TInput, TOutput, BaseIssue<unknown>>;

export type IntersectOptions = MaybeReadonly<
  BaseSchema<unknown, unknown, BaseIssue<unknown>>[]
>;

export type IntersectOptionsAsync = MaybeReadonly<
  (
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
  )[]
>;

export type InferIntersectInput<
  TOptions extends IntersectOptions | IntersectOptionsAsync,
> = TOptions extends readonly [
  InferOption<infer TInput, unknown>,
  ...infer TRest,
]
  ? TRest extends readonly [
      InferOption<unknown, unknown>,
      ...InferOption<unknown, unknown>[],
    ]
    ? TInput & InferIntersectInput<TRest>
    : TInput
  : IsNever<TOptions[number]> extends true
    ? never
    : UnionToIntersect<InferInput<TOptions[number]>>;

export type InferIntersectOutput<
  TOptions extends IntersectOptions | IntersectOptionsAsync,
> = TOptions extends readonly [
  InferOption<unknown, infer TOutput>,
  ...infer TRest,
]
  ? TRest extends readonly [
      InferOption<unknown, unknown>,
      ...InferOption<unknown, unknown>[],
    ]
    ? TOutput & InferIntersectOutput<TRest>
    : TOutput
  : IsNever<TOptions[number]> extends true
    ? never
    : UnionToIntersect<InferOutput<TOptions[number]>>;
