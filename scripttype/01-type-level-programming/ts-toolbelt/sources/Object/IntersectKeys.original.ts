/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Object/IntersectKeys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type At<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Is<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Keys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Match<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type _IntersectMatch<O extends object, O1 extends object, match extends Match> = {
    [K in keyof O]-?: {
        1: K
        0: never
    }[Is<O[K], At<O1, K>, match>]
}[keyof O]

export type IntersectMatch<O extends object, O1 extends object, match extends Match> =
    O extends unknown
    ? _IntersectMatch<O, O1, match>
    : never

export type IntersectKeys<O extends object, O1 extends object, match extends Match = 'default'> = {
    'default'     : Keys<O> & Keys<O1>
    'contains->'  : IntersectMatch<O,  O1, 'contains->'>
    'extends->'   : IntersectMatch<O,  O1, 'extends->'>
    '<-contains'  : IntersectMatch<O,  O1, '<-contains'>
    '<-extends'   : IntersectMatch<O,  O1, '<-extends'>
    'equals'      : IntersectMatch<O,  O1, 'equals'>
}[match]
