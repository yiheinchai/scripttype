/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/Equals.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Equals<A1 extends any, A2 extends any> =
    (<A>() => A extends A2 ? 1 : 0) extends (<A>() => A extends A1 ? 1 : 0)
    ? 1
    : 0
