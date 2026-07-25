/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/methods/forward/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArrayLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsAny<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type KeyOf<TValue> =
  IsAny<TValue> extends true
    ? never
    : TValue extends readonly unknown[]
      ? number extends TValue['length']
        ? number
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
          infer TFirstKey extends KeyOf<TValue> & keyof TValue,
          ...infer TPathRest extends Path,
        ]
      ? LazyPath<
          TValue[TFirstKey],
          TPathRest,
          readonly [...TValidPath, TFirstKey]
        >
      : // If current value has valid keys, return them
        IsNever<KeyOf<TValue>> extends false
        ? readonly [...TValidPath, KeyOf<TValue>]
        : // Otherwise, return only last valid path
          TValidPath;

export type RequiredPath = readonly [string | number, ...Path];

export type ValidPath<
  TValue extends Record<string, unknown> | ArrayLike<unknown>,
  TPath extends RequiredPath,
> = TPath extends LazyPath<TValue, TPath> ? TPath : LazyPath<TValue, TPath>;
