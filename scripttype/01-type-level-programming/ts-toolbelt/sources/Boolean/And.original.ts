/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Boolean/And.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type And<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 0
    }
    1: {
      0: 0
      1: 1
    }
}[B1][B2]
