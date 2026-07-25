/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/evaluate/distribute.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TComposite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNarrow<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TIsObjectLike<Type extends TSchema> = (
  Type extends TObject<infer _ extends TProperties> ? true :
  Type extends TTuple<infer _ extends TSchema[]> ? true : 
  false
)

export type TIsUnionOperand<Left extends TSchema, Right extends TSchema,
  IsUnionLeft extends boolean = Left extends TUnion ? true : false,
  IsUnionRight extends boolean = Right extends TUnion ? true : false,
  Result extends boolean = IsUnionLeft extends true ? true : IsUnionRight extends true ? true : false
> = Result

export type TDistributeOperation<Left extends TSchema, Right extends TSchema,
  EvaluatedLeft extends TSchema = TEvaluateType<Left>,
  EvaluatedRight extends TSchema = TEvaluateType<Right>,
  IsUnionOperand extends boolean = TIsUnionOperand<EvaluatedLeft, EvaluatedRight>,
  IsObjectLeft extends boolean = TIsObjectLike<EvaluatedLeft>,
  IsObjectRight extends boolean = TIsObjectLike<EvaluatedRight>,
  Result extends TSchema = (
    [IsUnionOperand] extends [true] ? TEvaluateIntersect<[EvaluatedLeft, EvaluatedRight]> :
    [IsObjectLeft, IsObjectRight] extends [true, true] ? TComposite<EvaluatedLeft, EvaluatedRight> :
    [IsObjectLeft, IsObjectRight] extends [true, false] ? EvaluatedLeft :
    [IsObjectLeft, IsObjectRight] extends [false, true] ? EvaluatedRight :
    TNarrow<EvaluatedLeft, EvaluatedRight>
  )
> = Result

export type TDistributeType<Type extends TSchema, Distribution extends TSchema[], Result extends TSchema[] = []> = (
  Distribution extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TDistributeType<Type, Right, [ ...Result, TDistributeOperation<Type, Left>]>
    : Result extends [] 
      ? [Type] 
      : Result
)

export type TDistribute<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? Left extends TUnion<infer UnionTypes extends TSchema[]> 
      ? TDistribute<Right, TDistributeUnion<UnionTypes, Result>>
      : TDistribute<Right, TDistributeType<Left, Result>>
    : Result
)

export type TDistributeUnion<Types extends TSchema[], Distribution extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
   ? TDistributeUnion<Right, Distribution, [...Result, ...TDistribute<[Left], Distribution>]>
   : Result
)
