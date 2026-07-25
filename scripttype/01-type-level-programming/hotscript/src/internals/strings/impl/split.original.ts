/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/impl/split.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type H<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
