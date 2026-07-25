/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/record.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntegerKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NumberKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticDirection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StaticType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInteger<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralDecodeUnsafe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTemplateLiteralStatic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TStringKey = typeof StringKey

export type TIntegerKey = typeof IntegerKey

export type TNumberKey = typeof NumberKey

export type StaticPropertyKey<Key extends string, Result extends PropertyKey = (
  Key extends TStringKey ? string :
  Key extends TIntegerKey ? number :
  Key extends TNumberKey ? number :
  Key extends `^${string}$` ? TTemplateLiteralStatic<Key> : 
  string
)> = Result

export type StaticRecord<Stack extends string[], Direction extends StaticDirection, Context extends TProperties, This extends TProperties, Key extends string, Value extends TSchema,
  StaticKey extends PropertyKey = StaticPropertyKey<Key>,
  StaticValue extends unknown = StaticType<Stack, Direction, Context, This, Value>,
  Result extends Record<PropertyKey, unknown> = Record<StaticKey, StaticValue>
> = Result

export type TRecordDeferred<Key extends TSchema = TSchema, Value extends TSchema = TSchema> = (
  TDeferred<'Record', [Key, Value]>
)

export type TRecordPatternToType<Pattern extends string,
  Result extends TSchema = (
    Pattern extends typeof StringKey ? TString :
    Pattern extends typeof IntegerKey ? TInteger :
    Pattern extends typeof NumberKey ? TNumber :
    TTemplateLiteralDecodeUnsafe<Pattern>
  )
> = Result

export interface TRecord<Key extends string = string, Value extends TSchema = TSchema> extends TSchema {
  '~kind': 'Record'
  type: 'object',
  patternProperties: { [_ in Key]: Value }
}

export type TRecordPattern<Type extends TRecord,
  Result extends string = Extract<keyof Type['patternProperties'], string>
> = Result

export type TRecordKey<Type extends TRecord,
  Pattern extends string = TRecordPattern<Type>,
  Result extends TSchema = TRecordPatternToType<Pattern>
> = Result

export type TRecordValue<Type extends TRecord,
  Result extends TSchema = Type['patternProperties'][TRecordPattern<Type>]
> = Result
