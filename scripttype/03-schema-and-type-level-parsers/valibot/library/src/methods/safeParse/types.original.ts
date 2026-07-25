/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/safeParse/types.ts, for comparison with the ScriptType alongside.
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
type InferIssue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SafeParseResult<
  TSchema extends
    | BaseSchema<unknown, unknown, BaseIssue<unknown>>
    | BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> =
  | {
      /**
       * Whether it's typed.
       */
      readonly typed: true;
      /**
       * Whether it's successful.
       */
      readonly success: true;
      /**
       * The output value.
       */
      readonly output: InferOutput<TSchema>;
      /**
       * The issues, if any.
       */
      readonly issues: undefined;
    }
  | {
      readonly typed: true;
      readonly success: false;
      readonly output: InferOutput<TSchema>;
      readonly issues: [InferIssue<TSchema>, ...InferIssue<TSchema>[]];
    }
  | {
      readonly typed: false;
      readonly success: false;
      readonly output: unknown;
      readonly issues: [InferIssue<TSchema>, ...InferIssue<TSchema>[]];
    };
