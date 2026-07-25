/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/infer.ts, for comparison with the ScriptType alongside.
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
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferInput<
  TItem extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
    | BaseValidation<any, unknown, BaseIssue<unknown>>
    | BaseValidationAsync<any, unknown, BaseIssue<unknown>>
    | BaseTransformation<any, unknown, BaseIssue<unknown>>
    | BaseTransformationAsync<any, unknown, BaseIssue<unknown>>
    | BaseMetadata<any>,
> = NonNullable<TItem['~types']>['input'];

export type InferOutput<
  TItem extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
    | BaseValidation<any, unknown, BaseIssue<unknown>>
    | BaseValidationAsync<any, unknown, BaseIssue<unknown>>
    | BaseTransformation<any, unknown, BaseIssue<unknown>>
    | BaseTransformationAsync<any, unknown, BaseIssue<unknown>>
    | BaseMetadata<any>,
> = NonNullable<TItem['~types']>['output'];

export type InferIssue<
  TItem extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
    | BaseValidation<any, unknown, BaseIssue<unknown>>
    | BaseValidationAsync<any, unknown, BaseIssue<unknown>>
    | BaseTransformation<any, unknown, BaseIssue<unknown>>
    | BaseTransformationAsync<any, unknown, BaseIssue<unknown>>
    | BaseMetadata<any>,
> = NonNullable<TItem['~types']>['issue'];
