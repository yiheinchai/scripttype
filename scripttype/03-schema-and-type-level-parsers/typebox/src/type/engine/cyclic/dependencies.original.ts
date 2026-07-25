/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/dependencies.ts, for comparison with the ScriptType alongside.
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
type TUnreachable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromTypes<Context extends TProperties, Types extends TSchema[], Dependencies extends string[]> =
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TFromTypes<Context, Right, TFromType<Context, Left, Dependencies>>
    : Dependencies

export type TFromProperties<Context extends TProperties, Properties extends TProperties, Dependencies extends string[],
  Types extends TSchema[] = TPropertyValues<Properties>,
> = TFromTypes<Context, Types, Dependencies>

export type TFromType<Context extends TProperties, Type extends TSchema, Result extends string[]> = (
  Type extends TRef<infer Ref extends string> ? TFromRef<Context, Ref, Result> :
  Type extends TArray<infer Type extends TSchema> ? TFromType<Context, Type, Result> :
  Type extends TConstructor<infer Parameters extends TSchema[], infer InstanceType extends TSchema> ? TFromTypes<Context, [...Parameters, InstanceType], Result> :
  Type extends TFunction<infer Parameters extends TSchema[], infer ReturnType extends TSchema> ? TFromTypes<Context, [...Parameters, ReturnType], Result> :
  Type extends TInterfaceDeferred<TSchema[], infer Properties extends TProperties> ? TFromProperties<Context, Properties, Result> :
  Type extends TIntersect<infer Types extends TSchema[]> ? TFromTypes<Context, Types, Result> :
  Type extends TObject<infer Properties extends TProperties> ? TFromProperties<Context, Properties, Result> :
  Type extends TUnion<infer Types extends TSchema[]> ? TFromTypes<Context, Types, Result> :
  Type extends TTuple<infer Types extends TSchema[]> ? TFromTypes<Context, Types, Result> :
  Type extends TRecord<string, infer Type extends TSchema> ? TFromType<Context, Type, Result> :
  Result
)

export type TFromRef<Context extends TProperties, Ref extends string, Dependencies extends string[]> =
  Ref extends Dependencies[number]
  ? Dependencies
  : Ref extends keyof Context
    ? TFromType<Context, Context[Ref], [...Dependencies, Ref]>
    : TUnreachable

export type TCyclicDependencies<Context extends TProperties, Key extends string, Type extends TSchema,
  Result extends string[] = TFromType<Context, Type, [Key]>
> = Result
