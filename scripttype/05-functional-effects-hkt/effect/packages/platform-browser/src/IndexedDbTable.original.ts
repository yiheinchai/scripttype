/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/platform-browser/src/IndexedDbTable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Any {
  readonly [TypeId]: typeof TypeId
  readonly keyPath: any
  readonly tableName: string
  readonly tableSchema: Schema.Top
  readonly readSchema: Schema.Top
  readonly autoincrementSchema: Schema.Top
  readonly arraySchema: Schema.Top
  readonly autoIncrement: boolean
  readonly indexes: any
}

export type TableName<Table extends Any> = Table["tableName"]

export type KeyPath<Table extends Any> = Table["keyPath"]

export type AutoIncrement<Table extends Any> = Table["autoIncrement"]

export type TableSchema<Table extends Any> = Table["tableSchema"]

export type Context<Table extends Any> =
  | Table["tableSchema"]["DecodingServices"]
  | Table["tableSchema"]["EncodingServices"]

export type Encoded<Table extends Any> = Table["tableSchema"]["Encoded"]

export type Indexes<Table extends Any> = Table["indexes"]

export type WithName<Table extends Any, TableName extends string> = Extract<
  Table,
  { readonly tableName: TableName }
>

export type AnySchemaStruct = Schema.Top & {
  readonly fields: Schema.Struct.Fields
}

export type IsValidAutoIncrementKeyPath<
  TableSchema extends AnySchemaStruct,
  KeyPath
> = KeyPath extends keyof TableSchema["Encoded"] ? TableSchema["Encoded"][KeyPath] extends number ? true
  : false
  : false
