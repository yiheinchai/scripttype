/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/digits/power.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Digit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MulDigits<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TrimZeros<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _DivModDigits<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
