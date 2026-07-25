/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/template_literal/static.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TBigInt<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInteger<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TParsePatternIntoTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromLiteral<Template extends string, Value extends TLiteralValue> = `${Template}${Value}`

export type TFromBigInt<Template extends string> = `${Template}${bigint}`

export type TFromString<Template extends string> = `${Template}${string}`

export type TFromNumber<Template extends string> = `${Template}${number}`

export type TFromInteger<Template extends string> = `${Template}${number}`

export type TFromType<Template extends string, Type extends TSchema,
  Result extends string = (
    Type extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Template, Types> :
    Type extends TLiteral<infer Value extends TLiteralValue> ? TFromLiteral<Template, Value> :
    Type extends TBigInt ? TFromBigInt<Template> :
    Type extends TString ? TFromString<Template> :
    Type extends TNumber ? TFromNumber<Template> :
    Type extends TInteger ? TFromInteger<Template> :
    never
  )
> = Result

export type TFromUnion<Template extends string, Types extends TSchema[], Result extends string = never> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TFromUnion<Template, Right, Result | TFromType<'', Left>>
    : `${Template}${Result}`
)

export type TFromSpan<Template extends string, Types extends TSchema[]> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TFromSpan<TFromType<Template, Left>, Right>
    : Template
)

export type TTemplateLiteralStatic<Pattern extends string, 
  Types extends TSchema[] = TParsePatternIntoTypes<Pattern>,
> = TFromSpan<'', Types>
