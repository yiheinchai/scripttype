/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/flatten/flatten.ts, for comparison with the ScriptType alongside.
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
type IssueDotPath<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FlatErrors<
  TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
    | undefined,
> = Prettify<{
  /**
   * The root errors.
   *
   * Hint: The error messages of issues without a path that belong to the root
   * of the schema are added to this key.
   */
  readonly root?: [string, ...string[]];
  /**
   * The nested errors.
   *
   * Hint: The error messages of issues with a path that belong to the nested
   * parts of the schema and can be converted to a dot path are added to this
   * key.
   */
  readonly nested?: Prettify<
    Readonly<
      Partial<
        Record<
          TSchema extends
            | BaseSchema<unknown, unknown, BaseIssue<unknown>>
            | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>
            ? IssueDotPath<TSchema>
            : string,
          [string, ...string[]]
        >
      >
    >
  >;
  /**
   * The other errors.
   *
   * Hint: Some issue paths, for example for complex data types like `Set` and
   * `Map`, have no key or a key that cannot be converted to a dot path. These
   * error messages are added to this key.
   */
  readonly other?: [string, ...string[]];
}>;
