/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/Extends.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Extends<A1 extends any, A2 extends any> =
    [A1] extends [never]
    ? 0
    : A1 extends A2
      ? 1
      : 0
