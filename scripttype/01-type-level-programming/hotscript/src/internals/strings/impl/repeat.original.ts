/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/impl/repeat.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DivMod<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Sub<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RepeatX2<T extends string> = `${T}${T}`;

export type Repeat<
  T extends string,
  N extends number,
  Acc extends string = "",
  Calc extends { Quotient: number; Remainder: number } = DivMod<N, 2>
> = N extends 0
  ? Acc
  : N extends 1
  ? `${Acc}${T}`
  : Calc["Remainder"] extends 0
  ? Repeat<RepeatX2<T>, Calc["Quotient"], Acc>
  : Repeat<T, Sub<N, 1>, `${Acc}${T}`>;
