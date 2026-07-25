/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/properties.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticEvaluate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TReadonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TProperties extends TSchema {
  [key: PropertyKey]: TSchema
}

export type ReadonlyOptionalKeys<Properties extends TProperties, Result extends PropertyKey = { [Key in keyof Properties]: Properties[Key] extends TReadonly<TSchema> ? (Properties[Key] extends TOptional<Properties[Key]> ? Key : never) : never }[keyof Properties]> = Result

export type ReadonlyKeys<Properties extends TProperties, Result extends PropertyKey = { [Key in keyof Properties]: Properties[Key] extends TReadonly<TSchema> ? (Properties[Key] extends TOptional<Properties[Key]> ? never : Key) : never }[keyof Properties]> = Result

export type OptionalKeys<Properties extends TProperties, Result extends PropertyKey = { [Key in keyof Properties]: Properties[Key] extends TOptional<TSchema> ? (Properties[Key] extends TReadonly<Properties[Key]> ? never : Key) : never }[keyof Properties]> = Result

export type RequiredKeys<Properties extends TProperties, Result extends PropertyKey = keyof Omit<Properties, ReadonlyOptionalKeys<Properties> | ReadonlyKeys<Properties> | OptionalKeys<Properties>>> = Result

export type StaticPropertiesWithModifiers<Properties extends TProperties, PropertiesWithoutModifiers extends Record<PropertyKey, unknown>> = StaticEvaluate<
  & Readonly<Partial<Pick<PropertiesWithoutModifiers, ReadonlyOptionalKeys<Properties>>>>
  & Readonly<Pick<PropertiesWithoutModifiers, ReadonlyKeys<Properties>>>
  & Partial<Pick<PropertiesWithoutModifiers, OptionalKeys<Properties>>>
  & Required<Pick<PropertiesWithoutModifiers, RequiredKeys<Properties>>>
>

export type StaticPropertiesWithoutModifiers<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Properties extends TProperties, 
  Result extends Record<PropertyKey, unknown> = { 
    [Key in keyof Properties]: StaticType<Stack, Direction, Context, This, Properties[Key]> 
  }> = Result

export type StaticProperties<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Properties extends TProperties, 
  PropertiesWithoutModifiers extends Record<PropertyKey, unknown> = StaticPropertiesWithoutModifiers<Stack, Direction, Context, This, Properties>,
  PropertiesWithModifiers extends Record<PropertyKey, unknown> = StaticPropertiesWithModifiers<Properties, PropertiesWithoutModifiers>,
  Result extends Record<PropertyKey, unknown> = { [Key in keyof PropertiesWithModifiers]: PropertiesWithModifiers[Key] }
> = Result

export type TRequiredArray<Properties extends TProperties,
  RequiredProperties extends TProperties = { 
    [Key in keyof Properties as Properties[Key] extends TOptional<Properties[Key]> ? never : Key] : Properties[Key]
  },
  RequiredKeys extends string[] = TUnionToTuple<Extract<keyof RequiredProperties, string>>,
  Result extends string[] | undefined = 
    RequiredKeys extends [] ? undefined : RequiredKeys
> = Result

export type TKeyToString<Key extends number | string> = `${Key}`

export type TPropertyKeys<Properties extends TProperties,
  ExtractKey extends number | string = Extract<keyof Properties, number | string>,
  StringKey extends string = TKeyToString<ExtractKey>,
  Result extends string[] = TUnionToTuple<StringKey>
> = Result

export type TPropertyValuesReduce<Properties extends TProperties, Keys extends string[], Result extends TSchema[] = []> =
  Keys extends [infer Left extends string, ...infer Right extends string[]]
    ? Left extends keyof Properties
      ? TPropertyValuesReduce<Properties, Right, [...Result, Properties[Left]]>
      : TPropertyValuesReduce<Properties, Right, Result>
    : Result

export type TPropertyValues<Properties extends TProperties,
  Keys extends string[] = TPropertyKeys<Properties>,
  Result extends TSchema[] = TPropertyValuesReduce<Properties, Keys>
> = Result
