/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/properties.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XRequired<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XIsReadonly<Schema extends XSchema> = (
  Schema extends { readOnly: true } ? true :
  Schema extends { '~readonly': true } ? true : // review
  false
)

export type XRequiredArray<Schema extends XSchema,
  Result extends PropertyKey[] = Schema extends XRequired<infer Keys extends string[]> ? Keys : []
> = Result

export type XReadonlyKeys<Properties extends Record<PropertyKey, XSchema>,
  ReadonlyProperties extends Record<PropertyKey, unknown> = { [Key in keyof Properties as XIsReadonly<Properties[Key]> extends true ? Key : never]: unknown },
  Result extends PropertyKey = keyof ReadonlyProperties
> = Result

export type XRequiredKeys<Properties extends Record<PropertyKey, XSchema>, RequiredArray extends string[], 
  Result extends PropertyKey = RequiredArray extends [] ? never : Extract<keyof Properties, RequiredArray[number]>
> = Result

export type XUnknownKeys<Properties extends Record<PropertyKey, XSchema>, RequiredArray extends string[],
  Result extends PropertyKey = Exclude<RequiredArray[number], keyof Properties>
> = Result

export type XOptionalKeys<Properties extends Record<PropertyKey, XSchema>, RequiredArray extends string[],
  Result extends PropertyKey = RequiredArray extends [] ? keyof Properties : Exclude<keyof Properties, RequiredArray[number]>
> = Result

export type XReadonlyOptionalProperties<Stack extends string[], Root extends XSchema, OptionalKeys extends PropertyKey, Properties extends Record<PropertyKey, XSchema>> = {
  readonly [Key in Extract<keyof Properties, OptionalKeys>]?: XStaticSchema<Stack, Root, Properties[Key]>
}

export type XReadonlyRequiredProperties<Stack extends string[], Root extends XSchema, RequiredKeys extends PropertyKey, Properties extends Record<PropertyKey, XSchema>> = {
  readonly [Key in Extract<keyof Properties, RequiredKeys>]: XStaticSchema<Stack, Root, Properties[Key]>
}

export type XOptionalProperties<Stack extends string[], Root extends XSchema, OptionalKeys extends PropertyKey, Properties extends Record<PropertyKey, XSchema>> = {
  [Key in Extract<keyof Properties, OptionalKeys>]?: XStaticSchema<Stack, Root, Properties[Key]>
}

export type XRequiredProperties<Stack extends string[], Root extends XSchema, RequiredKeys extends PropertyKey, Properties extends Record<PropertyKey, XSchema>> = {
  [Key in Extract<keyof Properties, RequiredKeys>]: XStaticSchema<Stack, Root, Properties[Key]>
}

export type XUnknownProperties<UnknownKeys extends PropertyKey> = {
  [Key in UnknownKeys]: unknown
}

export type XStaticProperties<Stack extends string[], Root extends XSchema, Schema extends XSchema, Properties extends Record<PropertyKey, XSchema>,
  RequiredArray extends string[] = XRequiredArray<Schema>,
  // Keys
  ReadonlyKeys extends PropertyKey = XReadonlyKeys<Properties>,
  OptionalKeys extends PropertyKey = XOptionalKeys<Properties, RequiredArray>,
  RequiredKeys extends PropertyKey = XRequiredKeys<Properties, RequiredArray>,
  UnknownKeys extends PropertyKey = XUnknownKeys<Properties, RequiredArray>,
  // Properties
  ReadonlyOptionalProperties extends Record<PropertyKey, unknown> = XReadonlyOptionalProperties<Stack, Root, Extract<OptionalKeys, ReadonlyKeys>, Properties>,
  ReadonlyRequiredProperties extends Record<PropertyKey, unknown> = XReadonlyRequiredProperties<Stack, Root, Extract<RequiredKeys, ReadonlyKeys>, Properties>,
  OptionalProperties extends Record<PropertyKey, unknown> = XOptionalProperties<Stack, Root, Exclude<OptionalKeys, ReadonlyKeys>, Properties>,
  RequiredProperties extends Record<PropertyKey, unknown> = XRequiredProperties<Stack, Root, Exclude<RequiredKeys, ReadonlyKeys>, Properties>,
  UnknownProperties extends Record<PropertyKey, unknown> = XUnknownProperties<UnknownKeys>,
  // Properties
  Result extends Record<PropertyKey, unknown> = (
    ReadonlyOptionalProperties &
    ReadonlyRequiredProperties &
    OptionalProperties & 
    RequiredProperties & 
    UnknownProperties
  )
> = Result
