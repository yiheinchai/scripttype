/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/actions/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MaybePromise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybeReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ArrayInput = MaybeReadonly<unknown[]>;

export type ArrayRequirement<TInput extends ArrayInput> = (
  item: TInput[number],
  index: number,
  array: TInput
) => boolean;

export type ArrayRequirementAsync<TInput extends ArrayInput> = (
  item: TInput[number],
  index: number,
  array: TInput
) => MaybePromise<boolean>;

export type ContentInput = string | MaybeReadonly<unknown[]>;

export type ContentRequirement<TInput extends ContentInput> =
  TInput extends readonly unknown[] ? TInput[number] : TInput;
