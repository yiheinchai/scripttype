/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/range.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Add<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AddDigits<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Digit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Num<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Sub<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToDigitNumber<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SequenceOfDigits<
  T extends number | bigint,
  Min extends number | bigint = 0,
  MinDigits extends Digit[] = Num<ToDigitNumber<ToString<Min>>>,
  Acc extends Digit[][] = [MinDigits]
> = Acc["length"] extends T
  ? Acc
  : SequenceOfDigits<
      T,
      Min,
      MinDigits,
      [
        ...Acc,
        AddDigits<Num<ToDigitNumber<ToString<Acc["length"]>>>, MinDigits>
      ]
    >;

export type RangeOfDigits<
  Min extends number | bigint,
  Max extends number | bigint
> = SequenceOfDigits<Sub<Add<Max, 1>, Min>, Min>;
