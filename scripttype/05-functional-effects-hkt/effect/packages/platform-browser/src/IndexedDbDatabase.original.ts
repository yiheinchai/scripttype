/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/platform-browser/src/IndexedDbDatabase.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedDbTable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedDbVersion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type IsStringLiteral<T> = T extends string ? string extends T ? false
  : true
  : false

export type IndexFromTable<Table extends IndexedDbTable.AnyWithProps> = IsStringLiteral<
  Extract<keyof IndexedDbTable.Indexes<Table>, string>
> extends true ? Extract<keyof IndexedDbTable.Indexes<Table>, string>
  : never

export type IndexFromTableName<
  Version extends IndexedDbVersion.AnyWithProps,
  Table extends string
> = IndexFromTable<
  IndexedDbTable.WithName<IndexedDbVersion.Tables<Version>, Table>
>
