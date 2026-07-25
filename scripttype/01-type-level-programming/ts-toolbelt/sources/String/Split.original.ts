/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/String/Split.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pop<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type __Split<S extends string, D extends string, T extends string[] = []> =
    S extends `${infer BS}${D}${infer AS}`
    ? __Split<AS, D, [...T, BS]>
    : [...T, S]

export type _Split<S extends string, D extends string = ''> =
    D extends '' ? Pop<__Split<S, D>> : __Split<S, D>

export type Split<S extends string, D extends string = ''> =
    _Split<S, D> extends infer X
    ? Cast<X, string[]>
    : never
