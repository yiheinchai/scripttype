/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/UndefinableKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type _UndefinableKeys<O extends object> = {
    [K in keyof O]-?: [O[K] & (undefined)] extends [never]
                      ? never
                      : K
}[keyof O]

export type UndefinableKeys<O extends object> =
    O extends unknown
    ? _UndefinableKeys<O>
    : never
