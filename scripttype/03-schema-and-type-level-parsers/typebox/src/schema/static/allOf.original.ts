/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/allOf.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type XStaticAllOf<Stack extends string[], Root extends XSchema, Schemas extends XSchema[], Result extends unknown = unknown> = (
  Schemas extends readonly [infer Left extends XSchema, ...infer Right extends XSchema[]]
    ? XStaticAllOf<Stack, Root, Right, Result & XStaticSchema<Stack, Root, Left>>
    : Result
)
