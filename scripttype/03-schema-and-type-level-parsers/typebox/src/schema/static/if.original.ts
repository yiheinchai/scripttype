/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/if.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XElse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XIf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XStaticSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type XThen<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type XStaticIf<Stack extends string[], Root extends XSchema, Schema extends XIf, IfSchema extends XSchema,
  If extends unknown = XStaticSchema<Stack, Root, IfSchema>,
  Then extends unknown = Schema extends XThen<infer ThenSchema extends XSchema> ? XStaticSchema<Stack, Root, ThenSchema> : never,
  Else extends unknown = Schema extends XElse<infer ElseSchema extends XSchema> ? XStaticSchema<Stack, Root, ElseSchema> : never,
  
  IsThen extends boolean = Schema extends XThen ? true : false,
  IsElse extends boolean = Schema extends XElse ? true : false,
  Result extends unknown = (
    [IsThen, IsElse] extends [true, true] ? (If & Then) | Exclude<Else, If> :
    [IsThen, IsElse] extends [true, false] ? (If & Then) :
    [IsThen, IsElse] extends [false, true] ? Exclude<Else, If> :
    unknown
  )
> = Result
