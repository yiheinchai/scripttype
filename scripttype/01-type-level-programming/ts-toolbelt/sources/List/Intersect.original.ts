/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Intersect.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ListOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Match<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ObjectOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Intersect<L extends List, L1 extends List, match extends Match = 'default'> =
    ListOf<OIntersect<ObjectOf<L>, ObjectOf<L1>, match>>
