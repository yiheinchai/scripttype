/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/actions/rawCheck/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IssuePathItem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface RawCheckIssue<TInput> extends BaseIssue<TInput> {
  /**
   * The issue kind.
   */
  readonly kind: 'validation';
  /**
   * The issue type.
   */
  readonly type: 'raw_check';
}

export interface RawCheckIssueInfo<TInput> {
  label?: string | undefined;
  input?: unknown | undefined;
  expected?: string | undefined;
  received?: string | undefined;
  message?: ErrorMessage<RawCheckIssue<TInput>> | undefined;
  path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
}

export type RawCheckAddIssue<TInput> = (
  info?: RawCheckIssueInfo<TInput>
) => void;
