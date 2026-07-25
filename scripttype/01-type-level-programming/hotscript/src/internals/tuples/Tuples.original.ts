/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/tuples/Tuples.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Apply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Call<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Fn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iterator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NumberImpls<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Numbers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Objects<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PartialApply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pipe<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Std<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Stringifiable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tuples<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type args<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HeadImpl<xs> = xs extends readonly [infer head, ...any] ? head : never;

export interface AtFn extends Fn {
    return: Extract<this["arg1"], readonly any[]>[Extract<
      this["arg0"],
      number
    >];
  }

export type At<
    index extends number | _ | unset = unset,
    tuple = unset
  > = PartialApply<AtFn, [index, tuple]>;

export type IsEmptyImpl<tuple extends unknown[]> = [] extends tuple ? true : false;

export interface IsEmptyFn extends Fn {
    return: IsEmptyImpl<Extract<this["arg0"], unknown[]>>;
  }

export type IsEmpty<tuple = unset> = PartialApply<IsEmptyFn, [tuple]>;

export interface ToUnionFn extends Fn {
    return: this["arg0"][number];
  }

export type ToUnion<tuple extends readonly any[] | _ | unset = unset> =
    PartialApply<ToUnionFn, [tuple]>;

export interface IntersectFn extends Fn {
    return: this["arg0"] & this["arg1"];
  }

export interface ToIntersectionFn extends Fn {
    return: this["args"] extends [infer tuples extends readonly any[], ...any]
      ? Call<Tuples.Reduce<IntersectFn, unknown, tuples>>
      : never;
  }

export type ToIntersection<tuple = unset> = PartialApply<
    ToIntersectionFn,
    [tuple]
  >;

export interface HeadFn extends Fn {
    return: HeadImpl<this["arg0"]>;
  }

export type Head<tuple extends readonly any[] | unset = unset> = PartialApply<
    HeadFn,
    [tuple]
  >;

export type TailImpl<xs> = xs extends readonly [any, ...infer tail] ? tail : [];

export interface TailFn extends Fn {
    return: TailImpl<this["arg0"]>;
  }

export type Tail<tuple extends readonly any[] | unset = unset> = PartialApply<
    TailFn,
    [tuple]
  >;

export type LastImpl<xs> = xs extends readonly [...any, infer last] ? last : never;

export interface LastFn extends Fn {
    return: LastImpl<this["arg0"]>;
  }

export type Last<tuple extends readonly any[] | unset = unset> = PartialApply<
    LastFn,
    [tuple]
  >;

export interface MapFn extends Fn {
    return: this["args"] extends [
      infer fn extends Fn,
      infer tuple extends unknown[]
    ]
      ? { [key in keyof tuple]: Call<fn, tuple[key]> }
      : never;
  }

export type Map<
    fn extends Fn | unset | _ = unset,
    tuple extends readonly any[] | unset = unset
  > = PartialApply<MapFn, [fn, tuple]>;

export type ReduceImpl<fn extends Fn, acc, xs> = xs extends [
    infer first,
    ...infer rest
  ]
    ? ReduceImpl<fn, Call<fn, acc, first>, rest>
    : xs extends readonly [infer first, ...infer rest]
    ? ReduceImpl<fn, Call<fn, acc, first>, rest>
    : acc;

export interface FlatMapReducer<fn extends Fn> extends Fn {
    return: this["args"] extends [infer acc extends any[], infer item]
      ? [...acc, ...Extract<Call<fn, item>, readonly any[]>]
      : never;
  }

export interface FlatMapFn extends Fn {
    return: ReduceImpl<
      FlatMapReducer<Extract<this["arg0"], Fn>>,
      [],
      this["arg1"]
    >;
  }

export type FlatMap<
    fn extends Fn,
    tuple extends readonly any[] | unset = unset
  > = PartialApply<FlatMapFn, [fn, tuple]>;

export interface ReduceFn extends Fn {
    return: ReduceImpl<Extract<this["arg0"], Fn>, this["arg1"], this["arg2"]>;
  }

export type Reduce<
    fn extends Fn,
    init = unset,
    tuple extends readonly any[] | unset = unset
  > = PartialApply<ReduceFn, [fn, init, tuple]>;

export type ReverseRecImpl<tuple, acc extends unknown[]> = tuple extends [
    infer first,
    ...infer rest
  ]
    ? ReverseRecImpl<rest, [first, ...acc]>
    : acc;

export type ReverseImpl<tuple> = any[] extends tuple
    ? tuple
    : ReverseRecImpl<tuple, []>;

export interface ReverseFn extends Fn {
    return: ReverseImpl<this["arg0"]>;
  }

export type Reverse<tuple extends readonly unknown[] | unset = unset> =
    PartialApply<ReverseFn, [tuple]>;

export type ReduceRightImpl<xs, acc, fn extends Fn> = xs extends [
    ...infer rest,
    infer last
  ]
    ? ReduceRightImpl<rest, Call<fn, acc, last>, fn>
    : acc;

export interface ReduceRightFn extends Fn {
    return: ReduceRightImpl<
      this["arg2"],
      this["arg1"],
      Extract<this["arg0"], Fn>
    >;
  }

export type ReduceRight<
    fn extends Fn,
    init = unset,
    tuple extends readonly any[] | unset = unset
  > = PartialApply<ReduceRightFn, [fn, init, tuple]>;

export interface FilterReducer<fn extends Fn> extends Fn {
    return: this["args"] extends [infer acc extends any[], infer item]
      ? Call<fn, item> extends true
        ? [...acc, item]
        : acc
      : never;
  }

export interface FilterFn extends Fn {
    return: ReduceImpl<
      FilterReducer<Extract<this["arg0"], Fn>>,
      [],
      this["arg1"]
    >;
  }

export type Filter<
    fn extends Fn,
    tuple extends readonly any[] | unset = unset
  > = PartialApply<FilterFn, [fn, tuple]>;

export type FindImpl<xs, fn extends Fn, index extends any[] = []> = xs extends [
    infer first,
    ...infer rest
  ]
    ? Call<fn, first, index["length"]> extends true
      ? first
      : FindImpl<rest, fn, [...index, any]>
    : never;

export interface FindFn extends Fn {
    return: FindImpl<this["arg1"], Extract<this["arg0"], Fn>>;
  }

export type Find<
    fn extends Fn,
    tuple extends readonly any[] | unset = unset
  > = PartialApply<FindFn, [fn, tuple]>;

export interface SumFn extends Fn {
    return: ReduceImpl<N.Add, 0, this["arg0"]>;
  }

export type Sum<tuple extends readonly any[] | unset = unset> = PartialApply<
    SumFn,
    [tuple]
  >;

export type DropImpl<
    xs extends readonly any[],
    n extends any[]
  > = Iterator.Get<n> extends 0
    ? xs
    : xs extends readonly [any, ...infer tail]
    ? DropImpl<tail, Iterator.Prev<n>>
    : [];

export interface DropFn extends Fn {
    return: this["args"] extends [
      infer N extends number,
      infer T extends readonly any[]
    ]
      ? DropImpl<T, Iterator.Iterator<N>>
      : never;
  }

export type Drop<
    n extends number | unset | _ = unset,
    tuple = unset
  > = PartialApply<DropFn, [n, tuple]>;

export type TakeImpl<
    xs extends readonly any[],
    it extends any[],
    output extends any[] = []
  > = Iterator.Get<it> extends 0
    ? output
    : xs extends readonly [infer head, ...infer tail]
    ? TakeImpl<tail, Iterator.Prev<it>, [...output, head]>
    : output;

export interface TakeFn extends Fn {
    return: this["args"] extends [
      infer N extends number,
      infer T extends readonly any[]
    ]
      ? TakeImpl<T, Iterator.Iterator<N>>
      : never;
  }

export type Take<
    n extends number | unset | _ = unset,
    tuple = unset
  > = PartialApply<TakeFn, [n, tuple]>;

export type TakeWhileImpl<
    xs extends readonly any[],
    fn extends Fn,
    index extends any[] = [],
    output extends any[] = []
  > = xs extends readonly [infer head, ...infer tail]
    ? Call<fn, head, index["length"]> extends true
      ? TakeWhileImpl<tail, fn, [...index, any], [...output, head]>
      : output
    : output;

export interface TakeWhileFn extends Fn {
    return: TakeWhileImpl<
      Extract<this["arg1"], readonly any[]>,
      Extract<this["arg0"], Fn>
    >;
  }

export type TakeWhile<fn extends Fn, tuple = unset> = PartialApply<
    TakeWhileFn,
    [fn, tuple]
  >;

export interface SomeFn extends Fn {
    return: true extends Call<
      Tuples.Map<Extract<this["arg0"], Fn>>,
      this["arg1"]
    >[number]
      ? true
      : false;
  }

export type Some<fn extends Fn, tuple = unset> = PartialApply<
    SomeFn,
    [fn, tuple]
  >;

export interface EveryFn extends Fn {
    return: false extends Call<
      Tuples.Map<Extract<this["arg0"], Fn>>,
      this["arg1"]
    >[number]
      ? false
      : true;
  }

export type Every<fn extends Fn, tuple = unset> = PartialApply<
    EveryFn,
    [fn, tuple]
  >;

export type SortImpl<xs extends any[], predicateFn extends Fn> = xs extends [
    infer head,
    ...infer tail
  ]
    ? Call<
        Tuples.Partition<PartialApply<predicateFn, [_, head]>, tail>
      > extends [infer left extends any[], infer right extends any[]]
      ? [...SortImpl<left, predicateFn>, head, ...SortImpl<right, predicateFn>]
      : never
    : [];

export interface JoinReducer<sep extends string> extends Fn {
    return: this["args"] extends [
      infer acc extends Stringifiable,
      infer item extends Stringifiable
    ]
      ? `${acc extends "" ? "" : `${acc}${sep}`}${item}`
      : never;
  }

export interface JoinFn extends Fn {
    return: this["args"] extends [infer Sep extends string, infer Tuple]
      ? ReduceImpl<JoinReducer<Sep>, "", Tuple>
      : never;
  }

export type Join<
    Sep extends string | _ | unset = unset,
    Tuple = unset
  > = PartialApply<JoinFn, [Sep, Tuple]>;

export interface PrependFn extends Fn {
    return: this["args"] extends [infer element, infer tuple extends any[]]
      ? [element, ...tuple]
      : never;
  }

export type Prepend<element = unset, tuple = unset> = PartialApply<
    PrependFn,
    [element, tuple]
  >;

export interface AppendFn extends Fn {
    return: this["args"] extends [infer element, infer tuple extends any[]]
      ? [...tuple, element]
      : never;
  }

export type Append<element = unset, tuple = unset> = PartialApply<
    AppendFn,
    [element, tuple]
  >;

export interface ConcatFn extends Fn {
    return: this["args"] extends [
      infer t1 extends readonly any[],
      infer t2 extends readonly any[],
      ...any
    ]
      ? [...t1, ...t2]
      : never;
  }

export type Concat<tuple1 = unset, tuple2 = unset> = PartialApply<
    ConcatFn,
    [tuple1, tuple2]
  >;

export type PartitionImpl<
    fn extends Fn,
    tuple extends any[],
    left extends any[] = [],
    right extends any[] = []
  > = tuple extends [infer first, ...infer rest]
    ? Call<fn, first> extends true
      ? PartitionImpl<fn, rest, [...left, first], right>
      : PartitionImpl<fn, rest, left, [...right, first]>
    : [left, right];

export interface PartitionFn extends Fn {
    return: PartitionImpl<
      Extract<this["arg0"], Fn>,
      Extract<this["arg1"], any[]>
    >;
  }

export type Partition<fn extends Fn, tuple = unset> = PartialApply<
    PartitionFn,
    [fn, tuple]
  >;

export interface SplitAtFn extends Fn {
    return: this["args"] extends [
      infer index extends number,
      infer tuple extends any[],
      ...any
    ]
      ? [
          TakeImpl<tuple, Iterator.Iterator<index>>,
          DropImpl<tuple, Iterator.Iterator<index>>
        ]
      : never;
  }

export type SplitAt<
    index extends number | unset | _ = unset,
    tuple extends unknown[] | unset | _ = unset
  > = PartialApply<SplitAtFn, [index, tuple]>;

export interface ZipWithMapper<fn extends Fn, arrs extends unknown[][]> extends Fn {
    return: this["args"] extends [infer Index extends number, ...any]
      ? Apply<fn, Call<Tuples.Map<Tuples.At<Index>, arrs>>>
      : never;
  }

export interface ZipWithFn<fn extends Fn> extends Fn {
    return: this["args"] extends infer arrays extends unknown[][]
      ? Pipe<
          arrays,
          [
            Tuples.Map<Objects.Get<"length">>,
            Tuples.Min,
            Numbers.Abs,
            Numbers.Sub<_, 1>,
            Tuples.Range<0, _>,
            Tuples.Map<ZipWithMapper<fn, arrays>>
          ]
        >
      : never;
  }

export type Zip<
    arr0 extends unknown[] | _ | unset = unset,
    arr1 extends unknown[] | _ | unset = unset,
    arr2 extends unknown[] | _ | unset = unset,
    arr3 extends unknown[] | _ | unset = unset,
    arr4 extends unknown[] | _ | unset = unset,
    arr5 extends unknown[] | _ | unset = unset,
    arr6 extends unknown[] | _ | unset = unset,
    arr7 extends unknown[] | _ | unset = unset,
    arr8 extends unknown[] | _ | unset = unset,
    arr9 extends unknown[] | _ | unset = unset
  > = PartialApply<
    ZipWithFn<args>,
    [arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9]
  >;

export type ZipWith<
    fn extends Fn,
    arr0 extends unknown[] | _ | unset = unset,
    arr1 extends unknown[] | _ | unset = unset,
    arr2 extends unknown[] | _ | unset = unset,
    arr3 extends unknown[] | _ | unset = unset,
    arr4 extends unknown[] | _ | unset = unset,
    arr5 extends unknown[] | _ | unset = unset,
    arr6 extends unknown[] | _ | unset = unset,
    arr7 extends unknown[] | _ | unset = unset,
    arr8 extends unknown[] | _ | unset = unset,
    arr9 extends unknown[] | _ | unset = unset
  > = PartialApply<
    ZipWithFn<fn>,
    [arr0, arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9]
  >;

export type GroupByImplRec<xs, fn extends Fn, acc = {}> = xs extends [
    infer first,
    ...infer rest
  ]
    ? Call<fn, first> extends infer key extends PropertyKey
      ? GroupByImplRec<
          rest,
          fn,
          Std._Omit<acc, key> & {
            [K in key]: [
              ...(key extends keyof acc
                ? Extract<acc[key], readonly any[]>
                : []),
              first
            ];
          }
        >
      : never
    : acc;

export type GroupByImpl<xs, fn extends Fn> = Prettify<GroupByImplRec<xs, fn>>;

export type RangeImpl<
    start extends number,
    length extends number,
    output extends any[] = []
  > = output["length"] extends length
    ? output
    : RangeImpl<
        start,
        length,
        [...output, Call<Numbers.Add<start, output["length"]>>]
      >;

export interface RangeFn extends Fn {
    return: this["args"] extends [
      infer start extends number,
      infer end extends number
    ]
      ? Call<Numbers.LessThanOrEqual, start, end> extends true
        ? Pipe<
            start,
            [Numbers.Sub<end, _>, Numbers.Add<1>, Numbers.Abs]
          > extends infer length extends number
          ? RangeImpl<start, length>
          : never
        : never
      : never;
  }

export type Range<
    start extends number | _ | unset = unset,
    end extends number | _ | unset = unset
  > = PartialApply<RangeFn, [start, end]>;

export interface LengthFn extends Fn {
    return: this["args"] extends [infer tuple extends readonly any[], ...any]
      ? tuple["length"]
      : never;
  }

export type Length<tuple extends readonly any[] | _ | unset = unset> =
    PartialApply<LengthFn, [tuple]>;

export type MinImpl<xs, min extends number | bigint = never> = xs extends [
    infer first extends number | bigint,
    ...infer rest
  ]
    ? MinImpl<rest, [min] extends [never] ? first : NumberImpls.Min<first, min>>
    : min;

export interface MinFn extends Fn {
    return: this["args"] extends [
      infer tuple extends readonly (number | bigint)[],
      ...any
    ]
      ? MinImpl<tuple>
      : never;
  }

export type Min<tuple extends readonly any[] | _ | unset = unset> =
    PartialApply<MinFn, [tuple]>;

export type MaxImpl<xs, min extends number | bigint = never> = xs extends [
    infer first extends number | bigint,
    ...infer rest
  ]
    ? MaxImpl<rest, [min] extends [never] ? first : NumberImpls.Max<first, min>>
    : min;

export interface MaxFn extends Fn {
    return: this["args"] extends [
      infer tuple extends readonly (number | bigint)[],
      ...any
    ]
      ? MaxImpl<tuple>
      : never;
  }

export type Max<tuple extends readonly any[] | _ | unset = unset> =
    PartialApply<MaxFn, [tuple]>;
