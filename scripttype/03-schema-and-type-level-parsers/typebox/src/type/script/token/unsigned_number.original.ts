/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/unsigned_number.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TDigit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TDot<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TMany<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTake<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTrim<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnderScore<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TUnsignedInteger<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TIsLeadingDot<Input extends string> = (
  TTake<[TDot], Input> extends [string, string] ? true : false
)

export type TAllowedDigits = [...TDigit, TUnderScore]

export type TTakeFractional<Input extends string> = (
  TMany<TAllowedDigits, [TUnderScore], Input> extends [infer Digits extends string, infer DigitsRest extends string]
    ? Digits extends ''
      ? [] // fail: no Digits
      : [Digits, DigitsRest]
    : [] // fail: did not match Digits
)

export type TLeadingDot<Input extends string> = (
  TTake<[TDot], Input> extends [infer Dot extends string, infer DotRest extends string]
    ? TTakeFractional<DotRest> extends [infer Fractional extends string, infer FractionalRest extends string]
      ? [`0${Dot}${Fractional}`, FractionalRest]
      : [] // fail: did not match Fractional
    : [] // fail: did not match Dot
)

export type TLeadingInteger<Input extends string> = (
  TUnsignedInteger<Input> extends [infer Integer extends string, infer IntegerRest extends string]
    ? TTake<[TDot], IntegerRest> extends [infer Dot extends string, infer DotRest extends string]
      ? TTakeFractional<DotRest> extends [infer Fractional extends string, infer FractionalRest extends string]
        ? [`${Integer}${Dot}${Fractional}`, FractionalRest]
        : [`${Integer}`, DotRest] // fail: did not match Fractional, use Integer
      : [`${Integer}`, IntegerRest] // fail: did not match Dot, use Integer
    : [] // fail: did not match Integer
)

export type TTakeUnsignedNumber<Input extends string> = (
  TIsLeadingDot<Input> extends true
    ? TLeadingDot<Input>
    : TLeadingInteger<Input>
)

export type TUnsignedNumber<Input extends string> = (
  TTakeUnsignedNumber<TTrim<Input>>
)
