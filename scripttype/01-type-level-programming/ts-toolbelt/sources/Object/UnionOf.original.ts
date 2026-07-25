/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/UnionOf.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type _UnionOf<O extends object> =
    O[keyof O]

export type UnionOf<O extends object> =
    O extends unknown
    ? _UnionOf<O>
    : never
