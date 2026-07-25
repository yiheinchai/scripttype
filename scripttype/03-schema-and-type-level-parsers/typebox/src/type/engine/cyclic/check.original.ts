/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/check.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TConstructor<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInterfaceDeferred<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TIntersect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TPropertyValues<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRef<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
