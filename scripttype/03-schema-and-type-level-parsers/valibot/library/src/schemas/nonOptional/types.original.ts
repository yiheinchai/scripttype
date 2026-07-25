/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/schemas/nonOptional/types.ts, for comparison with the ScriptType alongside.
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
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionOptionsAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferNonOptionalInput<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = NonOptional<InferInput<TWrapped>>;

export type InferNonOptionalOutput<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = NonOptional<InferOutput<TWrapped>>;

export type InferNonOptionalIssue<
  TWrapped extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = TWrapped extends
  | UnionSchema<
      UnionOptions,
      ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined
    >
  | UnionSchemaAsync<
      UnionOptionsAsync,
      ErrorMessage<UnionIssue<BaseIssue<unknown>>> | undefined
    >
  ?
      | Exclude<InferIssue<TWrapped>, { type: 'undefined' | 'union' }>
      | UnionIssue<InferNonOptionalIssue<TWrapped['options'][number]>>
  : Exclude<InferIssue<TWrapped>, { type: 'undefined' }>;
