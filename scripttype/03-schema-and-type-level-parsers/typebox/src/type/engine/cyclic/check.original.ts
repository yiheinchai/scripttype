/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/check.ts, for comparison with the ScriptType alongside.
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
type TInterfaceDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TPropertyValues<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromTypes<Stack extends (keyof Context)[], Context extends TProperties, Types extends TSchema[]> =
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TFromType<Stack, Context, Left> extends true
    ? true
    : TFromTypes<Stack, Context, Right>
  : false

export type TFromProperties<Stack extends (keyof Context)[], Context extends TProperties, Properties extends TProperties,
  Types extends TSchema[] = TPropertyValues<Properties>,
> = TFromTypes<Stack, Context, Types>

export type TFromType<Stack extends (keyof Context)[], Context extends TProperties, Type extends TSchema> = (
  Type extends TRef<infer Ref extends string> ? TFromRef<Stack, Context, Ref> :
  Type extends TArray<infer Type extends TSchema> ? TFromType<Stack, Context, Type> :
  Type extends TConstructor<infer Parameters extends TSchema[], infer InstanceType extends TSchema> ? TFromTypes<Stack, Context, [...Parameters, InstanceType]> :
  Type extends TFunction<infer Parameters extends TSchema[], infer ReturnType extends TSchema> ? TFromTypes<Stack, Context, [...Parameters, ReturnType]> :
  Type extends TInterfaceDeferred<TSchema[], infer Properties extends TProperties> ? TFromProperties<Stack, Context, Properties> :
  Type extends TIntersect<infer Types extends TSchema[]> ? TFromTypes<Stack, Context, Types> :
  Type extends TObject<infer Properties extends TProperties> ? TFromProperties<Stack, Context, Properties> :
  Type extends TUnion<infer Types extends TSchema[]> ? TFromTypes<Stack, Context, Types> :
  Type extends TTuple<infer Types extends TSchema[]> ? TFromTypes<Stack, Context, Types> :
  Type extends TRecord<string, infer Type extends TSchema> ? TFromType<Stack, Context, Type> :
  false
)

export type TFromRef<Stack extends (keyof Context)[], Context extends TProperties, Ref extends (keyof Context)> =
  Ref extends Stack[number]
    ? true
    : TFromType<[...Stack, Ref], Context, Context[Ref]>

export type TCyclicCheck<Stack extends (keyof Context)[], Context extends TProperties, Type extends TSchema,
  Result extends boolean = TFromType<Stack, Context, Type>
> = Result
