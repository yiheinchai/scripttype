/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/utils/body.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type File<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type BodyDataValueDotAll = {
  [x: string]: string | File | (string | File)[] | BodyDataValueDotAll
}

export type BodyDataValueDot = { [x: string]: string | File | BodyDataValueDot }

export type SimplifyBodyData<T> = {
  [K in keyof T]: string | File | (string | File)[] | BodyDataValueDotAll extends T[K]
    ? string | File | (string | File)[] | BodyDataValueDotAll
    : string | File | BodyDataValueDot extends T[K]
      ? string | File | BodyDataValueDot
      : string | File | (string | File)[] extends T[K]
        ? string | File | (string | File)[]
        : string | File
} & {}

export type BodyDataValueComponent<T> =
  | string
  | File
  | (T extends { all: false }
      ? never // explicitly set to false
      : T extends { all: true } | { all: boolean }
        ? (string | File)[] // use all option
        : never)

export type BodyDataValueObject<T> = { [key: string]: BodyDataValueComponent<T> | BodyDataValueObject<T> }

export type BodyDataValue<T> =
  | BodyDataValueComponent<T>
  | (T extends { dot: false }
      ? never // explicitly set to false
      : T extends { dot: true } | { dot: boolean }
        ? BodyDataValueObject<T> // use dot option
        : never)

export type ParseBodyOptions = {
  /**
   * Determines whether all fields with multiple values should be parsed as arrays.
   * @default false
   * @example
   * const data = new FormData()
   * data.append('file', 'aaa')
   * data.append('file', 'bbb')
   * data.append('message', 'hello')
   *
   * If all is false:
   * parseBody should return { file: 'bbb', message: 'hello' }
   *
   * If all is true:
   * parseBody should return { file: ['aaa', 'bbb'], message: 'hello' }
   */
  all: boolean
  /**
   * Determines whether all fields with dot notation should be parsed as nested objects.
   * @default false
   * @example
   * const data = new FormData()
   * data.append('obj.key1', 'value1')
   * data.append('obj.key2', 'value2')
   *
   * If dot is false:
   * parseBody should return { 'obj.key1': 'value1', 'obj.key2': 'value2' }
   *
   * If dot is true:
   * parseBody should return { obj: { key1: 'value1', key2: 'value2' } }
   */
  dot: boolean
}

export type BodyData<T extends Partial<ParseBodyOptions> = {}> = SimplifyBodyData<
  Record<string, BodyDataValue<T>>
>
