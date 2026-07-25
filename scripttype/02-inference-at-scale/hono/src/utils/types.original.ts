/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/utils/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Expect<T extends true> = T

export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export type RemoveBlankRecord<T> =
  T extends Record<infer K, unknown> ? (K extends string ? T : never) : never

export type IfAnyThenEmptyObject<T> = 0 extends 1 & T ? {} : T

export type InvalidJSONValue = undefined | symbol | ((...args: unknown[]) => unknown)

export type InvalidToNull<T> = T extends InvalidJSONValue ? null : T

export type IsInvalid<T> = T extends InvalidJSONValue ? true : false

export type OmitSymbolKeys<T> = { [K in keyof T as K extends symbol ? never : K]: T[K] }

export type JSONPrimitive = string | boolean | number | null

export type JSONArray = (JSONPrimitive | JSONObject | JSONArray)[]

export type JSONObject = {
  [key: string]: JSONPrimitive | JSONArray | JSONObject | object | InvalidJSONValue
}

export type JSONValue = JSONObject | JSONArray | JSONPrimitive

export type JSONParsed<T, TError = bigint | ReadonlyArray<bigint>> = T extends {
  toJSON(): infer J
}
  ? (() => J) extends () => JSONPrimitive
    ? J
    : (() => J) extends () => { toJSON(): unknown }
      ? {}
      : JSONParsed<J, TError>
  : T extends JSONPrimitive
    ? T
    : T extends InvalidJSONValue
      ? never
      : T extends ReadonlyArray<unknown>
        ? { [K in keyof T]: JSONParsed<InvalidToNull<T[K]>, TError> } extends infer A
          ? A extends ReadonlyArray<unknown>
            ? A // plain array or tuple; the mapped type preserves array-ness
            : JSONParsed<InvalidToNull<T[number]>, TError>[] // array with extra properties; JSON.stringify drops them
          : never
        : T extends Set<unknown> | Map<unknown, unknown> | Record<string, never>
          ? {}
          : T extends object
            ? T[keyof T] extends TError
              ? never
              : {
                  [K in keyof OmitSymbolKeys<T> as IsInvalid<T[K]> extends true
                    ? never
                    : K]: boolean extends IsInvalid<T[K]>
                    ? JSONParsed<T[K], TError> | undefined
                    : JSONParsed<T[K], TError>
                }
            : T extends unknown
              ? T extends TError
                ? never
                : JSONValue
              : never

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}

export type SimplifyDeepArray<T> = T extends any[]
  ? { [E in keyof T]: SimplifyDeepArray<T[E]> }
  : Simplify<T>

export type InterfaceToType<T> = T extends Function ? T : { [K in keyof T]: InterfaceToType<T[K]> }

export type RequiredKeysOf<BaseType extends object> = Exclude<
  {
    [Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]> ? Key : never
  }[keyof BaseType],
  undefined
>

export type HasRequiredKeys<BaseType extends object> =
  RequiredKeysOf<BaseType> extends never ? false : true

export type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false

export type StringLiteralUnion<T> = T | (string & Record<never, never>)
