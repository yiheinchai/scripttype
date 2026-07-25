/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/String/Join.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Literal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _Join<T extends List, D extends string> =
    T extends [] ? '' :
    T extends [Literal] ? `${T[0]}` :
    T extends [Literal, ...infer R] ? `${T[0]}${D}${_Join<R, D>}` :
    string

export type Join<T extends List<Literal>, D extends string = ''> =
    _Join<T, D> extends infer X
    ? Cast<X, string>
    : never
