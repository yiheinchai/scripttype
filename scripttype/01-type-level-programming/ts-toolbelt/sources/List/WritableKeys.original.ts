/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/WritableKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OWritableKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type WritableKeys<L extends List> =
    OWritableKeys<ObjectOf<L>>
