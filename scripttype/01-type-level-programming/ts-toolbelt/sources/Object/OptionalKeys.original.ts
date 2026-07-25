/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/OptionalKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type _OptionalKeys<O extends object> = {
    [K in keyof O]-?: {} extends Pick<O, K>
                      ? K
                      : never
}[keyof O]

export type OptionalKeys<O extends object> =
    O extends unknown
    ? _OptionalKeys<O>
    : never
