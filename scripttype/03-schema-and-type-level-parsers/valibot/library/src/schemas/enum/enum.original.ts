/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/schemas/enum/enum.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface Enum {
  [key: string]: string | number;
}

export type EnumValues<TEnum extends Enum> = {
  [TKey in keyof TEnum]: TKey extends number
    ? TEnum[TKey] extends string
      ? TEnum[TEnum[TKey]] extends TKey
        ? never
        : TEnum[TKey]
      : TEnum[TKey]
    : TKey extends 'NaN' | 'Infinity' | '-Infinity'
      ? TEnum[TKey] extends string
        ? TEnum[TEnum[TKey]] extends number
          ? never
          : TEnum[TKey]
        : TEnum[TKey]
      : TKey extends `+${number}`
        ? TEnum[TKey]
        : TKey extends `${infer TNumber extends number}`
          ? TEnum[TKey] extends string
            ? TEnum[TEnum[TKey]] extends TNumber
              ? never
              : TEnum[TKey]
            : TEnum[TKey]
          : TEnum[TKey];
}[keyof TEnum];
