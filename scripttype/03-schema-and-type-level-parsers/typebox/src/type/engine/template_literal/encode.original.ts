/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/template_literal/encode.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BigIntPattern<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntegerPattern<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NeverPattern<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NumberPattern<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringPattern<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TBigInt<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TBoolean<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnumValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInteger<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TJoinString<Input extends string[], Result extends string = ''> = (
  Input extends [infer Left extends string, ...infer Right extends string[]]
    ? Result extends '' 
      ? TJoinString<Right, Left>
      : TJoinString<Right, `${Result}|${Left}`>
    : Result
)

export type TUnwrapTemplateLiteralPattern<Pattern extends string> = (
  Pattern extends `^${infer Pattern extends string}$` ? Pattern : never
)

export type TEncodeEnum<Values extends TEnumValue[], Right extends TSchema[], Pattern extends string,
  Evaluated extends TSchema = TEvaluateEnum<Values>
> = TEncodeType<Evaluated, Right, Pattern>

export type TEncodeInteger<Right extends TSchema[], Pattern extends string> = (
  TEncodeTypes<Right, `${Pattern}${typeof IntegerPattern}`>
)

export type TEncodeBigInt<Right extends TSchema[], Pattern extends string> = (
   TEncodeTypes<Right, `${Pattern}${typeof BigIntPattern}`>
)

export type TEncodeBoolean<Right extends TSchema[], Pattern extends string> = (
  TEncodeType<TUnion<[TLiteral<'false'>, TLiteral<'true'>]>, Right, Pattern>
)

export type TEncodeNumber<Right extends TSchema[], Pattern extends string> = (
  TEncodeTypes<Right, `${Pattern}${typeof NumberPattern}`>
)

export type TEncodeString<Right extends TSchema[], Pattern extends string> = (
   TEncodeTypes<Right, `${Pattern}${typeof StringPattern}`>
)

export type TEncodeTemplateLiteral<TemplatePattern extends string, Right extends TSchema[], Pattern extends string> = (
  TEncodeTypes<Right, `${Pattern}${TUnwrapTemplateLiteralPattern<TemplatePattern>}`>
)

export type TEncodeTemplateLiteralDeferred<Types extends TSchema[], Right extends TSchema[], Pattern extends string,
  TemplateLiteral extends TSchema = TTemplateLiteralAction<Types>,
  Result extends TSchema = TEncodeType<TemplateLiteral, Right, Pattern>
> = Result

export type TEncodeUnion<Types extends TSchema[], Right extends TSchema[], Pattern extends string, Result extends string[] = []> = 
  Types extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
    ? TEncodeUnion<Tail, Right, Pattern, [...Result, TEncodeType<Head, [], ''>]>
    : TEncodeTypes<Right, `${Pattern}(${TJoinString<Result>})`>

export type TEncodeType<Type extends TSchema, Right extends TSchema[], Pattern extends string> = (
  Type extends TEnum<infer Values extends TEnumValue[]> ? TEncodeEnum<Values, Right, Pattern> :
  Type extends TInteger ? TEncodeInteger<Right, Pattern> :
  Type extends TLiteral<infer Value extends TLiteralValue> ? TEncodeLiteral<Value, Right, Pattern> :
  Type extends TBigInt ? TEncodeBigInt<Right, Pattern> :
  Type extends TBoolean ? TEncodeBoolean<Right, Pattern> :
  Type extends TNumber ? TEncodeNumber<Right, Pattern> :
  Type extends TString ? TEncodeString<Right, Pattern> :
  Type extends TTemplateLiteral<infer TemplatePattern extends string> ? TEncodeTemplateLiteral<TemplatePattern, Right, Pattern> :
  Type extends TTemplateLiteralDeferred<infer Types extends TSchema[]> ? TEncodeTemplateLiteralDeferred<Types, Right, Pattern> :
  Type extends TUnion<infer Types extends TSchema[]> ? TEncodeUnion<Types, Right, Pattern> :
  typeof NeverPattern
)

export type TEncodeTypes<Types extends TSchema[], Pattern extends string> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TEncodeType<Left, Right, Pattern>
    : Pattern
)

export type TEncodeLiteral<Value extends TLiteralValue, Right extends TSchema[], Pattern extends string> = (
  TEncodeTypes<Right, `${Pattern}${Value}`>
)

export type TEncodePattern<Types extends TSchema[],
  Encoded extends string = TEncodeTypes<Types, ''>,
  Result extends string = `^${Encoded}$`
> = Result

export type TTemplateLiteralEncode<Types extends TSchema[],
  Pattern extends string = TEncodePattern<Types>,
  Result extends TSchema = TTemplateLiteral<Pattern>
> = Result
