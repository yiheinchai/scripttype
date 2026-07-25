/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/this/expand_this.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TConstructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TThis<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromType<Properties extends TProperties, Type extends TSchema> = (
  Type extends TArray<infer Type extends TSchema> ? TArray<TFromType<Properties, Type>> :
  Type extends TConstructor<infer Parameters extends TSchema[], infer InstanceType extends TSchema> ? TConstructor<TFromTypes<Properties, Parameters>, TFromType<Properties, InstanceType>> :
  Type extends TFunction<infer Parameters extends TSchema[], infer ReturnType extends TSchema> ? TFunction<TFromTypes<Properties, Parameters>, TFromType<Properties, ReturnType>> :
  Type extends TTuple<infer Types extends TSchema[]> ? TTuple<TFromTypes<Properties, Types>> :
  Type extends TUnion<infer Types extends TSchema[]> ? TUnion<TFromTypes<Properties, Types>> :
  Type extends TIntersect<infer Types extends TSchema[]> ? TIntersect<TFromTypes<Properties, Types>> :
  Type extends TThis ? TObject<Properties> :
  Type
)

export type TFromTypes<Properties extends TProperties, Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TFromTypes<Properties, Right, [...Result, TFromType<Properties, Left>]>
    : Result
)

export type TExpandThis<Properties extends TProperties, Type extends TSchema,
  Result extends TSchema = TFromType<Properties, Type>
> = Result
