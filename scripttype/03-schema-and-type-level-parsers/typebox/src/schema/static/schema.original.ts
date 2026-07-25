/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/schema.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XAdditionalProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XAllOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XAnyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XConst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XIf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XOneOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XPatternProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XPrefixItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XRequired<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticAdditionalProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticAllOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticAnyOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticConst<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticIf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticOneOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticPatternProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticPrefixItems<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticRequired<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticUnevaluatedProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XUnevaluatedProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XFromKeywords<Stack extends string[], Root extends XSchema, Schema extends XSchema, Result extends unknown[] = [
  Schema extends XAdditionalProperties<infer Type extends XSchema> ? XStaticAdditionalProperties<Stack, Root, Type> : unknown,
  Schema extends XAllOf<infer Types extends XSchema[]> ? XStaticAllOf<Stack, Root, Types> : unknown,
  Schema extends XAnyOf<infer Types extends XSchema[]> ? XStaticAnyOf<Stack, Root, Types> : unknown,
  Schema extends XConst<infer Value extends unknown> ? XStaticConst<Value> : unknown,
  Schema extends XIf<infer Type extends XSchema> ? XStaticIf<Stack, Root, Schema, Type> : unknown,
  Schema extends XEnum<infer Values extends unknown[]> ? XStaticEnum<Values> : unknown,
  Schema extends XItems<infer Types extends XSchema[] | XSchema> ? XStaticItems<Stack, Root, Schema, Types> : unknown,
  Schema extends XOneOf<infer Types extends XSchema[]> ? XStaticOneOf<Stack, Root, Types> : unknown,
  Schema extends XPatternProperties<infer Properties extends Record<PropertyKey, XSchema>> ? XStaticPatternProperties<Stack, Root, Properties> : unknown,
  Schema extends XPrefixItems<infer Types extends XSchema[]> ? XStaticPrefixItems<Stack, Root, Schema, Types> : unknown,
  Schema extends XProperties<infer Properties extends Record<PropertyKey, XSchema>> ? XStaticProperties<Stack, Root, Schema, Properties> : unknown,
  Schema extends XRef<infer Ref extends string> ? XStaticRef<Stack, Root, Ref> : unknown,
  Schema extends XRequired<infer Keys extends string[]> ? XStaticRequired<Stack, Root, Schema, Keys> : unknown,
  Schema extends XType<infer TypeName extends string[] | string> ? XStaticType<TypeName> : unknown,
  Schema extends XUnevaluatedProperties<infer Type extends XSchema> ? XStaticUnevaluatedProperties<Stack, Root, Type> : unknown
]> = Result

export type XKeywordsIntersected<Schemas extends unknown[], Result extends unknown = unknown> = (
  Schemas extends [infer Left extends unknown, ...infer Right extends unknown[]]
  ? XKeywordsIntersected<Right, Result & Left>
  : Result
)

export type XKeywordsEvaluated<Schema extends unknown,
  Result extends unknown = Schema extends object
  ? { [Key in keyof Schema]: Schema[Key] }
  : Schema
> = Result

export type XStaticObject<Stack extends string[], Root extends XSchema, Schema extends XSchema, 
  Keywords extends unknown[] = XFromKeywords<Stack, Root, Schema>,
  Intersected extends unknown = XKeywordsIntersected<Keywords>,
  Evaluated extends unknown = XKeywordsEvaluated<Intersected>
> = Evaluated

export type XStaticBoolean<Schema extends boolean, 
  Result extends unknown = Schema extends false ? never : unknown
> = Result

export type XStaticSchema<Stack extends string[], Root extends XSchema, Schema extends XSchema, 
  Result extends unknown = Schema extends boolean 
    ? XStaticBoolean<Schema> 
    : XStaticObject<Stack, Root, Schema>
> = Result
