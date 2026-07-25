/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Boolean/Not.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Not<B extends Boolean> = {
    0: 1
    1: 0
}[B]
