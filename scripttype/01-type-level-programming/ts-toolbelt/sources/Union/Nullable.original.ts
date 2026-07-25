/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Union/Nullable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Nullable<U extends any> =
    U | undefined | null
