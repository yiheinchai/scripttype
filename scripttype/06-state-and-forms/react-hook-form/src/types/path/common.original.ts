/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/path/common.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsTuple<T extends ReadonlyArray<any>> = number extends T['length']
  ? false
  : true;

export type Key = string;

export type AsKey<T> = Extract<T, Key>;

export type ArrayKey = number;

export type ToKey<T> = T extends ArrayKey ? `${T}` : AsKey<T>;

export type PathTuple = Key[];

export type AsPathTuple<T> = Extract<T, PathTuple>;

export type UnionToIntersection<U> = (
  U extends any ? (_: U) => any : never
) extends (_: infer I) => any
  ? I
  : never;

export type AppendNonBlankKey<PT extends PathTuple, K extends Key> = K extends ''
  ? PT
  : [...PT, K];

export type PathString = string;

export type SplitPathStringImpl<
  PS extends PathString,
  PT extends PathTuple,
> = PS extends `${infer K}.${infer R}`
  ? SplitPathStringImpl<R, AppendNonBlankKey<PT, K>>
  : AppendNonBlankKey<PT, PS>;

export type SplitPathString<PS extends PathString> = SplitPathStringImpl<
  PS,
  []
>;

export type JoinPathTupleImpl<
  PT extends PathTuple,
  PS extends PathString,
> = PT extends [infer K, ...infer R]
  ? JoinPathTupleImpl<AsPathTuple<R>, `${PS}.${AsKey<K>}`>
  : PS;

export type JoinPathTuple<PT extends PathTuple> = PT extends [
  infer K,
  ...infer R,
]
  ? JoinPathTupleImpl<AsPathTuple<R>, AsKey<K>>
  : never;

export type MapKeys<T> = { [K in keyof T as ToKey<K>]: T[K] };

export type TryAccess<T, K> = K extends keyof T
  ? T[K]
  : T extends null
    ? null
    : undefined;

export type TryAccessArray<
  T extends ReadonlyArray<any>,
  K extends Key,
> = K extends `${ArrayKey}` ? T[number] : TryAccess<T, K>;

export type EvaluateKey<T, K extends Key> =
  T extends ReadonlyArray<any>
    ? IsTuple<T> extends true
      ? TryAccess<T, K>
      : TryAccessArray<T, K>
    : TryAccess<MapKeys<T>, K>;

export type EvaluatePath<T, PT extends PathTuple> = PT extends [
  infer K,
  ...infer R,
]
  ? EvaluatePath<EvaluateKey<T, AsKey<K>>, AsPathTuple<R>>
  : T;

export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<
  keyof T,
  keyof any[]
>;

export type Traversable = object;

export type NumericObjectKeys<T extends Traversable> = ToKey<
  Extract<keyof T, ArrayKey | `${ArrayKey}`>
>;

export type NumericKeys<T extends Traversable> = UnionToIntersection<
  T extends ReadonlyArray<any>
    ? IsTuple<T> extends true
      ? [TupleKeys<T>]
      : [ToKey<ArrayKey>]
    : [NumericObjectKeys<T>]
>[never];

export type ObjectKeys<T extends Traversable> = Exclude<
  ToKey<keyof T>,
  `${string}.${string}` | ''
>;

export type CheckKeyConstraint<T, K extends Key, U> = K extends any
  ? EvaluateKey<T, K> extends U
    ? K
    : never
  : never;

export type ContainsIndexable<T> =
  IsNever<Extract<T, ReadonlyArray<any>>> extends true ? false : true;

export type KeysImpl<T> = [T] extends [Traversable]
  ? ContainsIndexable<T> extends true
    ? NumericKeys<T>
    : ObjectKeys<T>
  : never;

export type Keys<T, U = unknown> =
  IsAny<T> extends true
    ? Key
    : IsNever<T> extends true
      ? Key
      : IsNever<NonNullable<T>> extends true
        ? never
        : CheckKeyConstraint<T, KeysImpl<NonNullable<T>>, U>;

export type HasKey<T, K extends Key> = IsNever<Exclude<K, Keys<T>>>;

export type ValidPathPrefixImpl<
  T,
  PT extends PathTuple,
  VPT extends PathTuple,
> = PT extends [infer K, ...infer R]
  ? HasKey<T, AsKey<K>> extends true
    ? ValidPathPrefixImpl<
        EvaluateKey<T, AsKey<K>>,
        AsPathTuple<R>,
        AsPathTuple<[...VPT, K]>
      >
    : VPT
  : VPT;

export type ValidPathPrefix<T, PT extends PathTuple> = ValidPathPrefixImpl<
  T,
  PT,
  []
>;

export type HasPath<T, PT extends PathTuple> =
  ValidPathPrefix<T, PT> extends PT ? true : false;
