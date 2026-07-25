/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/digits/power.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Digit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MulDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TrimZeros<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _DivModDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PowerDigits<
  T extends Digit[],
  U extends Digit[],
  Acc extends Digit[] = [1]
> = U extends [0]
  ? [1]
  : U extends [1]
  ? MulDigits<T, Acc>
  : U extends [infer UN extends Digit, ...infer UR extends Digit[]]
  ? _DivModDigits<UR, [UN], [2]> extends {
      Quotient: infer Q extends Digit[];
      Remainder: infer R extends Digit[];
    }
    ? TrimZeros<R> extends [0]
      ? PowerDigits<MulDigits<T, T>, TrimZeros<Q>, Acc>
      : PowerDigits<MulDigits<T, T>, TrimZeros<Q>, MulDigits<T, Acc>>
    : never
  : Acc;
