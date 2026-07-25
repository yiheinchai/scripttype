/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Modify.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type At<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Replace<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type x<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Modify<L extends List, LMod extends List> = Cast<{
    [K in keyof LMod]: Replace<LMod[K], x, Exclude<At<L, K>, undefined>>
}, List>
