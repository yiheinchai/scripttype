/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/String/Split.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pop<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
