/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/util/type-utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DeleteResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InsertResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KyselyTypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MergeResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uint8Array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AnyColumn<DB, TB extends keyof DB> = {
  [T in TB]: keyof DB[T]
}[TB] &
  string

export type ExtractColumnType<DB, TB extends keyof DB, C> = {
  [T in TB]: C extends keyof DB[T] ? DB[T][C] : never
}[TB]

export type AnyColumnWithTable<DB, TB extends keyof DB> = {
  [T in TB]: `${T & string}.${keyof DB[T] & string}`
}[TB]

export type AnyAliasedColumn<DB, TB extends keyof DB> = `${AnyColumn<
  DB,
  TB
>} as ${string}`

export type AnyAliasedColumnWithTable<
  DB,
  TB extends keyof DB,
> = `${AnyColumnWithTable<DB, TB>} as ${string}`

export type ArrayItemType<T> = T extends ReadonlyArray<infer I> ? I : never

export type DrainOuterGeneric<T> = [T] extends [unknown] ? T : never

export type Simplify<T> = DrainOuterGeneric<{ [K in keyof T]: T[K] } & {}>

export type SimplifySingleResult<O> = O extends
  InsertResult | UpdateResult | DeleteResult | MergeResult
  ? O
  : Simplify<O> | undefined

export type SimplifyResult<O> = O extends
  InsertResult | UpdateResult | DeleteResult | MergeResult
  ? O
  : Simplify<O>

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export type IsNever<T> = [T] extends [never] ? true : false

export type IsNullable<T> = [T] extends [NonNullable<T>] ? false : true

export type IsAny<T> = 0 extends T & 1 ? true : false

export type Equals<T, U> =
  (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
    ? true
    : false

export type NotNull = { readonly __notNull__: unique symbol }

export type SimplifyDeep<T> = T extends object
  ? T extends Date | RegExp | Map<any, any> | Set<any>
    ? T
    : DrainOuterGeneric<{ [K in keyof T]: SimplifyDeep<T[K]> } & {}>
  : T

export type NarrowPartial<O, T> = T extends object
  ? DrainOuterGeneric<{
      [K in keyof O & string]: K extends keyof T
        ? T[K] extends NotNull
          ? Exclude<O[K], null>
          : T[K] extends O[K]
            ? T[K]
            : T[K] extends object
              ? SimplifyDeep<O[K] & NarrowPartial<O[K], T[K]>>
              : KyselyTypeError<`$narrowType() call failed: passed type does not exist in '${K}'s type union`>
        : O[K]
    }>
  : never

export type ShallowRecord<K extends keyof any, T> = DrainOuterGeneric<{
  [P in K]: T
}>

export type StringsWhenDataTypeNotAvailable =
  | Date
  // Many Node.js drivers return `Buffer` by default for some column data types.
  // Buffer is a subclass of `Uint8Array`. `Buffer` doesn't exist in non-Node TypeScript
  // environments - and results in `any` or a compilation error if used.
  | Uint8Array

export type NumericString = `${number}`

export type NumbersWhenDataTypeNotAvailable = bigint | NumericString

export type ShallowDehydrateValue<T> = T extends null | undefined
  ? T
  : '__kysely_dehydrate__' extends keyof T & {}
    ? T
    : T & {} extends (infer U)[]
      ? Array<ShallowDehydrateValue<U>> | Extract<T, null | undefined>
      : | Exclude<
            T,
            StringsWhenDataTypeNotAvailable | NumbersWhenDataTypeNotAvailable
          >
        | (IsNever<Extract<T, NumbersWhenDataTypeNotAvailable>> extends true
            ? never
            : number)
        | (IsNever<Extract<T, StringsWhenDataTypeNotAvailable>> extends true
            ? never
            : string)

export type ShallowDehydrateObject<O> = {
  [K in keyof O]: ShallowDehydrateValue<O[K]>
}

export type AllProps<T> = T & { [P in keyof T]-?: unknown }
