/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/template_literal/decode.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TIsTemplateLiteralFinite<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TParsePatternIntoTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnreachable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromLiteralPush<Variants extends string[], Value extends TLiteralValue, Result extends string[] = []> =
  Variants extends [infer Left extends string, ...infer Right extends string[]]
  ? TFromLiteralPush<Right, Value, [...Result, `${Left}${Value}`]>
  : Result

export type TFromLiteral<Variants extends string[], Value extends TLiteralValue> =
  Variants extends [] ? [`${Value}`] : TFromLiteralPush<Variants, Value>

export type TFromType<Variants extends string[], Type extends TSchema,
  Result extends string[] = (
    Type extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Variants, Types> :
    Type extends TLiteral<infer Value extends TLiteralValue> ? TFromLiteral<Variants, Value> :
    TUnreachable // []
  )
> = Result

export type TFromUnion<Variants extends string[], Types extends TSchema[], Result extends string[] = []> =
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TFromUnion<Variants, Right, [...Result, ...TFromType<Variants, Left>]>
  : Result

export type TDecodeFromSpan<Variants extends string[], Types extends TSchema[]> =
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TDecodeFromSpan<TFromType<Variants, Left>, Right>
  : Variants

export type TVariantsToLiterals<Variants extends string[], Result extends TSchema[] = []> =
  Variants extends [infer Left extends string, ...infer Right extends string[]]
  ? TVariantsToLiterals<Right, [...Result, TLiteral<Left>]>
  : Result

export type TDecodeTypesAsUnion<Types extends TSchema[],
  Variants extends string[] = TDecodeFromSpan<[], Types>,
  Literals extends TSchema[] = TVariantsToLiterals<Variants>,
  Result extends TSchema = TUnion<Literals>
> = Result

export type TDecodeTypes<Types extends TSchema[],
  Result extends TSchema = (
    Types extends [] ? TUnreachable : // TLiteral<''> :
    Types extends [infer Type extends TLiteral] ? Type :
    TDecodeTypesAsUnion<Types>
  )
> = Result

export type TTemplateLiteralDecodeUnsafe<Pattern extends string,
  Types extends TSchema[] = TParsePatternIntoTypes<Pattern>,
  Result extends TSchema = (
    Types extends []                            // Failed to Parse | IsTemplateLiteralPattern
    ? TString
    : TIsTemplateLiteralFinite<Types> extends true
    ? TDecodeTypes<Types>
    : TTemplateLiteral<Pattern>
  )
> = Result

export type TTemplateLiteralDecode<Pattern extends string,
  Decoded extends TSchema = TTemplateLiteralDecodeUnsafe<Pattern>,
  Result extends TSchema = Decoded extends TTemplateLiteral ? TString : Decoded
> = Result
