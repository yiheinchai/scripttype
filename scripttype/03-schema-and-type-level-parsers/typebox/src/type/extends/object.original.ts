/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/object.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TExtendsLeft<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TExtendsRight<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInfer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TOptional<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnion<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnionToTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnreachable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TExtendsPropertyOptional<Inferred extends TProperties, Left extends TSchema, Right extends TSchema> = (
  Left extends TOptional<Left>
  ? Right extends TOptional<Right>
    ? Result.TExtendsTrue<Inferred>
    : Result.TExtendsFalse
  : Result.TExtendsTrue<Inferred>
)

export type TExtendsProperty<Inferred extends TProperties, Left extends TSchema, Right extends TSchema> = (
  // Right TInfer<TNever> is TExtendsFalse
  Right extends TInfer<string, TNever> 
    ? Result.TExtendsFalse 
    : TExtendsLeft<Inferred, Left, Right> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
      ? TExtendsPropertyOptional<Inferred, Left, Right>
      : Result.TExtendsFalse
)

export type TExtractInferredProperties<Keys extends PropertyKey[], Properties extends Record<PropertyKey, Result.TResult>, Result extends TProperties = {}> = (
  Keys extends [infer Left extends PropertyKey, ...infer Right extends PropertyKey[]]
  ? Left extends keyof Properties
    ? Properties[Left] extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
      ? TExtractInferredProperties<Right, Properties, Result & Inferred>
      : TExtractInferredProperties<Right, Properties, Result>
    : TUnreachable // TExtractInferredProperties<Right, Properties, Result>
  : Result
)

export type TExtendsPropertiesComparer<Inferred extends TProperties, Left extends TProperties, Right extends TProperties,
  Properties extends Record<PropertyKey, Result.TExtendsTrue | Result.TExtendsFalse> = {
    [RightKey in keyof Right]: (
      RightKey extends keyof Left
      // We don't consider the exterior Inferred as part of the property check as
      // we don't want the exterior Context to override the Inferred Context for
      // the Property Key. This override behavior is observed in the following
      // case we want the inferred A to shadow the exterior A.
      //
      // const A = Type.Script(`{ x: 1, y: 1 }`)
      // const S = Type.Script({ A }, `{
      //   [K in keyof A]: A extends { 
      //     x: infer A, 
      //     y: infer B 
      //   } ? [A, B]   <-- inferred 'A' shadows the exterior 'A'
      //     : never
      // }`)
      ? TExtendsProperty<{}, Left[RightKey], Right[RightKey]>
      // If the right key K is not in left, but the right property is optional
      // then we say this property is permissable. This is because an optional
      // property on right is the same as property missing in left. If the
      // right is infer, then we just assign the extend type to inferred.
      : Right[RightKey] extends TOptional<Right[RightKey]>
      ? Right[RightKey] extends TInfer
      ? Result.TExtendsTrue<Memory.TAssign<Inferred, { [_ in Right[RightKey]['name']]: Right[RightKey]['extends'] }>>
      : Result.TExtendsTrue<Inferred>
      : Result.TExtendsFalse
    )
  },
  // Check if all properties are ExtendsTrueLike
  Checked extends boolean = Properties[keyof Right] extends Result.TExtendsTrueLike ? true : false,
  // Extract inferred results from properties, but only if the check is true.
  Extracted extends TProperties = Checked extends true ? TExtractInferredProperties<TUnionToTuple<keyof Properties>, Properties> : {},
> = (
    Checked extends true
    ? Result.TExtendsTrue<Extracted>
    : Result.TExtendsFalse
  )

export type TExtendsProperties<Inferred extends TProperties, Left extends TProperties, Right extends TProperties,
  Compared extends Result.TResult = TExtendsPropertiesComparer<Inferred, Left, Right>
> = (
    Compared extends Result.TExtendsTrueLike<infer ComparedInferred extends TProperties>
    ? Result.TExtendsTrue<Memory.TAssign<Inferred, ComparedInferred>>
    : Result.TExtendsFalse
  )

export type TExtendsObjectToObject<Inferred extends TProperties, Left extends TProperties, Right extends TProperties> = (
  TExtendsProperties<Inferred, Left, Right>
)

export type TRecordMergeInferred<Left extends TProperties, Right extends TProperties,
  Result extends TProperties = {
    [Key in keyof Right]: Key extends keyof Left
      ? Left[Key] extends TUnion<infer Types extends TSchema[]>
        ? TUnion<[...Types, Right[Key]]>
        : TUnion<[Left[Key], Right[Key]]>
      : Right[Key]
}> = Result

export type TExtendsRecordComparer<Properties extends TProperties, Keys extends (keyof Properties)[], Type extends TSchema, Result extends TProperties> = (
  Keys extends [infer Left extends (keyof Properties), ...infer Right extends (keyof Properties)[]]
    ? TExtendsLeft<{}, Properties[Left], Type> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
      ? TExtendsRecordComparer<Properties, Right, Type, TRecordMergeInferred<Result, Inferred>> 
      : Result.TExtendsFalse
    : Result.TExtendsTrue<Result>
)

export type TExtendsObjectToRecord<Inferred extends TProperties, Properties extends TProperties, _Pattern extends string, Value extends TSchema,
  Keys extends (keyof Properties)[] = TUnionToTuple<keyof Properties>,
  Result extends  Result.TResult = TExtendsRecordComparer<Properties, Keys, Value, Inferred>
> = Result

export type TExtendsObject<Inferred extends TProperties, Left extends TProperties, Right extends TSchema> = (
  Right extends TRecord<infer Pattern extends string, infer Value extends TSchema> ? TExtendsObjectToRecord<Inferred, Left, Pattern, Value> : 
  Right extends TObject<infer Properties extends TProperties> ? TExtendsObjectToObject<Inferred, Left, Properties> : 
  TExtendsRight<Inferred, TObject<Left>, Right>
)
