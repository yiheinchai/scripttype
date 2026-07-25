/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/Record.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Modx<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Record<K extends Key, A extends any = unknown, modx extends Modx = ['!', 'W']> = {
    '!': {
        'R': {readonly [P in K]: A}
        'W': {         [P in K]: A}
    },
    '?': {
        'R': {readonly [P in K]?: A}
        'W': {         [P in K]?: A}
    }
}[modx[0]][modx[1]]
