/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/classic/parse.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ZodError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ZodSafeParseSuccess<T> = { success: true; data: T; error?: never };

export type ZodSafeParseError<T> = { success: false; data?: never; error: ZodError<T> };

export type ZodSafeParseResult<T> = ZodSafeParseSuccess<T> | ZodSafeParseError<T>;
