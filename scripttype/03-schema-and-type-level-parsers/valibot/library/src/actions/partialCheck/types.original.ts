/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/actions/partialCheck/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsNever<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type KeyOf<TValue> =
  IsAny<TValue> extends true
    ? never
    : TValue extends readonly unknown[]
      ? number extends TValue['length']
        ? '$' // For arrays we use '$' as a wildcard
        : {
            [TKey in keyof TValue]: TKey extends `${infer TIndex extends number}`
              ? TIndex
              : never;
          }[number]
      : TValue extends Record<string, unknown>
        ? keyof TValue & (string | number)
        : never;

export type Path = readonly (string | number)[];

export type LazyPath<
  TValue,
  TPathToCheck extends Path,
  TValidPath extends Path = readonly [],
> =
  // If path to check is empty, return last valid path
  TPathToCheck extends readonly []
    ? TValidPath
    : // If first key of path to check is valid, continue with next key
      TPathToCheck extends readonly [
          infer TFirstKey extends KeyOf<TValue>,
          ...infer TPathRest extends Path,
        ]
      ? LazyPath<
          TFirstKey extends keyof TValue
            ? TValue[TFirstKey]
            : TFirstKey extends '$'
              ? TValue extends readonly unknown[]
                ? TValue[number]
                : never
              : never,
          TPathRest,
          readonly [...TValidPath, TFirstKey]
        >
      : // If current value has valid keys, return them
        IsNever<KeyOf<TValue>> extends false
        ? readonly [...TValidPath, KeyOf<TValue>]
        : // Otherwise, return only last valid path
          TValidPath;

export type RequiredPath = readonly [string | number, ...Path];

export type ValidPath<TValue, TPath extends RequiredPath> =
  TPath extends LazyPath<TValue, TPath> ? TPath : LazyPath<TValue, TPath>;

export type RequiredPaths = readonly [RequiredPath, ...RequiredPath[]];

export type ValidPaths<TValue, TPaths extends RequiredPaths> = {
  [TKey in keyof TPaths]: ValidPath<TValue, TPaths[TKey]>;
};

export type DeepPick<TValue, TPath extends Path> = TPath extends readonly [
  infer TFirstKey extends string | number,
  ...infer TPathRest extends Path,
]
  ? TValue extends readonly unknown[]
    ? number extends TValue['length']
      ? TPathRest extends readonly []
        ? TValue
        : DeepPick<TValue[number], TPathRest>[]
      : {
          [TKey in keyof TValue]: TKey extends `${TFirstKey}`
            ? TPathRest extends readonly []
              ? TValue[TKey]
              : DeepPick<TValue[TKey], TPathRest>
            : unknown;
        }
    : {
        [TKey in keyof TValue as TKey extends TFirstKey
          ? TKey
          : never]: TPathRest extends readonly []
          ? TValue[TKey]
          : DeepPick<TValue[TKey], TPathRest>;
      }
  : never;

export type DeepMerge<TValue1, TValue2> = TValue1 extends readonly unknown[]
  ? TValue2 extends readonly unknown[]
    ? number extends TValue1['length'] | TValue2['length']
      ? DeepMerge<TValue1[number], TValue2[number]>[]
      : {
          [TKey in keyof TValue1]: TKey extends keyof TValue2
            ? unknown extends TValue1[TKey]
              ? TValue2[TKey]
              : TValue1[TKey]
            : never;
        }
    : never
  : TValue1 extends Record<string, unknown>
    ? TValue2 extends Record<string, unknown>
      ? {
          [TKey in keyof (TValue1 & TValue2)]: TKey extends keyof TValue1
            ? TKey extends keyof TValue2
              ? DeepMerge<TValue1[TKey], TValue2[TKey]>
              : TValue1[TKey]
            : TKey extends keyof TValue2
              ? TValue2[TKey]
              : never;
        }
      : never
    : TValue1 & TValue2;

export type Paths = readonly RequiredPath[];

export type DeepPickN<TInput, TPaths extends Paths> = TPaths extends readonly [
  infer TFirstPath extends Path,
  ...infer TRestPaths extends Paths,
]
  ? TRestPaths extends readonly []
    ? DeepPick<TInput, TFirstPath>
    : DeepMerge<DeepPick<TInput, TFirstPath>, DeepPickN<TInput, TRestPaths>>
  : TInput;
