/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/record.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsLeft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRecord<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRecordPatternToType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TFromObject<Inferred extends TProperties, Properties extends TProperties> = 
  keyof Properties extends never
    ? Result.TExtendsTrue<Inferred>
    : Result.TExtendsFalse

export type TFromRecord<Inferred extends TProperties, _LeftKey extends TSchema, LeftValue extends TSchema, _RightKey extends TSchema, RightValue extends TSchema> = (
  TExtendsLeft<Inferred, LeftValue, RightValue>
)

export type TExtendsRecord<Inferred extends TProperties, LeftPattern extends string, LeftValue extends TSchema, Right extends TSchema> = (
  Right extends TRecord<infer Pattern extends string, infer Value extends TSchema> ? TFromRecord<Inferred, TRecordPatternToType<LeftPattern>, LeftValue, TRecordPatternToType<Pattern>, Value> :
  Right extends TObject<infer Properties extends TProperties> ? TFromObject<Inferred, Properties> :
  Right extends TAny ? Result.TExtendsTrue<Inferred> :
  Right extends TUnknown ? Result.TExtendsTrue<Inferred> :
  Result.TExtendsFalse
)
