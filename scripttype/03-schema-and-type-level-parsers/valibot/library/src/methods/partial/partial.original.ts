/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/partial/partial.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Config<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferObjectInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferObjectOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LooseObjectIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LooseObjectSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectEntries<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectKeys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectWithRestIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectWithRestSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OptionalSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OutputDataset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SchemaWithoutPipe<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StandardProps<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StrictObjectIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StrictObjectSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownDataset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type PartialEntries<
  TEntries extends ObjectEntries,
  TKeys extends readonly (keyof TEntries)[] | undefined,
> = {
  [TKey in keyof TEntries]: TKeys extends readonly (keyof TEntries)[]
    ? TKey extends TKeys[number]
      ? OptionalSchema<TEntries[TKey], undefined>
      : TEntries[TKey]
    : OptionalSchema<TEntries[TKey], undefined>;
};

export type Schema = SchemaWithoutPipe<
  | LooseObjectSchema<ObjectEntries, ErrorMessage<LooseObjectIssue> | undefined>
  | ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue> | undefined>
  | ObjectWithRestSchema<
      ObjectEntries,
      BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      ErrorMessage<ObjectWithRestIssue> | undefined
    >
  | StrictObjectSchema<
      ObjectEntries,
      ErrorMessage<StrictObjectIssue> | undefined
    >
>;

export type SchemaWithPartial<
  TSchema extends Schema,
  TKeys extends ObjectKeys<TSchema> | undefined,
> = TSchema extends
  | ObjectSchema<infer TEntries, ErrorMessage<ObjectIssue> | undefined>
  | StrictObjectSchema<
      infer TEntries,
      ErrorMessage<StrictObjectIssue> | undefined
    >
  ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
      /**
       * The object entries.
       */
      readonly entries: PartialEntries<TEntries, TKeys>;
      /**
       * The Standard Schema properties.
       *
       * @internal
       */
      readonly '~standard': StandardProps<
        InferObjectInput<PartialEntries<TEntries, TKeys>>,
        InferObjectOutput<PartialEntries<TEntries, TKeys>>
      >;
      /**
       * Parses unknown input.
       *
       * @param dataset The input dataset.
       * @param config The configuration.
       *
       * @returns The output dataset.
       *
       * @internal
       */
      readonly '~run': (
        dataset: UnknownDataset,
        config: Config<BaseIssue<unknown>>
      ) => OutputDataset<
        InferObjectOutput<PartialEntries<TEntries, TKeys>>,
        InferIssue<TSchema>
      >;
      /**
       * The input, output and issue type.
       *
       * @internal
       */
      readonly '~types'?:
        | {
            readonly input: InferObjectInput<PartialEntries<TEntries, TKeys>>;
            readonly output: InferObjectOutput<PartialEntries<TEntries, TKeys>>;
            readonly issue: InferIssue<TSchema>;
          }
        | undefined;
    }
  : TSchema extends LooseObjectSchema<
        infer TEntries,
        ErrorMessage<LooseObjectIssue> | undefined
      >
    ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
        /**
         * The object entries.
         */
        readonly entries: PartialEntries<TEntries, TKeys>;
        /**
         * The Standard Schema properties.
         *
         * @internal
         */
        readonly '~standard': StandardProps<
          InferObjectInput<PartialEntries<TEntries, TKeys>> & {
            [key: string]: unknown;
          },
          InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
            [key: string]: unknown;
          }
        >;
        /**
         * Parses unknown input.
         *
         * @param dataset The input dataset.
         * @param config The configuration.
         *
         * @returns The output dataset.
         *
         * @internal
         */
        readonly '~run': (
          dataset: UnknownDataset,
          config: Config<BaseIssue<unknown>>
        ) => OutputDataset<
          InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
            [key: string]: unknown;
          },
          InferIssue<TSchema>
        >;
        /**
         * The input, output and issue type.
         *
         * @internal
         */
        readonly '~types'?:
          | {
              readonly input: InferObjectInput<
                PartialEntries<TEntries, TKeys>
              > & {
                [key: string]: unknown;
              };
              readonly output: InferObjectOutput<
                PartialEntries<TEntries, TKeys>
              > & {
                [key: string]: unknown;
              };
              readonly issue: InferIssue<TSchema>;
            }
          | undefined;
      }
    : TSchema extends ObjectWithRestSchema<
          infer TEntries,
          infer TRest,
          ErrorMessage<ObjectWithRestIssue> | undefined
        >
      ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
          /**
           * The object entries.
           */
          readonly entries: PartialEntries<TEntries, TKeys>;
          /**
           * The Standard Schema properties.
           *
           * @internal
           */
          readonly '~standard': StandardProps<
            InferObjectInput<PartialEntries<TEntries, TKeys>> & {
              [key: string]: InferInput<TRest>;
            },
            InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
              [key: string]: InferOutput<TRest>;
            }
          >;
          /**
           * Parses unknown input.
           *
           * @param dataset The input dataset.
           * @param config The configuration.
           *
           * @returns The output dataset.
           *
           * @internal
           */
          readonly '~run': (
            dataset: UnknownDataset,
            config: Config<BaseIssue<unknown>>
          ) => OutputDataset<
            InferObjectOutput<PartialEntries<TEntries, TKeys>> & {
              [key: string]: InferOutput<TRest>;
            },
            InferIssue<TSchema>
          >;
          /**
           * The input, output and issue type.
           *
           * @internal
           */
          readonly '~types'?:
            | {
                readonly input: InferObjectInput<
                  PartialEntries<TEntries, TKeys>
                > & {
                  [key: string]: InferInput<TRest>;
                };
                readonly output: InferObjectOutput<
                  PartialEntries<TEntries, TKeys>
                > & { [key: string]: InferOutput<TRest> };
                readonly issue: InferIssue<TSchema>;
              }
            | undefined;
        }
      : never;
