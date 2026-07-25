/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/mapped/mapped_variants.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnumValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromEnum<Values extends TEnumValue[],
  Evaluated extends TSchema = TEvaluateEnum<Values>,
  Result extends TSchema[] = TFromType<Evaluated>
> = Result

export type TFromLiteral<Value extends TLiteralValue, 
  Result extends TSchema[] = Value extends number ? [TLiteral<`${Value}`>] : [TLiteral<Value>]
> = Result

export type TFromUnion<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TFromUnion<Right, [...Result, ...TFromType<Left>]>
    : Result
)

export type TFromType<Type extends TSchema,
  Result extends TSchema[] = (
    Type extends TEnum<infer Values extends TEnumValue[]> ? TFromEnum<Values> :
    Type extends TLiteral<infer Value extends number> ? TFromLiteral<Value> :
    Type extends TTemplateLiteral<infer Pattern extends string> ? TFromTemplateLiteral<Pattern> :
    Type extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Types> :
    [Type]
  )
> = Result

export type TFromTemplateLiteral<Pattern extends string,
  Evaluated extends TSchema = TEvaluateTemplateLiteral<Pattern>,
  Result extends TSchema[] = TFromType<Evaluated>
> = Result

export type TMappedVariants<Type extends TSchema, 
  Result extends TSchema[] = TFromType<Type>
> = Result
