/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/standard.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface StandardSuccessResult<TOutput> {
  /**
   * The typed output value.
   */
  readonly value: TOutput;
  /**
   * The non-existent issues.
   */
  readonly issues?: undefined;
}

export interface StandardPathItem {
  /**
   * The key of the path item.
   */
  readonly key: PropertyKey;
}

export interface StandardIssue {
  /**
   * The error message of the issue.
   */
  readonly message: string;
  /**
   * The path of the issue, if any.
   */
  readonly path?: readonly (PropertyKey | StandardPathItem)[] | undefined;
}

export interface StandardFailureResult {
  /**
   * The issues of failed validation.
   */
  readonly issues: readonly StandardIssue[];
}

export type StandardResult<TOutput> =
  | StandardSuccessResult<TOutput>
  | StandardFailureResult;
