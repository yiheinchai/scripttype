/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Update.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OUpdate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Update<L extends List, K extends Key, A extends any> =
    Cast<OUpdate<L, `${K & number}` | K, A>, List>
