/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/number.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type THyphen<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTrim<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnsignedNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTakeSign<Input extends string> = (
  TOptional<THyphen, Input>
)

export type TTakeSignedNumber<Input extends string> = (
  TTakeSign<Input> extends [infer Sign extends string, infer SignRest extends string]
    ? TUnsignedNumber<SignRest> extends [infer UnsignedInteger extends string, infer UnsignedIntegerRest extends string]
      ? [`${Sign}${UnsignedInteger}`, UnsignedIntegerRest]
      : [] // fail: did not match unsigned integer
    : [] // fail: did not match Sign
)

export type TNumber<Input extends string> = (
  TTakeSignedNumber<TTrim<Input>>
)
