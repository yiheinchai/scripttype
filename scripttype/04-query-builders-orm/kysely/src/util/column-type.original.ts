/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/util/column-type.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DrainOuterGeneric<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ColumnType<
  SelectType,
  InsertType = SelectType,
  UpdateType = SelectType,
> = {
  readonly __select__: SelectType
  readonly __insert__: InsertType
  readonly __update__: UpdateType
}

export type Generated<S> = ColumnType<S, S | undefined, S>

export type GeneratedAlways<S> = ColumnType<S, never, never>

export type JSONColumnType<
  SelectType extends object | null,
  InsertType = string,
  UpdateType = string,
> = ColumnType<SelectType, InsertType, UpdateType>

export type IfNullable<T, K> = IsNullable<T> extends true ? K : never

export type IfNotNever<T, K> = IsNever<T> extends true ? never : K

export type IfNotNullable<T, K> = IsNullable<T> extends true ? never : IfNotNever<T, K>

export type SelectType<T> = T extends ColumnType<infer S, any, any> ? S : T

export type InsertType<T> = T extends ColumnType<any, infer I, any> ? I : T

export type UpdateType<T> = T extends ColumnType<any, any, infer U> ? U : T

export type NullableInsertKeys<R> = {
  [K in keyof R]: IfNullable<InsertType<R[K]>, K>
}[keyof R]

export type NonNullableInsertKeys<R> = {
  [K in keyof R]: IfNotNullable<InsertType<R[K]>, K>
}[keyof R]

export type NonNeverSelectKeys<R> = {
  [K in keyof R]: IfNotNever<SelectType<R[K]>, K>
}[keyof R]

export type UpdateKeys<R> = {
  [K in keyof R]: IfNotNever<UpdateType<R[K]>, K>
}[keyof R]

export type Selectable<R> = DrainOuterGeneric<{
  [K in NonNeverSelectKeys<R>]: SelectType<R[K]>
}>

export type Insertable<R> = DrainOuterGeneric<
  object & {
    [K in NonNullableInsertKeys<R>]: InsertType<R[K]>
  } & {
    [K in NullableInsertKeys<R>]?: InsertType<R[K]>
  }
>

export type Updateable<R> = DrainOuterGeneric<{
  [K in UpdateKeys<R>]?: UpdateType<R[K]> | undefined
}>

export type NonDehydrateable<T> = [T] extends [
  ColumnType<infer S, infer I, infer U>,
]
  ? ColumnType<S & { __kysely_dehydrate__?: false }, I, U>
  : T & { __kysely_dehydrate__?: false }
