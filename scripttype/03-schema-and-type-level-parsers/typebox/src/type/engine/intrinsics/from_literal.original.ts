/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/intrinsics/from_literal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TApplyMapping<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TMappingType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromLiteral<Mapping extends TMappingType, Value extends TLiteralValue> = (
  Value extends string 
    ? TLiteral<TApplyMapping<Mapping, Value>> 
    : TLiteral<Value>
)
