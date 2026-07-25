/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Union/Has.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Has<U extends any, U1 extends any> =
    [U1] extends [U]
    ? 1
    : 0
