/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/strings/Strings.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Call<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ComposeLeft<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type H<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Impl<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PartialApply<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Strings<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Tuples<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type _<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type unset<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface LengthFn extends Fn {
    return: this["arg0"] extends string ? Impl.Length<this["arg0"]> : never;
  }

export type Length<Str = unset> = PartialApply<LengthFn, [Str]>;

export interface TrimLeftFn extends Fn {
    return: this["args"] extends [
      infer Sep extends string,
      infer Str extends string,
      ...any
    ]
      ? Impl.TrimLeft<Str, Sep>
      : never;
  }

export type TrimLeft<
    Sep extends string | _ = " ",
    Str = unset
  > = PartialApply<TrimLeftFn, [Sep, Str]>;

export interface TrimRightFn extends Fn {
    return: this["args"] extends [
      infer Sep extends string,
      infer Str extends string,
      ...any
    ]
      ? Impl.TrimRight<Str, Sep>
      : never;
  }

export type TrimRight<
    Sep extends string | _ = " ",
    Str = unset
  > = PartialApply<TrimRightFn, [Sep, Str]>;

export interface TrimFn extends Fn {
    return: this["args"] extends [
      infer Sep extends string,
      infer Str extends string,
      ...any
    ]
      ? Impl.Trim<Str, Sep>
      : never;
  }

export type Trim<Sep extends string | _ = " ", Str = unset> = PartialApply<
    TrimFn,
    [Sep, Str]
  >;

export interface ReplaceFn extends Fn {
    return: this["args"] extends [
      infer From extends string,
      infer To extends string,
      infer Str,
      ...any
    ]
      ? Call<Tuples.Reduce<Impl.ReplaceReducer<To>, Str>, H.UnionToTuple<From>>
      : never;
  }

export type Replace<
    from extends string | unset | _ = unset,
    to extends string | unset | _ = unset,
    str = unset
  > = PartialApply<ReplaceFn, [from, to, str]>;

export type Slice<
    start extends number | unset | _ = unset,
    end extends number | unset | _ = unset
  > = ComposeLeft<
    [Strings.Split<"">, Tuples.Take<end>, Tuples.Drop<start>, Tuples.Join<"">]
  >;

export interface SplitFn extends Fn {
    return: this["args"] extends [infer Sep extends string, infer Str, ...any]
      ? Impl.Split<Str, Sep>
      : never;
  }

export type Split<
    Sep extends string | unset | _ = unset,
    Str extends string | unset | _ = unset
  > = PartialApply<SplitFn, [Sep, Str]>;

export interface RepeatFn extends Fn {
    return: this["args"] extends [
      infer Times extends number,
      infer Str extends string
    ]
      ? Impl.Repeat<Str, Times>
      : never;
  }

export type Repeat<
    Times extends number | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = PartialApply<RepeatFn, [Times, Str]>;

export interface StartsWithFn extends Fn {
    return: this["args"] extends [infer Start extends string, infer Str]
      ? Str extends `${Start}${string}`
        ? true
        : false
      : never;
  }

export type StartsWith<
    Start extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = PartialApply<StartsWithFn, [Start, Str]>;

export interface EndsWithFn extends Fn {
    return: this["args"] extends [infer End extends string, infer Str]
      ? Str extends `${string}${End}`
        ? true
        : false
      : never;
  }

export type EndsWith<
    End extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = PartialApply<EndsWithFn, [End, Str]>;

export interface PrependFn extends Fn {
    return: `${Extract<this["arg0"], Strings.Stringifiable>}${Extract<
      this["arg1"],
      Strings.Stringifiable
    >}`;
  }

export type Prepend<
    Start extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = PartialApply<PrependFn, [Start, Str]>;

export interface AppendFn extends Fn {
    return: `${Extract<this["arg1"], Strings.Stringifiable>}${Extract<
      this["arg0"],
      Strings.Stringifiable
    >}`;
  }

export type Append<
    End extends string | _ | unset = unset,
    Str extends string | _ | unset = unset
  > = PartialApply<AppendFn, [End, Str]>;

export interface CompareFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.Compare<a, b>
      : never;
  }

export type Compare<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = PartialApply<CompareFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface LessThanFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.LessThan<a, b>
      : never;
  }

export type LessThan<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = PartialApply<LessThanFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface LessThanOrEqualFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.LessThanOrEqual<a, b>
      : never;
  }

export type LessThanOrEqual<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = PartialApply<
    LessThanOrEqualFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;

export interface GreaterThanFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.GreaterThan<a, b>
      : never;
  }

export type GreaterThan<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = PartialApply<GreaterThanFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface GreaterThanOrEqualFn extends Fn {
    return: this["args"] extends [
      infer a extends string,
      infer b extends string,
      ...any
    ]
      ? Impl.GreaterThanOrEqual<a, b>
      : never;
  }

export type GreaterThanOrEqual<
    n1 extends string | _ | unset = unset,
    n2 extends string | _ | unset = unset
  > = PartialApply<
    GreaterThanOrEqualFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;
