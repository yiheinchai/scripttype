/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/substraction.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AddDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CompareDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvertSign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Normalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Num<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Sign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SubDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SubDigitNumbers<
  T extends DigitNumber,
  U extends DigitNumber
> = Sign<T> extends Sign<U>
  ? CompareDigits<Num<T>, Num<U>> extends 1
    ? MakeDigitNumber<Sign<T>, SubDigits<Num<T>, Num<U>>>
    : MakeDigitNumber<InvertSign<T>, SubDigits<Num<U>, Num<T>>>
  : MakeDigitNumber<Sign<T>, AddDigits<Num<T>, Num<U>>>;

export type Sub<
  T extends number | bigint,
  U extends number | bigint
> = ToNumber<
  FromDigitNumber<
    Normalize<
      SubDigitNumbers<ToDigitNumber<ToString<T>>, ToDigitNumber<ToString<U>>>
    >
  >
>;
