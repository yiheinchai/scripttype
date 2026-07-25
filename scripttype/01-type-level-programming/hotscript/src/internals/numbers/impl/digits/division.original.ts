/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/digits/division.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AddDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CompareDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Digit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Digits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SubDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TrimZeros<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Rest<T extends Digit[]> = T extends [
  Digit,
  ...infer R extends Digit[]
]
  ? R
  : never;

export type TruncateWith<
  T extends Digit[],
  U extends Digit[],
  Acc extends Digit[] = []
> = U extends []
  ? [T, Acc]
  : T extends [infer D extends Digit, ...infer DR extends Digit[]]
  ? TruncateWith<DR, Rest<U>, [...Acc, D]>
  : [T, Acc];

export type DivModByDigit<
  D extends Digit[],
  M extends Digit[],
  Mul extends Digit[] = [0],
  IterTable extends Digit[] = Digits,
  NextMul extends Digit[] = AddDigits<M, Mul>,
  Comp = CompareDigits<D, NextMul>
> = IterTable extends [
  infer Iteration extends Digit,
  ...infer Next extends Digit[]
]
  ? Comp extends 0
    ? { Quotient: Next[0]; Remainder: [0] }
    : Comp extends 1
    ? DivModByDigit<D, M, NextMul, Next>
    : {
        Quotient: Iteration;
        Remainder: SubDigits<D, Mul>;
      }
  : never;

export type _DivModDigits<
  A extends Digit[],
  D extends Digit[],
  M extends Digit[],
  Q extends Digit[] = []
> = DivModByDigit<D, M> extends {
  Quotient: infer B extends Digit;
  Remainder: infer R extends Digit[];
}
  ? A extends [infer A1 extends Digit, ...infer AR extends Digit[]]
    ? _DivModDigits<AR, TrimZeros<[...R, A1]>, M, [...Q, B]>
    : { Quotient: [...Q, B]; Remainder: R }
  : never;

export type DivDigits<N extends Digit[], M extends Digit[]> = TruncateWith<
  N,
  M
> extends [infer A extends Digit[], infer D extends Digit[]]
  ? _DivModDigits<A, D, M>["Quotient"]
  : never;

export type ModDigits<N extends Digit[], M extends Digit[]> = TruncateWith<
  N,
  M
> extends [infer A extends Digit[], infer D extends Digit[]]
  ? _DivModDigits<A, D, M>["Remainder"]
  : never;

export type DivModDigits<N extends Digit[], M extends Digit[]> = TruncateWith<
  N,
  M
> extends [infer A extends Digit[], infer D extends Digit[]]
  ? _DivModDigits<A, D, M>
  : never;
