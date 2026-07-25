/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/metadata.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface BaseMetadata<TInput> {
  /**
   * The object kind.
   */
  readonly kind: 'metadata';
  /**
   * The metadata type.
   */
  readonly type: string;
  /**
   * The metadata reference.
   */
  readonly reference: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => BaseMetadata<any>;
  /**
   * The input, output and issue type.
   *
   * @internal
   */
  readonly '~types'?:
    | {
        readonly input: TInput;
        readonly output: TInput;
        readonly issue: never;
      }
    | undefined;
}

export type GenericMetadata<TInput = any> = BaseMetadata<TInput>;
