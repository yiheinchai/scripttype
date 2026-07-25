/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/unions/Unions.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Call<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Fn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PartialApply<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Std<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Tuples<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToIntersection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface ExtractFn extends Fn {
    return: Std._Extract<this["arg0"], this["arg1"]>;
  }

export type Extract<
    unionOrExtracted = unset,
    extracted = unset
  > = PartialApply<
    ExtractFn,
    extracted extends unset
      ? [unset, unionOrExtracted]
      : [unionOrExtracted, extracted]
  >;

export type ExtractByImpl<union, predicate extends Fn> = union extends any
    ? Call<predicate, union> extends true
      ? union
      : never
    : never;

export interface ExcludeFn extends Fn {
    return: Std._Exclude<this["arg0"], this["arg1"]>;
  }

export type Exclude<unionOrExcluded = unset, excluded = unset> = PartialApply<
    ExcludeFn,
    excluded extends unset
      ? [unset, unionOrExcluded]
      : [unionOrExcluded, excluded]
  >;

export type ExcludeByImpl<union, predicate extends Fn> = union extends any
    ? Call<predicate, union> extends true
      ? never
      : union
    : never;

export type MapImpl<fn extends Fn, union> = union extends any
    ? Call<fn, union>
    : never;

export interface MapFn extends Fn {
    return: this["args"] extends [infer fn extends Fn, infer u]
      ? MapImpl<fn, u>
      : never;
  }

export type Map<fn extends Fn, u = unset> = PartialApply<MapFn, [fn, u]>;

export interface RangeFn extends Fn {
    return: this["args"] extends [
      infer start extends number,
      infer end extends number
    ]
      ? Call<Tuples.Range<start, end>>[number]
      : never;
  }

export type Range<
    start extends number | _ | unset = unset,
    end extends number | _ | unset = unset
  > = PartialApply<RangeFn, [start, end]>;

export interface ToTupleFn extends Fn {
    return: this["args"] extends [infer union, ...any]
      ? UnionToTuple<union>
      : never;
  }

export type ToTuple<union = unset> = PartialApply<ToTupleFn, [union]>;

export interface NonNullableFn extends Fn {
    return: this["arg0"] extends infer union ? Std._NonNullable<union> : never;
  }

export type NonNullable<union = unset> = PartialApply<NonNullableFn, [union]>;

export interface ToIntersectionFn extends Fn {
    return: this["args"] extends [infer union, ...any]
      ? UnionToIntersection<union>
      : never;
  }

export type ToIntersection<union = unset> = PartialApply<
    ToIntersectionFn,
    [union]
  >;
