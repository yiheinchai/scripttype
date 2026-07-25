/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/extends.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TConstructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromRef<_Ref extends string> = (
  TAny
)

export type TFromTypes<Types extends TSchema[], Result extends TSchema[] = []> =
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TFromTypes<Right, [...Result, TFromType<Left>]>
  : Result

export type TFromType<Type extends TSchema> = (
  Type extends TRef<infer Ref extends string> ? TFromRef<Ref> :
  Type extends TArray<infer Type extends TSchema> ? TArray<TFromType<Type>> :
  Type extends TConstructor<infer Parameters extends TSchema[], infer InstanceType extends TSchema> ? TFunction<TFromTypes<Parameters>, TFromType<InstanceType>> :
  Type extends TFunction<infer Parameters extends TSchema[], infer ReturnType extends TSchema> ? TFunction<TFromTypes<Parameters>, TFromType<ReturnType>> :
  Type extends TIntersect<infer Types extends TSchema[]> ? TIntersect<TFromTypes<Types>> :
  Type extends TObject<infer Properties extends TProperties> ? TObject<TFromProperties<Properties>> :
  Type extends TRecord<infer Pattern extends string, infer Value extends TSchema> ? TRecord<Pattern, TFromType<Value>> :
  Type extends TUnion<infer Types extends TSchema[]> ? TUnion<TFromTypes<Types>> :
  Type extends TTuple<infer Types extends TSchema[]> ? TTuple<TFromTypes<Types>> :
  Type
)

export type TFromProperties<Properties extends TProperties, Result extends TProperties = {
  [Key in keyof Properties]: TFromType<Properties[Key]>
}> = { [Key in keyof Result]: Result[Key] }

export type TCyclicAnyFromParameters<Defs extends TProperties, Ref extends string> =  (
  Ref extends keyof Defs
    ? TFromType<Defs[Ref]>
    : TUnknown
)

export type TCyclicExtends<Type extends TCyclic,
  Result extends TSchema = TCyclicAnyFromParameters<Type['$defs'], Type['$ref']>
> = Result
