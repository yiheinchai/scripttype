/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/schema/static/if.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XElse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XIf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XStaticSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type XThen<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
