/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/evaluate/evaluate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TBroaden<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TDependent<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TDistribute<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TEnum<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TEnumValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TExcludeOperation<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TIntersect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTemplateLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTemplateLiteralDecode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TEvaluateUnionFast<Types extends TSchema[],
  Result extends TSchema = (
    Types extends [infer Type extends TSchema] ? Type :
    Types extends [] ? TNever :
    TUnion<Types>
  )
> = Result

export type TEvaluateUnion<Types extends TSchema[],
  Broadend extends TSchema[] = TBroaden<Types>,
  Result extends TSchema = TEvaluateUnionFast<Broadend>
> = Result

export type TEvaluateDependent<If extends TSchema, Then extends TSchema, Else extends TSchema,
  Intersect extends TSchema = TIntersect<[If, Then]>,
  Excluded extends TSchema = TExcludeOperation<Else, If>,
  Result extends TSchema = TEvaluateUnion<[Intersect, Excluded]>
> = Result

export type TEvaluateEnum<Values extends TEnumValue[], Result extends TSchema[] = []> = (
  Values extends [infer Left extends TEnumValue, ...infer Right extends TEnumValue[]]
  ? TEvaluateEnum<Right, [...Result, TLiteral<Left>]>
  : TEvaluateUnion<Result>
)

export type TEvaluateIntersect<Types extends TSchema[],
  Distribution extends TSchema[] = TDistribute<Types>,
  Broadend extends TSchema[] = TBroaden<Distribution>,
  Result extends TSchema = TEvaluateUnionFast<Broadend>
> = Result

export type TEvaluateType<Type extends TSchema,
  Result extends TSchema = (
    Type extends TDependent<infer If extends TSchema, infer Then extends TSchema, infer Else extends TSchema> ? TEvaluateDependent<If, Then, Else> :
    Type extends TEnum<infer Values extends TEnumValue[]> ? TEvaluateEnum<Values> :
    Type extends TIntersect<infer Types extends TSchema[]> ? TEvaluateIntersect<Types> :
    Type extends TTemplateLiteral<infer Pattern extends string> ? TEvaluateTemplateLiteral<Pattern> :
    Type extends TUnion<infer Types extends TSchema[]> ? TEvaluateUnion<Types> :
    Type
  )
> = Result

export type TEvaluateTemplateLiteral<Pattern extends string,
  Evaluated extends TSchema = TTemplateLiteralDecode<Pattern>,
  Result extends TSchema = TEvaluateType<Evaluated>
> = Result
