/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/List/Unionize.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type At<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Unionize<L extends List, L1 extends List, K extends Key = Key> = {
    [P in keyof L]: P extends K
                    ? L[P] | At<L1, P>
                    : L[P]
}
