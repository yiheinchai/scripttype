/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/core/impl/MergeArgs.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Equal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ExcludePlaceholders<xs, output extends any[] = []> = xs extends [
  infer first,
  ...infer rest
]
  ? Equal<first, _> extends true
    ? ExcludePlaceholders<rest, output>
    : ExcludePlaceholders<rest, [...output, first]>
  : output;

export type MergeArgsRec<
  pipedArgs extends any[],
  partialArgs extends any[],
  output extends any[] = []
> = partialArgs extends [infer partialFirst, ...infer partialRest]
  ? IsNever<partialFirst> extends true
    ? MergeArgsRec<pipedArgs, partialRest, [...output, partialFirst]>
    : [partialFirst] extends [_]
    ? pipedArgs extends [infer pipedFirst, ...infer pipedRest]
      ? MergeArgsRec<pipedRest, partialRest, [...output, pipedFirst]>
      : [...output, ...ExcludePlaceholders<partialRest>]
    : MergeArgsRec<pipedArgs, partialRest, [...output, partialFirst]>
  : [...output, ...pipedArgs];

export type EmptyIntoPlaceholder<x> = IsNever<x> extends true
  ? never
  : [x] extends [unset]
  ? _
  : x;

export type MapEmptyIntoPlaceholder<xs, output extends any[] = []> = xs extends [
  infer first,
  ...infer rest
]
  ? MapEmptyIntoPlaceholder<rest, [...output, EmptyIntoPlaceholder<first>]>
  : output;

export type MergeArgs<
  pipedArgs extends any[],
  partialArgs extends any[]
> = MergeArgsRec<pipedArgs, MapEmptyIntoPlaceholder<partialArgs>>;
