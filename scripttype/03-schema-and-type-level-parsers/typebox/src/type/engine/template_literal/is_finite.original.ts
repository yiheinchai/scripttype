/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/template_literal/is_finite.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TLiteralValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
