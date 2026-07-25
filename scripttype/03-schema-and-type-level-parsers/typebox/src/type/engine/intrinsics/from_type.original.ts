/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/intrinsics/from_type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TFromLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TMappingType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromType<Mapping extends TMappingType, Type extends TSchema> = (
  Type extends TLiteral<infer Value extends TLiteralValue> ? TFromLiteral<Mapping, Value> :
  Type extends TTemplateLiteral<infer Pattern extends string> ? TFromTemplateLiteral<Mapping, Pattern> :
  Type extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Mapping, Types> :
  Type
)
