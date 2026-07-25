/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/pick/from_type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TToIndexable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TToIndexableKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TComparable<Indexable extends TProperties> = (
  keyof Indexable extends string | number ? `${keyof Indexable}` : never
)

export type TFromKeys<Indexable extends TProperties, Keys extends string[], Result extends TProperties = {}> = (
  Keys extends [infer Left extends string, ...infer Right extends string[]]
    ? Left extends TComparable<Indexable>
      ? TFromKeys<Indexable, Right, Memory.TAssign<Result, { [_ in Left]: Indexable[Left] }>>
      : TFromKeys<Indexable, Right, Result>
    : Result
)

export type TFromType<Type extends TSchema, Indexer extends TSchema, 
  Indexable extends TProperties = TToIndexable<Type>,
  Keys extends string[] = TToIndexableKeys<Indexer>,
  Applied extends TProperties = TFromKeys<Indexable, Keys>,
  Result extends TSchema = TObject<Applied>
> = Result
