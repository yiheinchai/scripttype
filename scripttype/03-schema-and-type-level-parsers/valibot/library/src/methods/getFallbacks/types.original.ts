/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/getFallbacks/types.ts, for comparison with the ScriptType alongside.
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
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferFallback<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseTupleIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseTupleSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseTupleSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictTupleIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictTupleSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictTupleSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleWithRestIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleWithRestSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TupleWithRestSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferFallbacks<
  TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = TSchema extends
  | LooseObjectSchema<
      infer TEntries,
      ErrorMessage<LooseObjectIssue> | undefined
    >
  | ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined>
  | ObjectWithRestSchema<
      infer TEntries,
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      ErrorMessage<ObjectWithRestIssue> | undefined
    >
  | StrictObjectSchema<
      infer TEntries,
      ErrorMessage<StrictObjectIssue> | undefined
    >
  ? { -readonly [TKey in keyof TEntries]: InferFallbacks<TEntries[TKey]> }
  : TSchema extends
        | LooseObjectSchemaAsync<
            infer TEntries,
            ErrorMessage<LooseObjectIssue> | undefined
          >
        | ObjectSchemaAsync<
            infer TEntries,
            ErrorMessage<ObjectIssue> | undefined
          >
        | ObjectWithRestSchemaAsync<
            infer TEntries,
            BaseSchema<unknown, unknown, BaseIssue<unknown>>,
            ErrorMessage<ObjectWithRestIssue> | undefined
          >
        | StrictObjectSchemaAsync<
            infer TEntries,
            ErrorMessage<StrictObjectIssue> | undefined
          >
    ? { -readonly [TKey in keyof TEntries]: InferFallbacks<TEntries[TKey]> }
    : TSchema extends
          | LooseTupleSchema<
              infer TItems,
              ErrorMessage<LooseTupleIssue> | undefined
            >
          | StrictTupleSchema<
              infer TItems,
              ErrorMessage<StrictTupleIssue> | undefined
            >
          | TupleSchema<infer TItems, ErrorMessage<TupleIssue> | undefined>
          | TupleWithRestSchema<
              infer TItems,
              BaseSchema<unknown, unknown, BaseIssue<unknown>>,
              ErrorMessage<TupleWithRestIssue> | undefined
            >
      ? { -readonly [TKey in keyof TItems]: InferFallbacks<TItems[TKey]> }
      : TSchema extends
            | LooseTupleSchemaAsync<
                infer TItems,
                ErrorMessage<LooseTupleIssue> | undefined
              >
            | StrictTupleSchemaAsync<
                infer TItems,
                ErrorMessage<StrictTupleIssue> | undefined
              >
            | TupleSchemaAsync<
                infer TItems,
                ErrorMessage<TupleIssue> | undefined
              >
            | TupleWithRestSchemaAsync<
                infer TItems,
                BaseSchema<unknown, unknown, BaseIssue<unknown>>,
                ErrorMessage<TupleWithRestIssue> | undefined
              >
        ? { -readonly [TKey in keyof TItems]: InferFallbacks<TItems[TKey]> }
        : Awaited<InferFallback<TSchema>>;
