/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/core/core.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type schemas<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type $brand<T extends string | number | symbol = string | number | symbol> = {
  [$brand]: { [k in T]: true };
};

export type input<T> = T extends { _zod: { input: any } } ? T["_zod"]["input"] : unknown;

export type output<T> = T extends { _zod: { output: any } } ? T["_zod"]["output"] : unknown;

export type $ZodBranded<
  T extends schemas.SomeType,
  Brand extends string | number | symbol,
  Dir extends "in" | "out" | "inout" = "out",
> = T &
  (Dir extends "inout"
    ? { _zod: { input: input<T> & $brand<Brand>; output: output<T> & $brand<Brand> } }
    : Dir extends "in"
      ? { _zod: { input: input<T> & $brand<Brand> } }
      : { _zod: { output: output<T> & $brand<Brand> } });

export type $ZodNarrow<T extends schemas.SomeType, Out> = T & { _zod: { output: Out } };
