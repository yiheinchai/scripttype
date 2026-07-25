/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/impl/length.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Add<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StrIter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type LengthDown<
  Str extends string,
  Length extends number | bigint,
  It
> = It extends StrIter.Iterator
  ? StrIter.CutAt<Str, It> extends `${infer $Rest}`
    ? LengthDown<$Rest, Add<Length, StrIter.Value<It>>, It>
    : LengthDown<Str, Length, StrIter.Prev<It>>
  : Length;

export type LengthUp<
  Str extends string,
  Length extends number | bigint = 0,
  It extends StrIter.Iterator = StrIter.Init
> = StrIter.Double<It> extends infer $DoubleIt extends StrIter.Iterator
  ? StrIter.CutAt<Str, $DoubleIt> extends `${infer $Rest}`
    ? StrIter.Size<It> extends 12 // 2^13 is the last block size within the complexity limit
      ? LengthDown<$Rest, Add<Length, StrIter.Value<$DoubleIt>>, $DoubleIt>
      : LengthUp<$Rest, Add<Length, StrIter.Value<$DoubleIt>>, $DoubleIt>
    : StrIter.CutAt<Str, It> extends `${infer $Rest}`
    ? LengthUp<$Rest, Add<Length, StrIter.Value<It>>, It>
    : LengthDown<Str, Length, StrIter.Prev<It>>
  : never;

export type Length<T extends string> = T extends "" ? 0 : LengthUp<T>;
