/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Includes.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Match<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Includes<O extends object, M extends any, match extends Match = 'default'> =
    [SelectKeys<O, M, match>] extends [never]
    ? 0
    : 1
