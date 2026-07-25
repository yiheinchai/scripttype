/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/indexed/from_array.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtendsResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TConvertToIntegerKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TNormalizeLiteral<Value extends TLiteralValue,
  Result extends TSchema = TLiteral<TConvertToIntegerKey<Value>>
> = Result

export type TNormalizeIndexer<Type extends TSchema,
  Result extends TSchema = (
    Type extends TIntersect<infer Types extends TSchema[]> ? TIntersect<TNormalizeIndexerTypes<Types>> :
    Type extends TUnion<infer Types extends TSchema[]> ? TUnion<TNormalizeIndexerTypes<Types>> :
    Type extends TLiteral<infer Value extends TLiteralValue> ? TNormalizeLiteral<Value> :
    Type
  )
> = Result

export type TNormalizeIndexerTypes<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TNormalizeIndexerTypes<Right, [...Result, TNormalizeIndexer<Left>]>
    : Result
)

export type TFromArray<Type extends TSchema, Indexer extends TSchema,
  NormalizedIndexer extends TSchema = TNormalizeIndexer<Indexer>,
  Check extends ExtendsResult.TResult = TExtends<{}, NormalizedIndexer, TNumber>,
  Result extends TSchema = (
    // indexer
    Check extends ExtendsResult.TExtendsTrueLike 
      ? Type
      // length (intrinsic)
      : Indexer extends TLiteral<infer _ extends 'length'>
        ? TNumber
        : TNever
  )> = Result
