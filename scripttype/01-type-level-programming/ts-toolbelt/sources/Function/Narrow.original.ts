/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Function/Narrow.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Narrowable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Try<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NarrowRaw<A> =
| (A extends [] ? [] : never)
| (A extends Narrowable ? A : never)
| ({[K in keyof A]: A[K] extends Function
                    ? A[K]
                    : NarrowRaw<A[K]>});

export type Narrow<A extends any> =
    Try<A, [], NarrowRaw<A>>
