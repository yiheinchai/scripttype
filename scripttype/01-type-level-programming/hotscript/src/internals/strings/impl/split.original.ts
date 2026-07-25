/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/impl/split.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type H<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SplitManySep<
  Str extends string,
  Sep extends string[],
  Acc extends string[] = []
> = Sep extends [
  infer FirstSep extends string,
  ...infer RestSep extends string[]
]
  ? ConcatSplits<H.Split<Str, FirstSep>, RestSep>
  : [Str, ...Acc];

export type ConcatSplits<
  Parts extends string[],
  Seps extends string[],
  Acc extends string[] = []
> = Parts extends [infer First extends string, ...infer Rest extends string[]]
  ? ConcatSplits<Rest, Seps, [...Acc, ...SplitManySep<First, Seps>]>
  : Acc;

export type Split<
  Str,
  Sep extends string,
  Seps = H.UnionToTuple<Sep>
> = Seps extends string[]
  ? Str extends string
    ? SplitManySep<Str, Seps>
    : []
  : [];

export type StringToTuple<Str, Acc extends string[] = []> = Str extends string
  ? Str extends `${infer First}${infer Rest}`
    ? StringToTuple<Rest, [...Acc, First]>
    : Acc
  : [];
