/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/partial/partial.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Config<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferObjectInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferObjectOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectEntries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OptionalSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutputDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithoutPipe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
