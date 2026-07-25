/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/utils/entriesFromObjects/entriesFromObjects.ts, for comparison with the ScriptType alongside.
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
type LooseObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Merge<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectEntries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectEntriesAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Schema =
  | LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined>
  | LooseObjectSchemaAsync<
      ObjectEntriesAsync,
      ErrorMessage<LooseObjectIssue> | undefined
    >
  | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined>
  | ObjectSchemaAsync<ObjectEntriesAsync, ErrorMessage<ObjectIssue> | undefined>
  | ObjectWithRestSchema<
      ObjectEntries,
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      ErrorMessage<ObjectWithRestIssue> | undefined
    >
  | ObjectWithRestSchemaAsync<
      ObjectEntriesAsync,
      | BaseSchema<unknown, unknown, BaseIssue<unknown>>
      | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
      ErrorMessage<ObjectWithRestIssue> | undefined
    >
  | StrictObjectSchema<
      ObjectEntries,
      ErrorMessage<StrictObjectIssue> | undefined
    >
  | StrictObjectSchemaAsync<
      ObjectEntriesAsync,
      ErrorMessage<StrictObjectIssue> | undefined
    >;

export type RecursiveMerge<TSchemas extends readonly [Schema, ...Schema[]]> =
  TSchemas extends readonly [infer TFirstSchema extends Schema]
    ? TFirstSchema['entries']
    : TSchemas extends readonly [
          infer TFirstSchema extends Schema,
          ...infer TRestSchemas extends readonly [Schema, ...Schema[]],
        ]
      ? Merge<TFirstSchema['entries'], RecursiveMerge<TRestSchemas>>
      : never;

export type MergedEntries<TSchemas extends readonly [Schema, ...Schema[]]> = Prettify<
  RecursiveMerge<TSchemas>
>;
