/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/object/from_tuple.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TFromType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTupleToObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromTuple<Types extends TSchema[],
  Object extends TSchema = TTupleToObject<TTuple<Types>>,
  Result extends TSchema = TFromType<Object>
> = Result
