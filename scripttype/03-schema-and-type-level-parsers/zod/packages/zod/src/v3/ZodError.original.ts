/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v3/ZodError.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ZodType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type util<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type allKeys<T> = T extends any ? keyof T : never;

export type typeToFlattenedError<T, U = string> = {
  formErrors: U[];
  fieldErrors: {
    [P in allKeys<T>]?: U[];
  };
};

export type inferFlattenedErrors<T extends ZodType<any, any, any>, U = string> = typeToFlattenedError<TypeOf<T>, U>;

export type ZodFormattedError<T, U = string> = {
  _errors: U[];
} & recursiveZodFormattedError<NonNullable<T>>;

export type recursiveZodFormattedError<T> = T extends [any, ...any[]]
  ? { [K in keyof T]?: ZodFormattedError<T[K]> }
  : T extends any[]
    ? { [k: number]: ZodFormattedError<T[number]> }
    : T extends object
      ? { [K in keyof T]?: ZodFormattedError<T[K]> }
      : unknown;

export type inferFormattedError<T extends ZodType<any, any, any>, U = string> = ZodFormattedError<TypeOf<T>, U>;

export type stripPath<T extends object> = T extends any ? util.OmitKeys<T, "path"> : never;
