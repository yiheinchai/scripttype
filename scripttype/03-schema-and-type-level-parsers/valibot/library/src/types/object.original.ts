/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/object.ts, for comparison with the ScriptType alongside.
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
type ExactOptionalSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExactOptionalSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MarkOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NullishSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NullishSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithFallback<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithFallbackAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OptionalEntrySchema =
  | ExactOptionalSchema<
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      unknown
    >
  | NullishSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>
  | OptionalSchema<BaseSchema<unknown, unknown, BaseIssue<unknown>>, unknown>;

export interface ObjectEntries {
  [key: string]:
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | SchemaWithFallback<
        BaseSchema<unknown, unknown, BaseIssue<unknown>>,
        unknown
      >
    | OptionalEntrySchema;
}

export type OptionalEntrySchemaAsync =
  | ExactOptionalSchemaAsync<
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
    >;

export interface ObjectEntriesAsync {
  [key: string]:
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
    | SchemaWithFallback<
        BaseSchema<unknown, unknown, BaseIssue<unknown>>,
        unknown
      >
    | SchemaWithFallbackAsync<
        | BaseSchema<unknown, unknown, BaseIssue<unknown>>
        | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
        unknown
      >
    | OptionalEntrySchema
    | OptionalEntrySchemaAsync;
}

export type ObjectKeys<
  TSchema extends
    | LooseObjectSchema<
        ObjectEntries,
        ErrorMessage<LooseObjectIssue> | undefined
      >
    | LooseObjectSchemaAsync<
        ObjectEntriesAsync,
        ErrorMessage<LooseObjectIssue> | undefined
      >
    | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined>
    | ObjectSchemaAsync<
        ObjectEntriesAsync,
        ErrorMessage<ObjectIssue> | undefined
      >
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
      >,
> = MaybeReadonly<[keyof TSchema['entries'], ...(keyof TSchema['entries'])[]]>;

export type InferEntriesInput<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
  -readonly [TKey in keyof TEntries]: InferInput<TEntries[TKey]>;
};

export type InferEntriesOutput<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
  -readonly [TKey in keyof TEntries]: InferOutput<TEntries[TKey]>;
};

export type OptionalInputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
  [TKey in keyof TEntries]: TEntries[TKey] extends
    | OptionalEntrySchema
    | OptionalEntrySchemaAsync
    ? TKey
    : never;
}[keyof TEntries];

export type OptionalOutputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
  [TKey in keyof TEntries]: TEntries[TKey] extends
    | OptionalEntrySchema
    | OptionalEntrySchemaAsync
    ? undefined extends TEntries[TKey]['default']
      ? TKey
      : never
    : never;
}[keyof TEntries];

export type InputWithQuestionMarks<
  TEntries extends ObjectEntries | ObjectEntriesAsync,
  TObject extends InferEntriesInput<TEntries>,
> = MarkOptional<TObject, OptionalInputKeys<TEntries>>;

export type OutputWithQuestionMarks<
  TEntries extends ObjectEntries | ObjectEntriesAsync,
  TObject extends InferEntriesOutput<TEntries>,
> = MarkOptional<TObject, OptionalOutputKeys<TEntries>>;

export type ReadonlyOutputKeys<TEntries extends ObjectEntries | ObjectEntriesAsync> = {
  // NOTE: We use a structural `{ readonly pipe: readonly unknown[] }` check
  // plus indexed access instead of `SchemaWithPipe<infer TPipe>` because
  // `infer` forces TS to decompose the full `Omit + &` intersection of
  // `SchemaWithPipe` for every entry, which dominates check time on large
  // schemas (see issue #1374).
  [TKey in keyof TEntries]: TEntries[TKey] extends {
    readonly pipe: readonly unknown[];
  }
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ReadonlyAction<any> extends TEntries[TKey]['pipe'][number]
      ? TKey
      : never
    : never;
}[keyof TEntries];

export type OutputWithReadonly<
  TEntries extends ObjectEntries | ObjectEntriesAsync,
  TObject extends OutputWithQuestionMarks<
    TEntries,
    InferEntriesOutput<TEntries>
  >,
> =
  // NOTE: We short-circuit to `TObject` when no entry has a `ReadonlyAction`
  // to avoid building the `Readonly<T> & Pick<T, ...>` intersection in the
  // common case (see issue #1374).
  ReadonlyOutputKeys<TEntries> extends never
    ? TObject
    : Readonly<TObject> &
        Pick<TObject, Exclude<keyof TObject, ReadonlyOutputKeys<TEntries>>>;

export type InferObjectInput<
  TEntries extends ObjectEntries | ObjectEntriesAsync,
> = Prettify<InputWithQuestionMarks<TEntries, InferEntriesInput<TEntries>>>;

export type InferObjectOutput<
  TEntries extends ObjectEntries | ObjectEntriesAsync,
> = Prettify<
  OutputWithReadonly<
    TEntries,
    OutputWithQuestionMarks<TEntries, InferEntriesOutput<TEntries>>
  >
>;

export type InferObjectIssue<
  TEntries extends ObjectEntries | ObjectEntriesAsync,
> = InferIssue<TEntries[keyof TEntries]>;
