/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/indexed/from_object.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TEvaluateUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExpandThis<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TPropertyKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TToIndexableKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TIndexProperty<Properties extends TProperties, Key extends string,
  // note: we are trying to normalize the key to support numeric lookup via string (revise)
  CanonicalKey extends string = keyof Properties extends string | number ? `${keyof Properties}` : never,
  SelectedType extends TSchema = Key extends CanonicalKey ? Properties[Key] : TNever,
  Result extends TSchema = TExpandThis<Properties, SelectedType>,
> = Result

export type TIndexProperties<Properties extends TProperties, Keys extends string[], Result extends TSchema[] = []> = (
  Keys extends [infer Left extends string, ...infer Right extends string[]]
    ? TIndexProperties<Properties, Right, [...Result, TIndexProperty<Properties, Left>]>
    : Result
)

export type TFromIndexer<Properties extends TProperties, Indexer extends TSchema,
  Keys extends string[] = TToIndexableKeys<Indexer>,
  Variants extends TSchema[] = TIndexProperties<Properties, Keys>,
  Result extends TSchema = TEvaluateUnion<Variants>
> = Result

export type TNumericKeys<Keys extends string[], Result extends string[] = []> = (
  Keys extends [infer Left extends string, ...infer Right extends string[]]
    ? Left extends `${infer _ extends number}` 
      ? TNumericKeys<Right, [...Result, Left]> 
      : TNumericKeys<Right, Result> 
    : Result
)

export type TFromIndexerNumber<Properties extends TProperties,
  Keys extends string[] = TPropertyKeys<Properties>,
  NumericKeys extends string[] = TNumericKeys<Keys>,
  Variants extends TSchema[] = TIndexProperties<Properties, NumericKeys>,
  Result extends TSchema = TEvaluateUnion<Variants>
> = Result

export type TFromObject<Properties extends TProperties, Indexer extends TSchema,
  Result extends TSchema = Indexer extends TNumber ? TFromIndexerNumber<Properties> : TFromIndexer<Properties, Indexer>
> = Result
