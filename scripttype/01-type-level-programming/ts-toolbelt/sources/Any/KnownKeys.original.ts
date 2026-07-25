/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/KnownKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Keys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type KnownKeys<O extends object> = {
    [K in keyof O]:
    string extends K ? never :
    number extends K ? never :
    K
} extends {
    [K in keyof O]: infer U
} ? U & Keys<O> : never;
