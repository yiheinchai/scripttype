/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/compare.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Digit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type DigitNumber<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Num<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Sign<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ToDigitNumber<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ToString<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _Equal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type CompareLength<
  T extends any[],
  U extends any[]
> = T["length"] extends U["length"] ? 1 : 0;

export type DigitCompareTable = [
  [0, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [1, 0, -1, -1, -1, -1, -1, -1, -1, -1],
  [1, 1, 0, -1, -1, -1, -1, -1, -1, -1],
  [1, 1, 1, 0, -1, -1, -1, -1, -1, -1],
  [1, 1, 1, 1, 0, -1, -1, -1, -1, -1],
  [1, 1, 1, 1, 1, 0, -1, -1, -1, -1],
  [1, 1, 1, 1, 1, 1, 0, -1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1, 0, -1, -1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, -1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];

export type DigitCompare<
  D1 extends Digit,
  D2 extends Digit
> = DigitCompareTable[D1][D2];

export type CompareDigitsWithEqualLength<
  T extends Digit[],
  U extends Digit[]
> = [T, U] extends [
  [infer N1 extends Digit, ...infer R1 extends Digit[]],
  [infer N2 extends Digit, ...infer R2 extends Digit[]]
]
  ? DigitCompare<N1, N2> extends 0
    ? CompareDigitsWithEqualLength<R1, R2>
    : DigitCompare<N1, N2>
  : 0;

export type CompareDigits<T extends Digit[], U extends Digit[]> = CompareLength<
  T,
  U
> extends 1
  ? CompareDigitsWithEqualLength<T, U>
  : keyof U extends keyof T
  ? 1
  : -1;

export type CompareDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = Sign<T> extends Sign<U>
  ? Sign<T> extends ""
    ? CompareDigits<Num<T>, Num<U>>
    : CompareDigits<Num<U>, Num<T>>
  : Sign<T> extends "-"
  ? -1
  : 1;

export type Compare<
  T extends number | bigint,
  U extends number | bigint
> = _Equal<T, U> extends true
  ? 0
  : CompareDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>;

export type LessThan<
  T extends number | bigint,
  U extends number | bigint
> = Compare<T, U> extends -1 ? true : false;

export type GreaterThan<
  T extends number | bigint,
  U extends number | bigint
> = Compare<T, U> extends 1 ? true : false;

export type Equal<
  T extends number | bigint,
  U extends number | bigint
> = _Equal<T, U>;

export type NotEqual<
  T extends number | bigint,
  U extends number | bigint
> = _Equal<T, U> extends true ? false : true;

export type LessThanOrEqual<
  T extends number | bigint,
  U extends number | bigint
> = Compare<T, U> extends -1 | 0 ? true : false;

export type GreaterThanOrEqual<
  T extends number | bigint,
  U extends number | bigint
> = Compare<T, U> extends 1 | 0 ? true : false;

export type Max<T extends number | bigint, U extends number | bigint> = Compare<
  T,
  U
> extends 1 | 0
  ? T
  : U;

export type Min<T extends number | bigint, U extends number | bigint> = Compare<
  T,
  U
> extends 1 | 0
  ? U
  : T;
