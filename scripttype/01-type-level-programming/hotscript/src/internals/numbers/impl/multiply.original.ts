/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/multiply.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MulDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MulSign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Normalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Num<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Sign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MulDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = MakeDigitNumber<MulSign<Sign<T>, Sign<U>>, MulDigits<Num<T>, Num<U>>>;

export type Mul<
  T extends number | bigint,
  U extends number | bigint
> = ToNumber<
  FromDigitNumber<
    Normalize<
      MulDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;
