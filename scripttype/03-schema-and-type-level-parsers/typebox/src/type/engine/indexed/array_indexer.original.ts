/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/indexed/array_indexer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TConvertToIntegerKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TConvertLiteral<Value extends TLiteralValue,
  Result extends TSchema = TLiteral<TConvertToIntegerKey<Value>>
> = Result

export type TFormatArrayIndexer<Type extends TSchema,
  Result extends TSchema = (
    Type extends TIntersect<infer Types extends TSchema[]> ? TIntersect<TArrayIndexerTypes<Types>> :
    Type extends TUnion<infer Types extends TSchema[]> ? TUnion<TArrayIndexerTypes<Types>> :
    Type extends TLiteral<infer Value extends TLiteralValue> ? TConvertLiteral<Value> :
    Type
  )
> = Result

export type TArrayIndexerTypes<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TArrayIndexerTypes<Right, [...Result, TFormatArrayIndexer<Left>]>
    : Result
)
