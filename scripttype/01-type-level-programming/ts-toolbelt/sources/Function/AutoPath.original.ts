/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Function/AutoPath.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Head<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Join<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Key<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type List<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Path<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pop<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Select<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Split<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tail<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Index = number | string;

export type KeyToIndex<K extends Key, SP extends List<Index>> =
  number extends K ? Head<SP> : K & Index;

export type MetaPath<O, D extends string, SP extends List<Index> = [], P extends List<Index> = []> = {
  [K in keyof O]:
    | MetaPath<O[K], D, Tail<SP>, [...P, KeyToIndex<K, SP>]>
    | Join<[...P, KeyToIndex<K, SP>], D>;
};

export type NextPath<OP> =
  // the next paths after property `K` are on sub objects
  // O[K] === K | {x: '${K}.x' | {y: '${K}.x.y' ...}}
  // So we access O[K] then we only keep the next paths
  // To do this, we can just exclude `string` out of it:
  // O[K] === {x: '${K}.x' | {y: '${K}.x.y' ...}}
  // To do this, we create a union of what we just got
  // This will yield a union of paths and meta paths
  // We exclude the next paths (meta) paths by excluding
  // `object`. Then we are left with the direct next path
  Select<UnionOf<Exclude<OP, string> & {}>, string>;

export type ExecPath<A, SP extends List<Index>, Delimiter extends string> =
  // We go in the `MetaPath` of `O` to get the prop at `SP`
  // So we query what is going the `NextPath` at `O[...SP]`
  NextPath<Path<MetaPath<A, Delimiter, SP>, SP>>;

export type HintPath<A, P extends string, SP extends List<Index>, Exec extends string, D extends string> = [Exec] extends [never] // if has not found paths
  ? ExecPath<A, Pop<SP>, D> // display previous paths
  : Exec | P;

export type _AutoPath<A, P extends string, D extends string, SP extends List<Index> = Split<P, D>> =
  HintPath<A, P, SP, ExecPath<A, SP, D>, D>;

export type AutoPath<O extends any, P extends string, D extends string = '.'> =
  _AutoPath<O, P, D>;
