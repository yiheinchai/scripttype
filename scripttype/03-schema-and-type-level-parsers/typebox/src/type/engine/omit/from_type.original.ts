/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/omit/from_type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TToIndexable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TToIndexableKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TNormalKeys<Keys extends string[],
 UnionKeys extends string = Keys[number],
 Result extends string | number = (
    UnionKeys extends `${infer Value extends number}` 
      ? UnionKeys | Value 
      : UnionKeys
 )
> = Result

export type TFromKeys<Properties extends TProperties, Keys extends string[],
  Omitted extends TProperties = Omit<Properties, TNormalKeys<Keys>>,
  Result extends TProperties = { [Key in keyof Omitted]: Omitted[Key] }
> = Result

export type TFromType<Type extends TSchema, Indexer extends TSchema, 
  Indexable extends TProperties = TToIndexable<Type>,
  IndexableKeys extends string[] = TToIndexableKeys<Indexer>,
  Omitted extends TProperties = TFromKeys<Indexable, IndexableKeys>,
  Result extends TSchema = TObject<Omitted>
> = Result
