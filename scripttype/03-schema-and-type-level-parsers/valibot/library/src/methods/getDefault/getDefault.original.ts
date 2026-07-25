/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/getDefault/getDefault.ts, for comparison with the ScriptType alongside.
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
type ExactOptionalSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExactOptionalSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NullableSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NullableSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NullishSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NullishSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedableSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UndefinedableSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SchemaWithDefault =
  | ExactOptionalSchema<
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >
  | NullableSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>
  | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>
  | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>
  | UndefinedableSchema<
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >;

export type SchemaWithDefaultAsync =
  | ExactOptionalSchemaAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >
  | NullableSchemaAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >
  | NullishSchemaAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >
  | OptionalSchemaAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >
  | UndefinedableSchemaAsync<
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >;

export type InferDefault<
  TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
    | SchemaWithDefault
    | SchemaWithDefaultAsync,
> = TSchema extends SchemaWithDefault | SchemaWithDefaultAsync
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TSchema['default'] extends (...args: any) => any
    ? ReturnType<TSchema['default']>
    : TSchema['default']
  : undefined;
