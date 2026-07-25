/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/RequiredKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _RequiredKeys<O extends object> = {
    [K in keyof O]-?: {} extends Pick<O, K> ? never : K
}[keyof O]

export type RequiredKeys<O extends object> =
    O extends unknown
    ? _RequiredKeys<O>
    : never
