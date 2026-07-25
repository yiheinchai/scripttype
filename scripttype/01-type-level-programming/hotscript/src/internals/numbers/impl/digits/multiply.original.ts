/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/impl/digits/multiply.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AddDigits<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Digit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SubDigits<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type MulX2<T extends Digit[]> = AddDigits<T, T>;

export type MulX3<T extends Digit[]> = AddDigits<T, MulX2<T>>;

export type MulX4<T extends Digit[]> = MulX2<MulX2<T>>;

export type MulX5<T extends Digit[]> = AddDigits<T, MulX4<T>>;

export type MulX6<T extends Digit[]> = MulX2<MulX3<T>>;

export type MulX10<T extends Digit[]> = [...T, 0];

export type MulX7<T extends Digit[]> = SubDigits<MulX10<T>, MulX3<T>>;

export type MulX8<T extends Digit[]> = SubDigits<MulX10<T>, MulX2<T>>;

export type MulX9<T extends Digit[]> = SubDigits<MulX10<T>, T>;

export type MulByDigit<T extends Digit[], U extends Digit> = U extends 0
  ? [0]
  : U extends 1
  ? T
  : U extends 2
  ? MulX2<T>
  : U extends 3
  ? MulX3<T>
  : U extends 4
  ? MulX4<T>
  : U extends 5
  ? MulX5<T>
  : U extends 6
  ? MulX6<T>
  : U extends 7
  ? MulX7<T>
  : U extends 8
  ? MulX8<T>
  : MulX9<T>;

export type MulDigits<
  T extends Digit[],
  U extends Digit[],
  Acc extends Digit[] = []
> = U extends [infer N extends Digit, ...infer R extends Digit[]]
  ? MulDigits<T, R, AddDigits<MulByDigit<T, N>, MulX10<Acc>>>
  : Acc;
