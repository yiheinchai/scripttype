/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/schemas/variant/types.ts, for comparison with the ScriptType alongside.
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
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectEntries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectEntriesAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalEntrySchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalEntrySchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type variant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type variantAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type VariantObjectEntries<TKey extends string> = Record<
  TKey,
  BaseSchema<unknown, unknown, BaseIssue<unknown>> | OptionalEntrySchema
> &
  ObjectEntries;

export type VariantObjectEntriesAsync<TKey extends string> = Record<
  TKey,
  | BaseSchema<unknown, unknown, BaseIssue<unknown>>
  | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
  | OptionalEntrySchema
  | OptionalEntrySchemaAsync
> &
  ObjectEntriesAsync;

export interface VariantIssue extends BaseIssue<unknown> {
  /**
   * The issue kind.
   */
  readonly kind: 'schema';
  /**
   * The issue type.
   */
  readonly type: 'variant';
  /**
   * The expected property.
   */
  readonly expected: string;
}

export type VariantOptions<TKey extends string> = MaybeReadonly<
  VariantOption<TKey>[]
>;

export interface VariantOptionSchema<TKey extends string>
  extends BaseSchema<unknown, unknown, VariantIssue | BaseIssue<unknown>> {
  readonly type: 'variant';
  readonly reference: typeof variant;
  readonly key: string;
  readonly options: VariantOptions<TKey>;
  readonly message: ErrorMessage<VariantIssue> | undefined;
}

export type VariantOption<TKey extends string> =
  | LooseObjectSchema<
      VariantObjectEntries<TKey>,
      ErrorMessage<LooseObjectIssue> | undefined
    >
  | ObjectSchema<
      VariantObjectEntries<TKey>,
      ErrorMessage<ObjectIssue> | undefined
    >
  | ObjectWithRestSchema<
      VariantObjectEntries<TKey>,
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      ErrorMessage<ObjectWithRestIssue> | undefined
    >
  | StrictObjectSchema<
      VariantObjectEntries<TKey>,
      ErrorMessage<StrictObjectIssue> | undefined
    >
  | VariantOptionSchema<TKey>;

export type VariantOptionsAsync<TKey extends string> = MaybeReadonly<
  (VariantOption<TKey> | VariantOptionAsync<TKey>)[]
>;

export interface VariantOptionSchemaAsync<TKey extends string>
  extends BaseSchemaAsync<unknown, unknown, VariantIssue | BaseIssue<unknown>> {
  readonly type: 'variant';
  readonly reference: typeof variant | typeof variantAsync;
  readonly key: string;
  readonly options: VariantOptionsAsync<TKey>;
  readonly message: ErrorMessage<VariantIssue> | undefined;
}

export type VariantOptionAsync<TKey extends string> =
  | LooseObjectSchemaAsync<
      VariantObjectEntriesAsync<TKey>,
      ErrorMessage<LooseObjectIssue> | undefined
    >
  | ObjectSchemaAsync<
      VariantObjectEntriesAsync<TKey>,
      ErrorMessage<ObjectIssue> | undefined
    >
  | ObjectWithRestSchemaAsync<
      VariantObjectEntriesAsync<TKey>,
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      ErrorMessage<ObjectWithRestIssue> | undefined
    >
  | StrictObjectSchemaAsync<
      VariantObjectEntriesAsync<TKey>,
      ErrorMessage<StrictObjectIssue> | undefined
    >
  | VariantOptionSchemaAsync<TKey>;

export type InferVariantIssue<
  TOptions extends VariantOptions<string> | VariantOptionsAsync<string>,
> = Exclude<
  InferIssue<TOptions[number]>,
  { type: 'loose_object' | 'object' | 'object_with_rest' }
>;
