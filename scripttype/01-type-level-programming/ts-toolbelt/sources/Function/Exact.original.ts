/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Function/Exact.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Narrowable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Exact<A, W> =
W extends unknown ?
    A extends W
    ? A extends Narrowable
      ? A
      : {
            [K in keyof A]: K extends keyof W
                            ? Exact<A[K], W[K]>
                            : never
        }
    : W
: never;
