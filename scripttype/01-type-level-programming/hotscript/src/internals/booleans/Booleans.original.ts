/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/booleans/Booleans.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Compose<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Equal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Every<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PartialApply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Some<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ExtendsImpl<a, b> = [a] extends [b] ? true : false;

export interface ExtendsFn extends Fn {
    return: this["args"] extends [infer first, infer second, ...any]
      ? ExtendsImpl<first, second>
      : never;
  }

export type Extends<a = unset, b = unset> = PartialApply<
    ExtendsFn,
    b extends unset ? [unset, a] : [a, b]
  >;

export type NotImpl<a> = a extends true ? false : true;

export interface NotFn extends Fn {
    return: this["args"] extends [infer first, ...any] ? NotImpl<first> : never;
  }

export type Not<a = unset> = PartialApply<NotFn, [a]>;

export interface EqualsFn extends Fn {
    return: this["args"] extends [infer a, infer b, ...any]
      ? Equal<a, b>
      : never;
  }

export type Equals<a = unset, b = unset> = PartialApply<EqualsFn, [a, b]>;

export type NotEqual<a = unset, b = unset> = Compose<
    [Not, PartialApply<EqualsFn, [a, b]>]
  >;

export type DoesNotExtend<a = unset, b = unset> = Compose<
    [Not, PartialApply<ExtendsFn, [a, b]>]
  >;

export interface AndFn extends Fn {
    return: this["args"] extends [
      infer first extends boolean,
      infer second extends boolean,
      ...any
    ]
      ? Every<[first, second]>
      : never;
  }

export type And<a = unset, b = unset> = PartialApply<AndFn, [a, b]>;

export interface OrFn extends Fn {
    return: this["args"] extends [
      infer first extends boolean,
      infer second extends boolean,
      ...any
    ]
      ? Some<[first, second]>
      : never;
  }

export type Or<a = unset, b = unset> = PartialApply<OrFn, [a, b]>;

export interface XOrFn extends Fn {
    return: this["args"] extends [
      infer first extends boolean,
      infer second extends boolean,
      ...any
    ]
      ? first extends second
        ? false
        : true
      : never;
  }

export type XOr<a = unset, b = unset> = PartialApply<XOrFn, [a, b]>;
