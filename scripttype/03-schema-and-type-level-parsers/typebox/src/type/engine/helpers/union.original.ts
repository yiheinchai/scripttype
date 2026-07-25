/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/helpers/union.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TTupleToIntersect<T extends any[]> = T extends [infer I] ? I : T extends [infer I, ...infer R] ? I & TTupleToIntersect<R> : never

export type TTupleToUnion<T extends any[]> = { [K in keyof T]: T[K] }[number]

export type TUnionToIntersect<U> = (U extends unknown ? (arg: U) => 0 : never) extends (arg: infer I) => 0 ? I : never

export type TUnionLast<U> = TUnionToIntersect<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0 ? L : never

export type TUnionToTuple<U, Result extends unknown[] = [], R = TUnionLast<U>> = [U] extends [never] ? Result : TUnionToTuple<Exclude<U, R>, [Extract<U, R>, ...Result]>
