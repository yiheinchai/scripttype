/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/record/from_key.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TBoolean<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnumValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromAnyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromBooleanKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromEnumKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromIntegerKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromIntersectKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromLiteralKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromNumberKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromStringKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromTemplateKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromUnionKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInteger<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromKey<Key extends TSchema, Value extends TSchema,
  Result extends TSchema = (
    Key extends TAny ? TFromAnyKey<Value> :
    Key extends TBoolean ? TFromBooleanKey<Value> :
    Key extends TEnum<infer Values extends TEnumValue[]> ? TFromEnumKey<Values, Value> :
    Key extends TInteger ? TFromIntegerKey<Key, Value> :
    Key extends TIntersect<infer Types extends TSchema[]> ? TFromIntersectKey<Types, Value> :
    Key extends TLiteral<infer LiteralValue extends TLiteralValue> ? TFromLiteralKey<LiteralValue, Value> :
    Key extends TNumber ? TFromNumberKey<Key, Value> :
    Key extends TString ? TFromStringKey<Key, Value> :
    Key extends TTemplateLiteral<infer Pattern extends string> ? TFromTemplateKey<Pattern, Value> :
    Key extends TUnion<infer Types extends TSchema[]> ? TFromUnionKey<Types, Value> :
    TObject<{}>
  )
> = Result
