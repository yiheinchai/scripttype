/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/ident.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TAlpha<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TDigit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TDollarSign<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTake<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTrim<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnderScore<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TInitial = [...TAlpha, TUnderScore, TDollarSign]

export type TTakeInitial<Input extends string> = (
  TTake<TInitial, Input>
)

export type TRemaining = [...TInitial, ...TDigit]

export type TTakeRemaining<Input extends string, Result extends string = ''> = (
  TTake<TRemaining, Input> extends [infer Remaining extends string, infer RemainingRest extends string]
    ? TTakeRemaining<RemainingRest, `${Result}${Remaining}`>
    : [Result, Input]
)

export type TTakeIdent<Input extends string> = (
  TTakeInitial<Input> extends [infer Initial extends string, infer InitialRest extends string]
    ? TTakeRemaining<InitialRest> extends [infer Remaining extends string, infer RemainingRest extends string]
      ? [`${Initial}${Remaining}`, RemainingRest]
      : [] // fail: did not match Remaining
    : [] // fail: did not match Initial
)

export type TIdent<Input extends string> = (
  TTakeIdent<TTrim<Input>>
)
