/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/script/token/bigint.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TInteger<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTake<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TTakeBigInt<Input extends string> = (
  TInteger<Input> extends [infer Integer extends string, infer IntegerRest extends string]
    ? TTake<['n'], IntegerRest> extends [infer _N extends string, infer NRest extends string]
      ? [`${Integer}`, NRest]
      : [] // fail: did not match 'n'
    : [] // fail: did not match Integer
)

export type TBigInt<Input extends string> = (
  TTakeBigInt<Input>
)
