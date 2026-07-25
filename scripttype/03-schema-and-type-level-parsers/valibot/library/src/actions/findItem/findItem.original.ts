/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/actions/findItem/findItem.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArrayInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ArrayRequirement<
  TInput extends ArrayInput,
  TOuput extends TInput[number],
> =
  | ((item: TInput[number], index: number, array: TInput) => item is TOuput)
  | ((item: TInput[number], index: number, array: TInput) => boolean);
