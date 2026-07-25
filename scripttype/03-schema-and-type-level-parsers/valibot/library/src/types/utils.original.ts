/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/types/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Pick<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type IsAny<Type> = 0 extends 1 & Type ? true : false;

export type IsNever<Type> = [Type] extends [never] ? true : false;

export type NonNullable<TValue> = TValue extends null ? never : TValue;

export type NonNullish<TValue> = TValue extends null | undefined
  ? never
  : TValue;

export type NonOptional<TValue> = TValue extends undefined ? never : TValue;

export type MaybeReadonly<TValue> = TValue | Readonly<TValue>;

export type DeepReadonly<TValue> = TValue extends
  | Record<string, unknown>
  | readonly unknown[]
  ? { readonly [TKey in keyof TValue]: DeepReadonly<TValue[TKey]> }
  : TValue;

export type MaybeDeepReadonly<TValue> = TValue | DeepReadonly<TValue>;

export type MaybePromise<TValue> = TValue | Promise<TValue>;

export type Prettify<TObject> = { [TKey in keyof TObject]: TObject[TKey] } & {};

export type MarkOptional<TObject, TKeys extends keyof TObject> =
  // Mapping any entry to unknown preserves key order in final output
  { [TKey in keyof TObject]?: unknown } & Omit<TObject, TKeys> &
    Partial<Pick<TObject, TKeys>>;

export type Merge<TFirstObject, TSecondObject> = Omit<
  TFirstObject,
  keyof TFirstObject & keyof TSecondObject
> &
  TSecondObject;

export type FirstTupleItem<TTuple extends readonly [unknown, ...unknown[]]> =
  TTuple[0];

export type LastTupleItem<TTuple extends readonly [unknown, ...unknown[]]> =
  TTuple[TTuple extends readonly [unknown, ...infer TRest]
    ? TRest['length']
    : never];

export type UnionToIntersect<TUnion> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (TUnion extends any ? (arg: TUnion) => void : never) extends (
    arg: infer Intersect
  ) => void
    ? Intersect
    : never;

export type UnionToTupleHelper<TUnion, TResult extends unknown[]> =
  UnionToIntersect<
    TUnion extends never ? never : () => TUnion
  > extends () => infer TLast
    ? UnionToTupleHelper<Exclude<TUnion, TLast>, [TLast, ...TResult]>
    : TResult;

export type UnionToTuple<TUnion> = UnionToTupleHelper<TUnion, []>;
