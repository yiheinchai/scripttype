/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/types/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NestedValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type NonUndefined<T> = T extends undefined ? never : T;

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type LiteralUnion<T extends U, U extends Primitive> =
  | T
  | (U & { _?: never });

export type ExtractObjects<T> = T extends infer U
  ? U extends object
    ? U
    : never
  : never;

export type IsPrimitiveLike<T> = T extends Primitive ? true : false;

export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

export interface FileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}

export type BrowserNativeObject = Date | FileList | File;

export type DeepPartial<T> =
  IsPrimitiveLike<T> extends true
    ? T
    : T extends BrowserNativeObject | NestedValue
      ? T
      : {
          [K in keyof T]?: ExtractObjects<T[K]> extends never
            ? T[K]
            : DeepPartial<T[K]>;
        };

export type DeepPartialSkipArrayKey<T> =
  IsPrimitiveLike<T> extends true
    ? T
    : T extends BrowserNativeObject | NestedValue
      ? T
      : T extends ReadonlyArray<any>
        ? { [K in keyof T]: DeepPartialSkipArrayKey<T[K]> }
        : { [K in keyof T]?: DeepPartialSkipArrayKey<T[K]> };

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

export type DeepMap<T, TValue> =
  IsAny<T> extends true
    ? any
    : T extends BrowserNativeObject | NestedValue
      ? TValue
      : T extends ReadonlyArray<infer U>
        ? Array<DeepMap<NonUndefined<U>, TValue> | undefined>
        : T extends object
          ? { [K in keyof T]: DeepMap<NonUndefined<T[K]>, TValue> }
          : TValue;

export type IsFlatObject<T extends object> =
  Extract<
    Exclude<T[keyof T], NestedValue | Date | FileList>,
    any[] | object
  > extends never
    ? true
    : false;

export type Merge<A, B> = {
  [K in keyof A | keyof B]?: K extends keyof A & keyof B
    ? [A[K], B[K]] extends [object, object]
      ? Merge<A[K], B[K]>
      : B[K]
    : K extends keyof A
      ? A[K]
      : K extends keyof B
        ? B[K]
        : never;
};
