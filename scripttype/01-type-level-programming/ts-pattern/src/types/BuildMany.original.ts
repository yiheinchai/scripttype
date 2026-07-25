/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-pattern/src/types/BuildMany.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IsOptionalKeysOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Iterator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UpdateAt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValueOf<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type SetDeep<data, value, path> = path extends readonly [
  infer head,
  ...infer tail
]
  ? data extends readonly any[]
    ? data extends readonly [any, ...any]
      ? head extends number
        ? UpdateAt<data, Iterator<head>, SetDeep<data[head], value, tail>>
        : never
      : SetDeep<ValueOf<data>, value, tail>[]
    : data extends Set<infer a>
    ? Set<SetDeep<a, value, tail>>
    : data extends Map<infer k, infer v>
    ? Map<k, SetDeep<v, value, tail>>
    : head extends keyof data
    ? // if we intentionally set undefined on an optional key, we should keep
      // the optional modifier, otherwise it will exclude the `undefined` type from
      // our `value` type.
      [IsOptionalKeysOf<data, head>, tail, undefined] extends [true, [], value]
      ? { [k in keyof data]: k extends head ? value : data[k] }
      : {
          [k in keyof data]-?: k extends head
            ? SetDeep<data[head], value, tail>
            : data[k];
        }
    : data
  : value;

export type BuildOne<data, xs extends readonly any[]> = xs extends [
  [infer value, infer path],
  ...infer tail
]
  ? BuildOne<SetDeep<data, value, path>, tail>
  : data;

export type BuildMany<data, xs extends readonly any[]> = xs extends any
  ? BuildOne<data, xs>
  : never;
