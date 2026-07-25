/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v3/standard-schema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StandardSchemaV1<Input = unknown, Output = Input> = {
  /**
   * The Standard Schema properties.
   */
  readonly "~standard": StandardSchemaV1.Props<Input, Output>;
};

export interface SuccessResult<Output> {
    /**
     * The typed output value.
     */
    readonly value: Output;
    /**
     * The non-existent issues.
     */
    readonly issues?: undefined;
  }

export interface PathSegment {
    /**
     * The key representing a path segment.
     */
    readonly key: PropertyKey;
  }

export interface Issue {
    /**
     * The error message of the issue.
     */
    readonly message: string;
    /**
     * The path of the issue, if any.
     */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }

export interface FailureResult {
    /**
     * The issues of failed validation.
     */
    readonly issues: ReadonlyArray<Issue>;
  }

export type Result<Output> = SuccessResult<Output> | FailureResult;

export type InferInput<Schema extends StandardSchemaV1> = NonNullable<Schema["~standard"]["types"]>["input"];

export type InferOutput<Schema extends StandardSchemaV1> = NonNullable<Schema["~standard"]["types"]>["output"];
