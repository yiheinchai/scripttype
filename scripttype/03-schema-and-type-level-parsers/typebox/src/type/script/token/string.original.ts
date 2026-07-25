/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/string.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TSpan<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTake<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTrim<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTakeInitial<Quotes extends string[], Input extends string> = (
  TTake<Quotes, Input>
)

export type TTakeSpan<Quote extends string, Input extends string> = (
  TSpan<Quote, Quote, false, Input>
)

export type TTakeString<Quotes extends string[], Input extends string> = (
  TTakeInitial<Quotes, Input> extends [infer Initial extends string, infer InitialRest extends string]
    ? TTakeSpan<Initial, `${Initial}${InitialRest}`>
    : [] // fail: did not match Initial
)

export type TString<Quotes extends string[], Input extends string> = (
  TTakeString<Quotes, TTrim<Input>>
)
