/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/priority/priority.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCompare<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TCompareResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TComparer<Left extends TSchema, Right extends TSchema,
  CompareResult extends TCompareResult = TCompare<Left, Right>,
  Result extends 0 | 1 = (
    CompareResult extends 'right-inside' ? 1 :
    CompareResult extends 'disjoint' ? 1 :
    0
  )
> = Result

export type TInsert<Type extends TSchema, Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TComparer<Type, Left> extends 1
      ? TInsert<Type, Right, [...Result, Left]>
      : [...Result, Type, ...Types]
    : [...Result, Type]
)

export type TSort<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TSort<Right, TInsert<Left, Result>>
    : Result
)

export type TPriority<Types extends TSchema[],
  Result extends TSchema[] = TSort<Types>,
> = Result
