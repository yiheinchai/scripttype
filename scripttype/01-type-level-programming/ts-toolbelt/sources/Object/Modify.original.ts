/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Modify.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type At<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Replace<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type x<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Modify<O extends object, OMod extends object> = {
    [K in keyof OMod]: Replace<OMod[K], x, Exclude<At<O, K>, undefined>>
} & {}
