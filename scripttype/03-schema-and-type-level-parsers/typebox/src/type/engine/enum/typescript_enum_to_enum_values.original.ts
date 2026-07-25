/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/enum/typescript_enum_to_enum_values.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEnumValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnionToTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTypeScriptEnumLike = Record<PropertyKey, TEnumValue>

export type TReduceEnumValues<Keys extends string[], Type extends TTypeScriptEnumLike, Result extends TEnumValue[] = []> = (
  Keys extends [infer Left extends string, ...infer Right extends string[]]
    ? TReduceEnumValues<Right, Type, [...Result, Type[Left]]>
    : Result
)

export type TTypeScriptEnumToEnumValues<Type extends TTypeScriptEnumLike,
  EnumKeys extends string[] = TUnionToTuple<Extract<keyof Type, string>>,
  Elements extends TEnumValue[] = TReduceEnumValues<EnumKeys, Type>
> = Elements
