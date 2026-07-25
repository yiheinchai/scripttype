/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/_canonical.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XCanonicalArray<Value extends unknown, 
  Result extends unknown[] = XCanonical<Value>[]
> = Result

export type XCanonicalObject< Value extends object, Result extends Record<PropertyKey, unknown> = {
  -readonly [Key in keyof Value]: XCanonical<Value[Key]>
}> = Result

export type XCanonical<Schema extends unknown> = (
  Schema extends readonly [...infer Schemas extends unknown[]] ? XCanonicalTuple<Schemas> : 
  Schema extends readonly (infer Schema)[] ? XCanonicalArray<Schema> : 
  Schema extends object ? XCanonicalObject<Schema> : 
  Schema
)

export type XCanonicalTuple<Value extends readonly unknown[]> = (
  Value extends [infer Left, ...infer Right extends unknown[]] 
    ? [XCanonical<Left>, ...XCanonicalTuple<Right>]
    : []
)
