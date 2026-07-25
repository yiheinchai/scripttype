/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Union/Diff.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Diff<U1 extends any, U2 extends any> =
    Exclude<U1, U2> | Exclude<U2, U1>
