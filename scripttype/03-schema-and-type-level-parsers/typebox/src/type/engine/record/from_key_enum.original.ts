/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/record/from_key_enum.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TEnumValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateEnum<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromEnumKey<Values extends TEnumValue[], Value extends TSchema,
  UnionKey extends TSchema = TEvaluateEnum<Values>,
  Result extends TSchema = TFromKey<UnionKey, Value>
> = Result
