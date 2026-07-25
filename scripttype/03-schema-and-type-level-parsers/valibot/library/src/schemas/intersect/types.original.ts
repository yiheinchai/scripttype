/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/schemas/intersect/types.ts, for comparison with the ScriptType alongside.
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
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
