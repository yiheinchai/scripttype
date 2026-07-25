/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/_Internal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Anyfy<O extends object> = {
    [K in keyof O]: any
}
