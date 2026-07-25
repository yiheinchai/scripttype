/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/tuple/to_object.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTupleElementsToProperties<Types extends TSchema[], Result extends TProperties = {}> = (
  Types extends [...infer Left extends TSchema[], infer Right extends TSchema]
    ? TTupleElementsToProperties<Left, { [_ in Left['length']]: Right } & Result>
    : { [Key in keyof Result]: Result[Key] }
)

export type TTupleToObject<Type extends TTuple,
  Properties extends TProperties = TTupleElementsToProperties<Type['items']>,
  Result extends TSchema = TObject<Properties>
> = Result
