/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/partial/from_type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TDependent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromDependent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromType<Type extends TSchema> = (
  Type extends TCyclic<infer Defs extends TProperties, infer Ref extends string> ? TFromCyclic<Defs, Ref> :
  Type extends TDependent<infer If extends TSchema, infer Then extends TSchema, infer Else extends TSchema> ? TFromDependent<If, Then, Else> :
  Type extends TIntersect<infer Types extends TSchema[]> ? TFromIntersect<Types> :
  Type extends TUnion<infer Types extends TSchema[]> ? TFromUnion<Types> :
  Type extends TObject<infer Properties extends TProperties> ? TFromObject<Properties> : 
  TObject<{}>
)
