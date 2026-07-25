/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/objects/Objects.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Call<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Fn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Impl<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsArrayStrict<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PartialApply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Prettify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Std<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MapValuesImpl<T, fn extends Fn> = {
    [K in keyof T]: Call<fn, T[K], K>;
  };

export type MapKeysImpl<T, fn extends Fn> = {
    [K in keyof T as Extract<Call<fn, K>, PropertyKey>]: T[K];
  };

export type MapKeysDeepImpl<T, fn extends Fn> = IsArrayStrict<T> extends true
    ? MapKeysDeepImpl<Extract<T, readonly any[]>[number], fn>[]
    : T extends object
    ? {
        [K in keyof T as Extract<Call<fn, K>, PropertyKey>]: Prettify<
          MapKeysDeepImpl<T[K], fn>
        >;
      }
    : T;

export type PickImpl<obj, keys> = {
    [key in Extract<keyof obj, keys>]: obj[key];
  };

export interface PickFn extends Fn {
    return: PickImpl<this["arg1"], this["arg0"]>;
  }

export type Pick<key = unset, obj = unset> = PartialApply<PickFn, [key, obj]>;

export type OmitImpl<obj, keys> = {
    [key in Exclude<keyof obj, keys>]: obj[key];
  };

export interface OmitFn extends Fn {
    return: OmitImpl<this["arg1"], this["arg0"]>;
  }

export type Omit<key = unset, obj = unset> = PartialApply<OmitFn, [key, obj]>;

export type PickEntriesImpl<
    entries extends [PropertyKey, any],
    fn extends Fn
  > = entries extends any
    ? Call<fn, entries[1], entries[0]> extends true
      ? entries
      : never
    : never;

export type PickByImpl<T, fn extends Fn> = Impl.FromEntries<
    PickEntriesImpl<Impl.Entries<T>, fn>
  >;

export type OmitEntriesImpl<
    entries extends [PropertyKey, any],
    fn extends Fn
  > = entries extends any
    ? Call<fn, entries[1], entries[0]> extends true
      ? never
      : entries
    : never;

export type OmitByImpl<T, fn extends Fn> = Impl.FromEntries<
    OmitEntriesImpl<Impl.Entries<T>, fn>
  >;

export interface AssignFn extends Fn {
    return: Impl.Assign<this["args"]>;
  }

export type Assign<
    arg1 = unset,
    arg2 = unset,
    arg3 = unset,
    arg4 = unset,
    arg5 = unset
  > = PartialApply<AssignFn, [arg1, arg2, arg3, arg4, arg5]>;

export interface ReadonlyFn extends Fn {
    return: this["args"] extends [infer value] ? Std._Readonly<value> : never;
  }

export type Readonly<value = unset> = PartialApply<ReadonlyFn, [value]>;

export interface RequiredFn extends Fn {
    return: this["args"] extends [infer value] ? Std._Required<value> : never;
  }

export type Required<value = unset> = PartialApply<RequiredFn, [value]>;

export interface PartialFn extends Fn {
    return: this["args"] extends [infer value] ? Std._Partial<value> : never;
  }

export type Partial<value = unset> = PartialApply<PartialFn, [value]>;

export interface MutableFn extends Fn {
    return: this["args"] extends [infer obj, ...any]
      ? { -readonly [key in keyof obj]: obj[key] }
      : never;
  }

export type Mutable<obj = unset> = PartialApply<MutableFn, [obj]>;

export interface PartialDeepFn extends Fn {
    return: this["args"] extends [infer obj]
      ? Impl.TransformObjectDeep<PartialFn, obj>
      : never;
  }

export type PartialDeep<obj = unset> = PartialApply<PartialDeepFn, [obj]>;

export interface RequiredDeepFn extends Fn {
    return: this["args"] extends [infer obj]
      ? Impl.TransformObjectDeep<RequiredFn, obj>
      : never;
  }

export type RequiredDeep<obj = unset> = PartialApply<RequiredDeepFn, [obj]>;

export interface ReadonlyDeepFn extends Fn {
    return: this["args"] extends [infer obj]
      ? Impl.TransformObjectDeep<ReadonlyFn, obj>
      : never;
  }

export type ReadonlyDeep<obj = unset> = PartialApply<ReadonlyDeepFn, [obj]>;

export interface MutableDeepFn extends Fn {
    return: this["args"] extends [infer obj]
      ? Impl.TransformObjectDeep<MutableFn, obj>
      : never;
  }

export type MutableDeep<obj = unset> = PartialApply<MutableDeepFn, [obj]>;

export interface GetFn extends Fn {
    return: this["args"] extends [
      infer path extends string | number,
      infer obj,
      ...any
    ]
      ? Impl.GetFromPath<obj, path>
      : never;
  }

export type Get<
    path extends string | number | _ | unset = unset,
    obj = unset
  > = PartialApply<GetFn, [path, obj]>;

export interface UpdateFn extends Fn {
    return: this["args"] extends [
      infer path extends string | number,
      infer fnOrValue,
      infer obj,
      ...any
    ]
      ? Impl.Update<obj, path, fnOrValue>
      : never;
  }

export type Update<
    path extends string | number | _ | unset = unset,
    fnOrValue = unset,
    obj = unset
  > = PartialApply<UpdateFn, [path, fnOrValue, obj]>;

export interface CreateFn extends Fn {
    return: this["args"] extends [infer pattern, ...infer args]
      ? Impl.Create<pattern, args>
      : never;
  }

export type Create<
    pattern = unset,
    arg0 = unset,
    arg1 = unset,
    arg2 = unset,
    arg3 = unset
  > = PartialApply<CreateFn, [pattern, arg0, arg1, arg2, arg3]>;

export interface RecordFn extends Fn {
    return: this["args"] extends [infer union extends string, infer value]
      ? Std._Record<union, value>
      : never;
  }

export type Record<
    union extends string | _ | unset = unset,
    value = unset
  > = PartialApply<RecordFn, [union, value]>;
