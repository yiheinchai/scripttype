/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/indexed/from_tuple.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtendsResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateUnionFast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFormatArrayIndexer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInteger<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TIndexElementsWithIndexer<Types extends TSchema[], Indexer extends TSchema, Result extends TSchema[] = []> = (
  Types extends [...infer Left extends TSchema[], infer Right extends TSchema]
    ? TExtends<{}, TLiteral<Left['length']>, Indexer> extends ExtendsResult.TExtendsTrueLike
      ? TIndexElementsWithIndexer<Left, Indexer, [Right, ...Result]>
      : TIndexElementsWithIndexer<Left, Indexer, Result>
    : Result
)

export type TFromTupleWithIndexer<Types extends TSchema[], Indexer extends TSchema,
  ArrayIndexer extends TSchema = TFormatArrayIndexer<Indexer>,
  Elements extends TSchema[] = TIndexElementsWithIndexer<Types, ArrayIndexer>,
  Result extends TSchema = TEvaluateUnionFast<Elements>
> = Result

export type TFromTupleWithoutIndexer<Types extends TSchema[],
  Result extends TSchema = TEvaluateUnionFast<Types>
> = Result

export type TFromTuple<Types extends TSchema[], Indexer extends TSchema,
  Result extends TSchema = (
    // length (intrinsic)
    Indexer extends TLiteral<infer _ extends 'length'>
      ? TLiteral<Types['length']>
      // indexer
      : Indexer extends TNumber | TInteger
        ? TFromTupleWithoutIndexer<Types>
        : TFromTupleWithIndexer<Types, Indexer>
  )
> = Result
