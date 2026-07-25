/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/omit/omit.ts, for comparison with the ScriptType alongside.
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
type Config<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferObjectInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferObjectOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectEntries<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectEntriesAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectWithRestSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutputDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaWithoutPipe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StrictObjectSchemaAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownDataset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
