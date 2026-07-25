/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/path/eager.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArrayKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BrowserNativeObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FieldValues<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsEqual<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Prev<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Primitive<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TupleKeys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type AnyIsEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;

export type PathInternal<T, TraversedTypes = T, D extends number = 9> = [D] extends [
  never,
]
  ? never
  : T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes, D>;
        }[TupleKeys<T>]
      : PathImpl<ArrayKey, V, TraversedTypes, D>
    : {
        [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes, D>;
      }[keyof T];

export type PathImpl<
  K extends string | number,
  V,
  TraversedTypes,
  D extends number = 9,
> = V extends Primitive | BrowserNativeObject
  ? `${K}`
  : // Check so that we don't recurse into the same type
    // by ensuring that the types are mutually assignable
    // mutually required to avoid false positives of subtypes
    true extends AnyIsEqual<TraversedTypes, V>
    ? `${K}`
    : `${K}` | `${K}.${PathInternal<V, TraversedTypes | V, Prev[D]>}`;

export type Path<T> = T extends any ? PathInternal<T> : never;

export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;

export type ArrayPathInternal<T, TraversedTypes = T, D extends number = 9> = [
  D,
] extends [never]
  ? never
  : T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKeys<T>]-?: ArrayPathImpl<
            K & string,
            T[K],
            TraversedTypes,
            D
          >;
        }[TupleKeys<T>]
      : ArrayPathImpl<ArrayKey, V, TraversedTypes, D>
    : {
        [K in keyof T]-?: ArrayPathImpl<K & string, T[K], TraversedTypes, D>;
      }[keyof T];

export type ArrayPathImpl<
  K extends string | number,
  V,
  TraversedTypes,
  D extends number = 9,
> = V extends Primitive | BrowserNativeObject
  ? IsAny<V> extends true
    ? string
    : never
  : V extends ReadonlyArray<infer U>
    ? U extends Primitive | BrowserNativeObject
      ? IsAny<V> extends true
        ? string
        : never
      : // Check so that we don't recurse into the same type
        // by ensuring that the types are mutually assignable
        // mutually required to avoid false positives of subtypes
        true extends AnyIsEqual<TraversedTypes, V>
        ? never
        : `${K}` | `${K}.${ArrayPathInternal<V, TraversedTypes | V, Prev[D]>}`
    : true extends AnyIsEqual<TraversedTypes, V>
      ? never
      : `${K}.${ArrayPathInternal<V, TraversedTypes | V, Prev[D]>}`;

export type ArrayPath<T> = T extends any ? ArrayPathInternal<T> : never;

export type FieldArrayPath<TFieldValues extends FieldValues> =
  ArrayPath<TFieldValues>;

export type PathValueImpl<T, P extends string> = T extends any
  ? P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? undefined extends T[K]
        ? PathValueImpl<T[K], R> | undefined
        : PathValueImpl<T[K], R>
      : K extends `${ArrayKey}`
        ? T extends ReadonlyArray<infer V>
          ? PathValueImpl<V, R>
          : never
        : never
    : P extends keyof T
      ? T[P]
      : P extends `${ArrayKey}`
        ? T extends ReadonlyArray<infer V>
          ? V
          : T extends undefined
            ? undefined
            : never
        : never
  : never;

export type PathValue<T, P extends Path<T> | ArrayPath<T>> = PathValueImpl<
  T,
  P
>;

export type FieldPathValue<
  TFieldValues extends FieldValues,
  TFieldPath extends FieldPath<TFieldValues>,
> = PathValue<TFieldValues, TFieldPath>;

export type FieldArrayPathValue<
  TFieldValues extends FieldValues,
  TFieldArrayPath extends FieldArrayPath<TFieldValues>,
> = PathValue<TFieldValues, TFieldArrayPath>;

export type FieldPathValues<
  TFieldValues extends FieldValues,
  TPath extends FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[],
> = {} & {
  [K in keyof TPath]: FieldPathValue<
    TFieldValues,
    TPath[K] & FieldPath<TFieldValues>
  >;
};

export type FieldPathByValue<TFieldValues extends FieldValues, TValue> = {
  [Key in FieldPath<TFieldValues>]: FieldPathValue<
    TFieldValues,
    Key
  > extends TValue
    ? Key
    : never;
}[FieldPath<TFieldValues>];

export type FieldArrayPathByValue<TFieldValues extends FieldValues, TValue> = {
  [Key in FieldArrayPath<TFieldValues>]: FieldArrayPathValue<
    TFieldValues,
    Key
  > extends TValue
    ? Key
    : never;
}[FieldArrayPath<TFieldValues>];
