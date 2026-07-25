/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v3/helpers/parseUtil.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type DIRTY<T> = { status: "dirty"; value: T };

export type OK<T> = { status: "valid"; value: T };

export type INVALID = { status: "aborted" };

export type SyncParseReturnType<T = any> = OK<T> | DIRTY<T> | INVALID;

export type AsyncParseReturnType<T> = Promise<SyncParseReturnType<T>>;

export type ParseReturnType<T> = SyncParseReturnType<T> | AsyncParseReturnType<T>;
