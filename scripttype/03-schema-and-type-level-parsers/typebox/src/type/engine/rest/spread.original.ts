/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/rest/spread.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TRestSpread<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TRestSpread<Right, [...Result, ...TSpreadElement<Left>]>
    : Result
)

export type TSpreadElement<Type extends TSchema,
  Result extends TSchema[] = (
    Type extends TRest<infer Rest extends TSchema> ? (
      Rest extends TTuple<infer Elements extends TSchema[]> ? TRestSpread<Elements> : 
      Rest extends TInfer<string, TSchema> ? [Type] :
      Rest extends TRef<string> ? [Type] :
      [TNever]
    ) : [Type]
  )
> = Result
