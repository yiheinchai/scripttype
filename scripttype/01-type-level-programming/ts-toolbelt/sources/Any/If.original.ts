/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/If.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type If<B extends Boolean, Then, Else = never> =
    B extends 1
    ? Then
    : Else
