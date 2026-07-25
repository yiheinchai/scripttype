/**
 * ORIGINAL TypeScript from 07-compiler-internals/typescript/src/compiler/utilities.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K]; };
