/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/string.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TSpan<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTake<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTrim<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
