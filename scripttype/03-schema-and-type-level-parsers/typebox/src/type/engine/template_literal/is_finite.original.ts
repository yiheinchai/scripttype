/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/template_literal/is_finite.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromLiteral<_Value extends TLiteralValue> = true

export type TFromTypes<Types extends TSchema[],
  Result extends boolean = Types extends [] ? false : TFromTypesReduce<Types>
> = Result

export type TFromType<Type extends TSchema> =
  Type extends TUnion<infer Types extends TSchema[]> ? TFromTypes<Types> :
  Type extends TLiteral<infer Value extends TLiteralValue> ? TFromLiteral<Value> :
  false

export type TFromTypesReduce<Types extends TSchema[]> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TFromType<Left> extends true
    ? TFromTypesReduce<Right>
    : false
  : true
)

export type TIsTemplateLiteralFinite<Types extends TSchema[],
  Result extends boolean = TFromTypes<Types>
> = Result
