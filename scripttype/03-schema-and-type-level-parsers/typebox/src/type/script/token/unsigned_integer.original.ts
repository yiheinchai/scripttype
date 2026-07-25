/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/unsigned_integer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TDigit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TMany<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNonZero<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTake<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTrim<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnderScore<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TZero<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTakeNonZero<Input extends string> = (
  TTake<TNonZero, Input>
)

export type TAllowedDigits = [...TDigit, TUnderScore]

export type TTakeDigits<Input extends string> = (
  TMany<TAllowedDigits, [TUnderScore], Input>
)

export type TTakeUnsignedInteger<Input extends string> = (
  TTake<[TZero], Input> extends [infer Zero extends string, infer ZeroRest extends string]
    ? [Zero, ZeroRest]
    : TTakeNonZero<Input> extends [infer NonZero extends string, infer NonZeroRest extends string]
      ? TTakeDigits<NonZeroRest> extends [infer Digits extends string, infer DigitsRest extends string]
        ? [`${NonZero}${Digits}`, DigitsRest]
        : [] // fail: did not match Digits
      : [] // fail: did not match NonZero
)

export type TUnsignedInteger<Input extends string> = (
  TTakeUnsignedInteger<TTrim<Input>>
)
