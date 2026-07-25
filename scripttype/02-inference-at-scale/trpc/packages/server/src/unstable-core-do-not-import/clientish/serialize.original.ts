/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/clientish/serialize.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AsyncIterable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PromiseLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WithoutIndexSignature<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type JsonPrimitive = boolean | number | string | null;

export type JsonObject = {
  readonly [key: string | number]: JsonValue;
  [key: symbol]: never;
};

export type JsonArray = JsonValue[] | readonly JsonValue[];

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type IsJson<T> = T extends JsonValue ? true : false;

export type IsAny<T> = 0 extends T & 1 ? true : false;

export type IsRecord<T extends object> = keyof WithoutIndexSignature<T> extends never
  ? true
  : false;

export type JsonReturnable = JsonPrimitive | undefined;

export type NonJsonPrimitive = Function | symbol | undefined;

export type SerializeTuple<T extends [unknown, ...unknown[]]> = {
  [K in keyof T]: T[K] extends NonJsonPrimitive ? null : Serialize<T[K]>;
};

export type SerializeObjectKey<T extends Record<any, any>, K> = 
  // never include entries where the key is a symbol
  K extends symbol ? never : 
  // always include entries where the value is any
  IsAny<T[K]> extends true ? K :
  // always include entries where the value is unknown
  unknown extends T[K] ? K : 
  // never include entries where the value is a non-JSON primitive
  T[K] extends NonJsonPrimitive ? never : 
  // otherwise serialize the value
  K;

export type SerializeObject<T extends object> = {
  [K in keyof T as SerializeObjectKey<T, K>]: Serialize<T[K]>;
};

export type FilterDefinedKeys<T extends object> = Exclude<
  {
    [K in keyof T]: undefined extends T[K] ? never : K;
  }[keyof T],
  undefined
>;

export type ExactOptionalPropertyTypes = { a?: 0 | undefined } extends {
  a?: 0;
}
  ? false
  : true;

export type HandleIndexSignature<T extends object> = {
  [K in keyof Omit<T, keyof WithoutIndexSignature<T>>]: Exclude<
    T[K],
    undefined
  >;
};

export type HandleUndefined<T extends object> = {
  [K in keyof Omit<T, FilterDefinedKeys<T>>]?: Exclude<T[K], undefined>;
};

export type HasIndexSignature<T extends object> = string extends keyof T
  ? true
  : false;

export type UndefinedToOptional<T extends object> =
  // Property is not a union with `undefined`, keep as-is
  Pick<WithoutIndexSignature<T>, FilterDefinedKeys<WithoutIndexSignature<T>>> &
    // If following is true, don't merge undefined or optional into index signature if any in T
    (ExactOptionalPropertyTypes extends true
      ? HandleIndexSignature<T> & HandleUndefined<WithoutIndexSignature<T>>
      : HasIndexSignature<T> extends true
        ? HandleIndexSignature<T>
        : HandleUndefined<T>);

export type Serialize<T> =
  IsAny<T> extends true ? any :
  unknown extends T ? unknown :
  IsJson<T> extends true ? T :
  T extends AsyncIterable<infer $T, infer $Return, infer $Next> ? AsyncIterable<Serialize<$T>, Serialize<$Return>, Serialize<$Next>> :
  T extends PromiseLike<infer $T> ? Promise<Serialize<$T>> :
  T extends JsonReturnable ? T :
  T extends Map<any, any> | Set<any> ? object :
  T extends NonJsonPrimitive ? never :
  T extends { toJSON(): infer U } ? U :
  T extends [] ? [] :
  T extends [unknown, ...unknown[]] ? SerializeTuple<T> :
  T extends readonly (infer U)[] ? (U extends NonJsonPrimitive ? null : Serialize<U>)[] :
  T extends object ?
    IsRecord<T> extends true ? Record<keyof T, Serialize<T[keyof T]>> :
    Simplify<SerializeObject<UndefinedToOptional<T>>> :
  never;
