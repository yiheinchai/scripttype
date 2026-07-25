/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/object/from_intersect.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TCollapseIntersectProperties<Left extends TProperties, Right extends TProperties,
  LeftKeys extends keyof Left = Exclude<keyof Left, keyof Right>,
  RightKeys extends keyof Right = Exclude<keyof Right, keyof Left>,
  SharedKeys extends keyof Left & keyof Right = Extract<keyof Left, keyof Right>,

  LeftProperties extends TProperties = { [Key in LeftKeys]: Left[Key] },
  RightProperties extends TProperties = { [Key in RightKeys]: Right[Key] },
  SharedProperties extends TProperties = { [Key in SharedKeys]: TEvaluateIntersect<[Left[Key], Right[Key]]> },

  Unique extends TProperties = Memory.TAssign<LeftProperties, RightProperties>,
  Shared extends TProperties = Memory.TAssign<Unique, SharedProperties>
> = Shared

export type TFromIntersect<Types extends TSchema[], Result extends TProperties = {}> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
  ? TFromIntersect<Right, TCollapseIntersectProperties<Result, TFromType<Left>>>
  : { [Key in keyof Result]: Result[Key] }
)
