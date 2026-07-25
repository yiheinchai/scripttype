/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/tuple.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StaticDirection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StaticType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TImmutable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TOptional<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TReadonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRest<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TStaticElement<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Type extends TSchema,
  IsReadonly extends boolean = Type extends TReadonly ? true : false,
  IsOptional extends boolean = Type extends TOptional ? true : false,
  Inferred extends unknown = StaticType<Stack, Direction, Context, This, Type>,
  Result extends [unknown?] = (
    [IsReadonly, IsOptional] extends [true, true] ? [Readonly<Inferred>?] :
    [IsReadonly, IsOptional] extends [false, true] ? [Inferred?] :
    [IsReadonly, IsOptional] extends [true, false] ? [Readonly<Inferred>] :
    [Inferred]
   )
> = Result

export type StaticLast<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Type extends TSchema, Result extends unknown[]> = (
  Type extends TRest<infer RestType extends TSchema>
   ? RestType extends TArray<infer ArrayType extends TSchema>
     ? [...Result, ...TStaticElement<Stack, Direction, Context, This, ArrayType>[0][]]
     : [...Result, never]
   : [...Result, ...TStaticElement<Stack, Direction, Context, This, Type>]
)

export type TStaticElements<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Types extends TSchema[], Result extends unknown[] = []> = (
  Types extends [infer Last extends TSchema] ? StaticLast<Stack, Direction, Context, This, Last, Result> :
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TStaticElements<Stack, Direction, Context, This, Right, [...Result, ...TStaticElement<Stack, Direction, Context, This, Left>]>
    : Result
)

export type StaticTuple<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Tuple extends TSchema, Items extends TSchema[], 
  Elements extends unknown[] = TStaticElements<Stack, Direction, Context, This, Items>,
  Result extends readonly unknown[] = (
    Tuple extends TImmutable 
      ? readonly [...Elements] 
      : Elements
  )
> = Result
