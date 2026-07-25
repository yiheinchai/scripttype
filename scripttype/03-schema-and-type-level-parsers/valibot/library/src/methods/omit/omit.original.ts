/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/omit/omit.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BaseIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseSchemaAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Config<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferObjectInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferObjectIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferObjectOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LooseObjectIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LooseObjectSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LooseObjectSchemaAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectEntries<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectEntriesAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectKeys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectSchemaAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectWithRestIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectWithRestSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ObjectWithRestSchemaAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OutputDataset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SchemaWithoutPipe<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StandardProps<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StrictObjectIssue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StrictObjectSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StrictObjectSchemaAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnknownDataset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Schema = SchemaWithoutPipe<
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
    >
>;

export type SchemaWithOmit<
  TSchema extends Schema,
  TKeys extends ObjectKeys<TSchema>,
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
      readonly entries: Omit<TEntries, TKeys[number]>;
      /**
       * The Standard Schema properties.
       *
       * @internal
       */
      readonly '~standard': StandardProps<
        InferObjectInput<Omit<TEntries, TKeys[number]>>,
        InferObjectOutput<Omit<TEntries, TKeys[number]>>
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
        InferObjectOutput<Omit<TEntries, TKeys[number]>>,
        | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
        | InferObjectIssue<Omit<TEntries, TKeys[number]>>
      >;
      /**
       * The input, output and issue type.
       *
       * @internal
       */
      readonly '~types'?:
        | {
            readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>>;
            readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>>;
            readonly issue:
              | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
              | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
          }
        | undefined;
    }
  : TSchema extends
        | ObjectSchemaAsync<
            infer TEntries,
            ErrorMessage<ObjectIssue> | undefined
          >
        | StrictObjectSchemaAsync<
            infer TEntries,
            ErrorMessage<StrictObjectIssue> | undefined
          >
    ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
        /**
         * The object entries.
         */
        readonly entries: Omit<TEntries, TKeys[number]>;
        /**
         * The Standard Schema properties.
         *
         * @internal
         */
        readonly '~standard': StandardProps<
          InferObjectInput<Omit<TEntries, TKeys[number]>>,
          InferObjectOutput<Omit<TEntries, TKeys[number]>>
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
        ) => Promise<
          OutputDataset<
            InferObjectOutput<Omit<TEntries, TKeys[number]>>,
            | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
            | InferObjectIssue<Omit<TEntries, TKeys[number]>>
          >
        >;
        /**
         * The input, output and issue type.
         *
         * @internal
         */
        readonly '~types'?:
          | {
              readonly input: InferObjectInput<Omit<TEntries, TKeys[number]>>;
              readonly output: InferObjectOutput<Omit<TEntries, TKeys[number]>>;
              readonly issue:
                | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
                | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
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
          readonly entries: Omit<TEntries, TKeys[number]>;
          /**
           * The Standard Schema properties.
           *
           * @internal
           */
          readonly '~standard': StandardProps<
            InferObjectInput<Omit<TEntries, TKeys[number]>> & {
              [key: string]: unknown;
            },
            InferObjectInput<Omit<TEntries, TKeys[number]>> & {
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
            InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
              [key: string]: unknown;
            },
            | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
            | InferObjectIssue<Omit<TEntries, TKeys[number]>>
          >;
          /**
           * The input, output and issue type.
           *
           * @internal
           */
          readonly '~types'?:
            | {
                readonly input: InferObjectInput<
                  Omit<TEntries, TKeys[number]>
                > & {
                  [key: string]: unknown;
                };
                readonly output: InferObjectOutput<
                  Omit<TEntries, TKeys[number]>
                > & {
                  [key: string]: unknown;
                };
                readonly issue:
                  | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
                  | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
              }
            | undefined;
        }
      : TSchema extends LooseObjectSchemaAsync<
            infer TEntries,
            ErrorMessage<LooseObjectIssue> | undefined
          >
        ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
            /**
             * The object entries.
             */
            readonly entries: Omit<TEntries, TKeys[number]>;
            /**
             * The Standard Schema properties.
             *
             * @internal
             */
            readonly '~standard': StandardProps<
              InferObjectInput<Omit<TEntries, TKeys[number]>> & {
                [key: string]: unknown;
              },
              InferObjectInput<Omit<TEntries, TKeys[number]>> & {
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
            ) => Promise<
              OutputDataset<
                InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
                  [key: string]: unknown;
                },
                | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
                | InferObjectIssue<Omit<TEntries, TKeys[number]>>
              >
            >;
            /**
             * The input, output and issue type.
             *
             * @internal
             */
            readonly '~types'?:
              | {
                  readonly input: InferObjectInput<
                    Omit<TEntries, TKeys[number]>
                  > & {
                    [key: string]: unknown;
                  };
                  readonly output: InferObjectOutput<
                    Omit<TEntries, TKeys[number]>
                  > & {
                    [key: string]: unknown;
                  };
                  readonly issue:
                    | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
                    | InferObjectIssue<Omit<TEntries, TKeys[number]>>;
                }
              | undefined;
          }
        : TSchema extends ObjectWithRestSchema<
              infer TEntries,
              BaseSchema<unknown, unknown, BaseIssue<unknown>>,
              ErrorMessage<ObjectWithRestIssue> | undefined
            >
          ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
              /**
               * The object entries.
               */
              readonly entries: Omit<TEntries, TKeys[number]>;
              /**
               * The Standard Schema properties.
               *
               * @internal
               */
              readonly '~standard': StandardProps<
                InferObjectInput<Omit<TEntries, TKeys[number]>> & {
                  [key: string]: InferInput<TSchema['rest']>;
                },
                InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
                  [key: string]: InferOutput<TSchema['rest']>;
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
                InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
                  [key: string]: InferOutput<TSchema['rest']>;
                },
                | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
                | InferObjectIssue<Omit<TEntries, TKeys[number]>>
                | InferIssue<TSchema['rest']>
              >;
              /**
               * The input, output and issue type.
               *
               * @internal
               */
              readonly '~types'?:
                | {
                    readonly input: InferObjectInput<
                      Omit<TEntries, TKeys[number]>
                    > & {
                      [key: string]: InferInput<TSchema['rest']>;
                    };
                    readonly output: InferObjectOutput<
                      Omit<TEntries, TKeys[number]>
                    > & { [key: string]: InferOutput<TSchema['rest']> };
                    readonly issue:
                      | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
                      | InferObjectIssue<Omit<TEntries, TKeys[number]>>
                      | InferIssue<TSchema['rest']>;
                  }
                | undefined;
            }
          : TSchema extends ObjectWithRestSchemaAsync<
                infer TEntries,
                BaseSchema<unknown, unknown, BaseIssue<unknown>>,
                ErrorMessage<ObjectWithRestIssue> | undefined
              >
            ? Omit<TSchema, 'entries' | '~standard' | '~run' | '~types'> & {
                /**
                 * The object entries.
                 */
                readonly entries: Omit<TEntries, TKeys[number]>;
                /**
                 * The Standard Schema properties.
                 *
                 * @internal
                 */
                readonly '~standard': StandardProps<
                  InferObjectInput<Omit<TEntries, TKeys[number]>> & {
                    [key: string]: InferInput<TSchema['rest']>;
                  },
                  InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
                    [key: string]: InferOutput<TSchema['rest']>;
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
                ) => Promise<
                  OutputDataset<
                    InferObjectOutput<Omit<TEntries, TKeys[number]>> & {
                      [key: string]: InferOutput<TSchema['rest']>;
                    },
                    | Extract<InferIssue<TSchema>, { type: TSchema['type'] }>
                    | InferObjectIssue<Omit<TEntries, TKeys[number]>>
                    | InferIssue<TSchema['rest']>
                  >
                >;
                /**
                 * The input, output and issue type.
                 *
                 * @internal
                 */
                readonly '~types'?:
                  | {
                      readonly input: InferObjectInput<
                        Omit<TEntries, TKeys[number]>
                      > & {
                        [key: string]: InferInput<TSchema['rest']>;
                      };
                      readonly output: InferObjectOutput<
                        Omit<TEntries, TKeys[number]>
                      > & { [key: string]: InferOutput<TSchema['rest']> };
                      readonly issue:
                        | Extract<
                            InferIssue<TSchema>,
                            { type: TSchema['type'] }
                          >
                        | InferObjectIssue<Omit<TEntries, TKeys[number]>>
                        | InferIssue<TSchema['rest']>;
                    }
                  | undefined;
              }
            : never;
