/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/patternProperties.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XStaticPatternProperties<Stack extends string[], Root extends XSchema, Properties extends Record<PropertyKey, XSchema> = Record<PropertyKey, XSchema>,
  InferredProperties extends Record<PropertyKey, unknown> = { [Key in keyof Properties]: XStaticSchema<Stack, Root, Properties[Key]> },
  EvaluatedProperties extends unknown = { [key: string]: InferredProperties[keyof InferredProperties] }
> = EvaluatedProperties
