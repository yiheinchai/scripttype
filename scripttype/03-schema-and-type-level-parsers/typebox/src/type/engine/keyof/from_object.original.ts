/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/keyof/from_object.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateUnionFast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLiteralValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnreachable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromPropertyKeys<Keys extends PropertyKey[], Result extends TSchema[] = []> = (
  Keys extends [infer Left extends PropertyKey, ...infer Right extends PropertyKey[]]
    // Note: We do not need to convert keys into integers, as TypeScript 
    // automatically handles this conversion when deriving property keys using 
    // the `keyof` operator.
    //
    // However, there is some ambiguity: TypeScript does not convert numeric 
    // string keys. As a result, the `ConvertToIntegerKey()` algorithm cannot 
    // determine whether to convert them to integers. `Object.keys()` always 
    // returns strings, meaning numeric-looking strings are converted, but 
    // TypeScript may retain the string when using `keyof`.
    ? Left extends TLiteralValue
      ? TFromPropertyKeys<Right, [...Result, TLiteral<Left>]> // divergence
      : TUnreachable
    : Result
)

export type TFromObject<Properties extends TProperties,
  PropertyKeys extends PropertyKey[] = TUnionToTuple<keyof Properties>,
  Variants extends TSchema [] = TFromPropertyKeys<PropertyKeys>,
  Result extends TSchema = TEvaluateUnionFast<Variants>
> =  Result
