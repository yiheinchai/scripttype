/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/keyof/from_type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromType<Type extends TSchema> = (
  Type extends TAny ? TFromAny :
  Type extends TArray<infer Type extends TSchema> ? TFromArray<Type> :
  Type extends TObject<infer Properties extends TProperties> ? TFromObject<Properties> :
  Type extends TRecord ? TFromRecord<Type> :
  Type extends TTuple<infer Types extends TSchema[]> ? TFromTuple<Types> :
  TNever
)
