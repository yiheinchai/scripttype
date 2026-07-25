/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/classic/compat.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type core<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type inferFlattenedErrors<T extends core.$ZodType, U = string> = core.$ZodFlattenedError<core.output<T>, U>;

export type inferFormattedError<T extends core.$ZodType<any, any>, U = string> = core.$ZodFormattedError<
  core.output<T>,
  U
>;

export type BRAND<T extends string | number | symbol = string | number | symbol> = {
  [core.$brand]: { [k in T]: true };
};
