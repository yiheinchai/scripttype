/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/division.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Digit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DivDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DivModDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ModDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MulSign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Normalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Num<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Sign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type DivDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, DivDigits<Num<T>, Num<U>>>;

export type Div<
  T extends number | bigint,
  U extends number | bigint
> = ToNumber<
  FromDigitNumber<
    Normalize<
      DivDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;

export type ModDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = MakeDigitNumber<Sign<T>, ModDigits<Num<T>, Num<U>>>;

export type Mod<
  T extends number | bigint,
  U extends number | bigint
> = ToNumber<
  FromDigitNumber<
    Normalize<
      ModDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;

export type DivModDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber,
  DivMod extends { Quotient: Digit[]; Remainder: Digit[] } = DivModDigits<
    Num<T>,
    Num<U>
  >
> = {
  Quotient: MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, DivMod["Quotient"]>;
  Remainder: MakeDigitNumber<Sign<T>, DivMod["Remainder"]>;
};

export type DivMod<
  T extends number | bigint,
  U extends number | bigint,
  DivModNumbers extends {
    Quotient: DigitNumber;
    Remainder: DigitNumber;
  } = DivModDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
> = {
  Quotient: ToNumber<FromDigitNumber<Normalize<DivModNumbers["Quotient"]>>>;
  Remainder: ToNumber<FromDigitNumber<Normalize<DivModNumbers["Remainder"]>>>;
};
