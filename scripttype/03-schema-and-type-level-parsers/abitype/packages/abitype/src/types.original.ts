/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/abitype/packages/abitype/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Error<messages extends string | string[]> = messages extends string
  ? [
      // Surrounding with array to prevent `messages` from being widened to `string`
      `Error: ${messages}`,
    ]
  : {
      [key in keyof messages]: messages[key] extends infer message extends
        string
        ? `Error: ${message}`
        : never
    }

export type Filter<
  items extends readonly unknown[],
  item,
  ///
  acc extends readonly unknown[] = [],
> = items extends readonly [
  infer head,
  ...infer tail extends readonly unknown[],
]
  ? [head] extends [item]
    ? Filter<tail, item, acc>
    : Filter<tail, item, [...acc, head]>
  : readonly [...acc]

export type IsUnknown<type> = unknown extends type ? true : false

export type IsNever<type> = [type] extends [never] ? true : false

export type IsNarrowable<type, type2> =
  IsUnknown<type> extends true
    ? false
    : IsNever<
          (type extends type2 ? true : false) &
            (type2 extends type ? false : true)
        > extends true
      ? false
      : true

export type Join<
  array extends readonly unknown[],
  separator extends string | number,
> = array extends readonly [infer head, ...infer tail]
  ? tail['length'] extends 0
    ? `${head & string}`
    : `${head & string}${separator}${Join<tail, separator>}`
  : never

export type Merge<object1, object2> = Omit<object1, keyof object2> & object2

export type KeyofUnion<type> = type extends type ? keyof type : never

export type Pretty<type> = { [key in keyof type]: type[key] } & unknown

export type OneOf<
  union extends object,
  ///
  allKeys extends KeyofUnion<union> = KeyofUnion<union>,
> = union extends infer item
  ? Pretty<item & { [key in Exclude<allKeys, keyof item>]?: never }>
  : never

export type Range<
  start extends number,
  stop extends number,
  ///
  result extends number[] = [],
  padding extends 0[] = [],
  current extends number = [...padding, ...result]['length'] & number,
> = current extends stop
  ? current extends start
    ? [current]
    : result extends []
      ? []
      : [...result, current]
  : current extends start
    ? Range<start, stop, [current], padding>
    : result extends []
      ? Range<start, stop, [], [...padding, 0]>
      : Range<start, stop, [...result, current], padding>

export type TrimLeft<t, chars extends string = ' '> = t extends `${chars}${infer tail}`
  ? TrimLeft<tail>
  : t

export type TrimRight<
  t,
  chars extends string = ' ',
> = t extends `${infer head}${chars}` ? TrimRight<head> : t

export type Trim<type, chars extends string = ' '> = TrimLeft<
  TrimRight<type, chars>,
  chars
>

export type _TupleOf<
  length,
  size extends number,
  acc extends readonly unknown[],
> = acc['length'] extends size
  ? acc
  : _TupleOf<length, size, readonly [length, ...acc]>

export type Tuple<type, size extends number> = size extends size
  ? number extends size
    ? type[]
    : _TupleOf<type, size, []>
  : never
