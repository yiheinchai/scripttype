/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Overwrite.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1
                    ? O1[K]
                    : O[K]
} & {}
