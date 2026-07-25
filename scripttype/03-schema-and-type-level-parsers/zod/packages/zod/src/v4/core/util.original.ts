/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/zod/packages/zod/src/v4/core/util.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Generator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type errors<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type schemas<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AssertEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? true : false;

export type AssertNotEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends <V>() => V extends U ? 1 : 2 ? false : true;

export type AssertExtends<T, U> = T extends U ? T : never;

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;

export type InexactPartial<T> = {
  [P in keyof T]?: T[P] | undefined;
};

export type MakePartial<T, K extends keyof T> = Omit<T, K> & InexactPartial<Pick<T, K>>;

export type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;

export type NoUndefined<T> = T extends undefined ? never : T;

export type LoosePartial<T extends object> = InexactPartial<T> & {
  [k: string]: unknown;
};

export type Mask<Keys extends PropertyKey> = { [K in Keys]?: true };

export type Writeable<T> = { -readonly [P in keyof T]: T[P] } & {};

export type BuiltIn =
  | (((...args: any[]) => any) | (new (...args: any[]) => any))
  | { readonly [Symbol.toStringTag]: string }
  | Date
  | Error
  | Generator
  | Promise<unknown>
  | RegExp;

export type MakeReadonly<T> = T extends Map<infer K, infer V>
  ? ReadonlyMap<K, V>
  : T extends Set<infer V>
    ? ReadonlySet<V>
    : T extends [infer Head, ...infer Tail]
      ? readonly [Head, ...Tail]
      : T extends Array<infer V>
        ? ReadonlyArray<V>
        : T extends BuiltIn
          ? T
          : Readonly<T>;

export type Identity<T> = T;

export type Flatten<T> = Identity<{ [k in keyof T]: T[k] }>;

export type Mapped<T> = { [k in keyof T]: T[k] };

export type Prettify<T> = {
  // @ts-ignore
  [K in keyof T]: T[K];
} & {};

export type NoNeverKeys<T> = {
  [k in keyof T]: [T[k]] extends [never] ? never : k;
}[keyof T];

export type NoNever<T> = Identity<{
  [k in NoNeverKeys<T>]: k extends keyof T ? T[k] : never;
}>;

export type SomeObject = Record<PropertyKey, any>;

export type Extend<A extends SomeObject, B extends SomeObject> = Flatten<
  // fast path when there is no keys overlap
  keyof A & keyof B extends never
    ? A & B
    : {
        [K in keyof A as K extends keyof B ? never : K]: A[K];
      } & {
        [K in keyof B]: B[K];
      }
>;

export type AnyFunc = (...args: any[]) => any;

export type IsProp<T, K extends keyof T> = T[K] extends AnyFunc ? never : K;

export type MaybeAsync<T> = T | Promise<T>;

export type OmitIndexSignature<T> = {
  [K in keyof T as string extends K ? never : K extends string ? K : never]: T[K];
};

export type KeyOf<T> = keyof OmitIndexSignature<T>;

export type ExtractIndexSignature<T> = {
  [K in keyof T as string extends K ? K : K extends string ? never : K]: T[K];
};

export type Keys<T extends object> = keyof OmitIndexSignature<T>;

export type SchemaClass<T extends schemas.SomeType> = {
  new (def: T["_zod"]["def"]): T;
};

export type EnumValue = string | number;

export type ToEnum<T extends EnumValue> = Flatten<{ [k in T]: k }>;

export type KeysEnum<T extends object> = ToEnum<Exclude<keyof T, symbol>>;

export type KeysArray<T extends object> = Flatten<(keyof T & string)[]>;

export type SafeParseSuccess<T> = { success: true; data: T; error?: never };

export type SafeParseError<T> = {
  success: false;
  data?: never;
  error: errors.$ZodError<T>;
};

export type SafeParseResult<T> = SafeParseSuccess<T> | SafeParseError<T>;

export type EmptyToNever<T> = keyof T extends never ? never : T;

export type Normalize<T> = T extends undefined
  ? never
  : T extends Record<any, any>
    ? Flatten<
        {
          [k in keyof Omit<T, "error" | "message">]: T[k];
        } & ("error" extends keyof T
          ? {
              error?: Exclude<T["error"], string>;
              // path?: PropertyKey[] | undefined;
              // message?: string | undefined;
            }
          : unknown)
      >
    : never;

export type CleanKey<T extends PropertyKey> = T extends `?${infer K}` ? K : T extends `${infer K}?` ? K : T;

export type ToCleanMap<T extends schemas.$ZodLooseShape> = {
  [k in keyof T]: k extends `?${infer K}` ? K : k extends `${infer K}?` ? K : k;
};

export type FromCleanMap<T extends schemas.$ZodLooseShape> = {
  [k in keyof T as k extends `?${infer K}` ? K : k extends `${infer K}?` ? K : k]: k;
};

export type Constructor<T, Def extends any[] = any[]> = new (...args: Def) => T;
