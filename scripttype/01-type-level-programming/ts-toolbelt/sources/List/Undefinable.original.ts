/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Undefinable.ts, for comparison with the ScriptType alongside.
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
type Update<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type x<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Undefinable<L extends List, K extends Key = Key> =
    Cast<Update<L, `${K & number}` | K, x | undefined>, List>
