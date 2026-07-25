/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/actions/nanoid/nanoid.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ErrorMessage<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type nanoid<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface NanoIdIssue<TInput extends string> extends BaseIssue<TInput> {
  /**
   * The issue kind.
   */
  readonly kind: 'validation';
  /**
   * The issue type.
   */
  readonly type: 'nanoid';
  /**
   * The expected property.
   */
  readonly expected: null;
  /**
   * The received property.
   */
  readonly received: string;
  /**
   * The Nano ID regex.
   */
  readonly requirement: RegExp;
}

export type NanoIDIssue<TInput extends string> = NanoIdIssue<TInput>;

export interface NanoIdAction<
  TInput extends string,
  TMessage extends ErrorMessage<NanoIdIssue<TInput>> | undefined,
> extends BaseValidation<TInput, TInput, NanoIdIssue<TInput>> {
  /**
   * The action type.
   */
  readonly type: 'nanoid';
  /**
   * The action reference.
   */
  readonly reference: typeof nanoid;
  /**
   * The expected property.
   */
  readonly expects: null;
  /**
   * The Nano ID regex.
   */
  readonly requirement: RegExp;
  /**
   * The error message.
   */
  readonly message: TMessage;
}

export type NanoIDAction<
  TInput extends string,
  TMessage extends ErrorMessage<NanoIdIssue<TInput>> | undefined,
> = NanoIdAction<TInput, TMessage>;
