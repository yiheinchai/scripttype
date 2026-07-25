/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/evaluate/broaden.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ResultEqual<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultLeftInside<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultRightInside<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCompare<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFlatten<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TBroadFilter<Type extends TSchema, Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TCompare<Type, Left> extends typeof ResultRightInside
    ? TBroadFilter<Type, Right, [...Result]>
      : TBroadFilter<Type, Right, [...Result, Left]>
      : Result
)

export type TIsBroadestType<Type extends TSchema, Types extends TSchema[]> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TCompare<Type, Left> extends typeof ResultLeftInside | typeof ResultEqual
      ? false
      : TIsBroadestType<Type, Right>
    : true
)

export type TBroadenType<Type extends TSchema, Types extends TSchema[],
  Evaluated extends TSchema = TEvaluateType<Type>,
  Result extends TSchema[] = (
    Evaluated extends TAny ? [Evaluated] :
    TIsBroadestType<Evaluated, Types> extends true
      ? [...TBroadFilter<Evaluated, Types>, Evaluated]
      : Types
  )
> = Result

export type TBroadenTypes<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? (
      Left extends TObject ? TBroadenTypes<Right, [...Result, Left]> : // push
      Left extends TNever ? TBroadenTypes<Right, Result> : // ignore
      TBroadenTypes<Right, TBroadenType<Left, Result>> // broaden
    ) : Result
)

export type TBroaden<Types extends TSchema[],
  Broadened extends TSchema[] = TBroadenTypes<Types>,
  Flattened extends TSchema[] = TFlatten<Broadened>,
> = Flattened
