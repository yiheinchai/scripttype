/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/power.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Digit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Normalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Num<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PowerDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Sign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PowerSign<S extends "" | "-", U extends DigitNumber> = S extends "-"
  ? Num<U> extends [...Digit[], 0 | 2 | 4 | 6 | 8]
    ? ""
    : "-"
  : "";

export type PowerDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = Sign<U> extends "-"
  ? MakeDigitNumber<Sign<T>, [0]>
  : MakeDigitNumber<PowerSign<Sign<T>, U>, PowerDigits<Num<T>, Num<U>>>;

export type Power<
  T extends number | bigint,
  U extends number | bigint
> = ToNumber<
  FromDigitNumber<
    Normalize<
      PowerDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;
