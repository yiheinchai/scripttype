/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Any/Is.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Contains<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Equals<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Match<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Is<A extends any, A1 extends any, match extends Match = 'default'> = {
    'default'   : Extends<A,   A1>
    'contains->': Contains<A,  A1>
    'extends->' : Extends<A,   A1>
    '<-contains': Contains<A1, A>
    '<-extends' : Extends<A1,  A>
    'equals'    : Equals<A1,   A>
}[match]
