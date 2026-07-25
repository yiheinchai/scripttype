/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/core/impl/MergeArgs.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Equal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
