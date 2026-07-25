/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/numbers/Numbers.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Impl<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PartialApply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface AddFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Add<a, b>
      : never;
  }

export type Add<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<AddFn, [n1, n2]>;

export interface SubFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Sub<a, b>
      : never;
  }

export type Sub<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<SubFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface MulFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Mul<a, b>
      : never;
  }

export type Mul<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<MulFn, [n1, n2]>;

export interface DivFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Div<a, b>
      : never;
  }

export type Div<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<DivFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface ModFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Mod<a, b>
      : never;
  }

export type Mod<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<ModFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface NegateFn extends Fn {
    return: this["args"] extends [infer a extends number | bigint, ...any]
      ? Impl.Negate<a>
      : never;
  }

export type Negate<n extends number | bigint | _ | unset = unset> =
    PartialApply<NegateFn, [n]>;

export interface AbsFn extends Fn {
    return: this["args"] extends [infer a extends number | bigint, ...any]
      ? Impl.Abs<a>
      : never;
  }

export type Abs<n extends number | bigint | _ | unset = unset> = PartialApply<
    AbsFn,
    [n]
  >;

export interface MaxFn extends Fn {
    return: Impl.Max<
      Extract<this["arg0"], number | bigint>,
      Extract<this["arg1"], number | bigint>
    >;
  }

export type Max<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<MaxFn, [n1, n2]>;

export interface MinFn extends Fn {
    return: Impl.Min<
      Extract<this["arg0"], number | bigint>,
      Extract<this["arg1"], number | bigint>
    >;
  }

export type Min<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<MinFn, [n1, n2]>;

export interface PowerFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Power<a, b>
      : never;
  }

export type Power<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<PowerFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface CompareFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Compare<a, b>
      : never;
  }

export type Compare<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<CompareFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface EqualFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.Equal<a, b>
      : never;
  }

export type Equal<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<EqualFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface NotEqualFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.NotEqual<a, b>
      : never;
  }

export type NotEqual<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<NotEqualFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface LessThanFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.LessThan<a, b>
      : never;
  }

export type LessThan<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<LessThanFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface LessThanOrEqualFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.LessThanOrEqual<a, b>
      : never;
  }

export type LessThanOrEqual<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<
    LessThanOrEqualFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;

export interface GreaterThanFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.GreaterThan<a, b>
      : never;
  }

export type GreaterThan<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<GreaterThanFn, n2 extends unset ? [unset, n1] : [n1, n2]>;

export interface GreaterThanOrEqualFn extends Fn {
    return: this["args"] extends [
      infer a extends number | bigint,
      infer b extends number | bigint,
      ...any
    ]
      ? Impl.GreaterThanOrEqual<a, b>
      : never;
  }

export type GreaterThanOrEqual<
    n1 extends number | bigint | _ | unset = unset,
    n2 extends number | bigint | _ | unset = unset
  > = PartialApply<
    GreaterThanOrEqualFn,
    n2 extends unset ? [unset, n1] : [n1, n2]
  >;
