/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/platform-browser/src/IndexedDbQueryBuilder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Cause<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IDBValidKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedDb<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedDbDatabase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedDbQuery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedDbQueryError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IndexedDbTable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutableRef<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NonEmptyReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Queue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Reactivity<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Readonly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Scope<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Stream<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type IndexedDbValidKeys<TableSchema extends IndexedDbTable.AnySchemaStruct> = keyof TableSchema["Encoded"] extends
  infer K ? K extends keyof TableSchema["Encoded"] ? TableSchema["Encoded"][K] extends Readonly<IDBValidKey> ? K
    : never
  : never
  : never

export type KeyPath<TableSchema extends IndexedDbTable.AnySchemaStruct> =
  | IndexedDbValidKeys<TableSchema>
  | NonEmptyReadonlyArray<IndexedDbValidKeys<TableSchema>>

export type IndexedDbValidNumberKeys<
  TableSchema extends IndexedDbTable.AnySchemaStruct
> = keyof TableSchema["Encoded"] extends infer K
  ? K extends keyof TableSchema["Encoded"] ? [TableSchema["Encoded"][K]] extends [number | undefined] ? K
    : never
  : never
  : never

export type KeyPathNumber<TableSchema extends IndexedDbTable.AnySchemaStruct> =
  | IndexedDbValidNumberKeys<TableSchema>
  | NonEmptyReadonlyArray<IndexedDbValidNumberKeys<TableSchema>>

export type SelectType<
    Table extends IndexedDbTable.AnyWithProps
  > = [IndexedDbTable.KeyPath<Table>] extends [undefined] ? IndexedDbTable.TableSchema<Table>["Type"] & {
      readonly key: (typeof IndexedDb.IDBValidKey)["Type"]
    } :
    IndexedDbTable.TableSchema<Table>["Type"]

export type ModifyType<
    Table extends IndexedDbTable.AnyWithProps
  > =
    & (IndexedDbTable.AutoIncrement<Table> extends true ?
        & {
          [
            key in keyof Schema.Struct.MakeIn<
              Omit<
                IndexedDbTable.TableSchema<Table>["fields"],
                IndexedDbTable.KeyPath<Table>
              >
            >
          ]: key extends keyof Schema.Struct.MakeIn<
            IndexedDbTable.TableSchema<Table>["fields"]
          > ? Schema.Struct.MakeIn<
              IndexedDbTable.TableSchema<Table>["fields"]
            >[key]
            : never
        }
        & {
          [key in IndexedDbTable.KeyPath<Table>]?: number | undefined
        }
      : Schema.Struct.MakeIn<IndexedDbTable.TableSchema<Table>["fields"]>)
    & ([IndexedDbTable.KeyPath<Table>] extends [undefined] ? {
        key: IDBValidKey
      }
      : {})

export type EqualsType<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends keyof Table["indexes"],
    KeyPath = [Index] extends [never] ? Table["keyPath"] : Table["indexes"][Index],
    Type = Table["tableSchema"]["Encoded"]
  > = KeyPath extends keyof Type ? Type[KeyPath]
    : { [I in keyof KeyPath]: KeyPath[I] extends keyof Type ? Type[KeyPath[I]] | [] : never }

export type ExtractIndexType<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends keyof Table["indexes"],
    KeyPath = [Index] extends [never] ? Table["keyPath"] : Table["indexes"][Index],
    Type = Table["tableSchema"]["Encoded"]
  > = KeyPath extends keyof Type ? Type[KeyPath]
    : KeyPath extends readonly [infer K, ...infer Rest] ? K extends keyof Type ? [
          Type[K],
          ...{ [P in keyof Rest]?: Rest[P] extends keyof Type ? Type[Rest[P]] | [] : never }
        ] :
      never :
    never

export type ModifyWithKey<Table extends IndexedDbTable.AnyWithProps> = ModifyType<Table>

export type SelectWithout<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends IndexedDbDatabase.IndexFromTable<Table>,
    ExcludedKeys extends string
  > = Omit<Select<Table, Index, ExcludedKeys>, ExcludedKeys>

export type ComparisonKeys = "equals" | "gte" | "lte" | "gt" | "lt" | "between"

export interface First<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends IndexedDbDatabase.IndexFromTable<Table>
  > extends
    Effect.Effect<
      SelectType<Table>,
      IndexedDbQueryError | Cause.NoSuchElementError,
      IndexedDbTable.Context<Table>
    >
  {
    readonly select: Select<Table, Index>

    /**
     * Use the Reactivity service to react to changes to the selected data.
     *
     * **Details**
     *
     * By default, the table name is used as the reactivity key.
     */
    readonly reactive: (
      keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
    ) => Stream.Stream<
      SelectType<Table>,
      IndexedDbQueryError | Cause.NoSuchElementError,
      IndexedDbTable.Context<Table>
    >

    /**
     * Use the Reactivity service to react to changes to the selected data.
     *
     * **Details**
     *
     * By default, the table name is used as the reactivity key.
     */
    readonly reactiveQueue: (
      keys: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>>
    ) => Effect.Effect<
      Queue.Dequeue<SelectType<Table>, IndexedDbQueryError | Cause.NoSuchElementError>,
      never,
      Scope.Scope | IndexedDbTable.Context<Table>
    >
  }

export interface Select<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends IndexedDbDatabase.IndexFromTable<Table>,
    ExcludedKeys extends string = never
  > extends
    Effect.Effect<
      Array<SelectType<Table>>,
      IndexedDbQueryError,
      IndexedDbTable.Context<Table>
    >
  {
    readonly from: From<Table>
    readonly index?: Index
    readonly limitValue?: number
    readonly offsetValue?: number
    readonly reverseValue?: boolean
    readonly only?: ExtractIndexType<Table, Index>
    readonly lowerBound?: ExtractIndexType<Table, Index>
    readonly upperBound?: ExtractIndexType<Table, Index>
    readonly excludeLowerBound?: boolean
    readonly excludeUpperBound?: boolean
    readonly predicate?: (item: IndexedDbTable.Encoded<Table>) => boolean

    readonly equals: (
      value: EqualsType<Table, Index>
    ) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

    readonly gte: (
      value: ExtractIndexType<Table, Index>
    ) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

    readonly lte: (
      value: ExtractIndexType<Table, Index>
    ) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

    readonly gt: (
      value: ExtractIndexType<Table, Index>
    ) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

    readonly lt: (
      value: ExtractIndexType<Table, Index>
    ) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

    readonly between: (
      lowerBound: ExtractIndexType<Table, Index>,
      upperBound: ExtractIndexType<Table, Index>,
      options?: { excludeLowerBound?: boolean; excludeUpperBound?: boolean }
    ) => SelectWithout<Table, Index, ExcludedKeys | ComparisonKeys>

    readonly limit: (
      limit: number
    ) => SelectWithout<Table, Index, ExcludedKeys | "limit" | "first">

    readonly offset: (
      offset: number
    ) => SelectWithout<Table, Index, ExcludedKeys | "offset" | "first">

    readonly reverse: () => SelectWithout<Table, Index, ExcludedKeys | "reverse" | "first">

    readonly filter: (
      f: (value: IndexedDbTable.Encoded<Table>) => boolean
    ) => SelectWithout<Table, Index, ExcludedKeys | "first">

    readonly first: () => First<Table, Index>

    /**
     * Stream the selected data.
     *
     * **Details**
     *
     * The default chunk size is 100.
     */
    readonly stream: (options?: {
      readonly chunkSize?: number | undefined
    }) => Stream.Stream<
      SelectType<Table>,
      IndexedDbQueryError,
      IndexedDbTable.Context<Table>
    >

    /**
     * Use the Reactivity service to react to changes to the selected data.
     *
     * **Details**
     *
     * By default, the table name is used as the reactivity key.
     */
    readonly reactive: (
      keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
    ) => Stream.Stream<
      Array<SelectType<Table>>,
      IndexedDbQueryError,
      IndexedDbTable.Context<Table>
    >
    readonly reactiveQueue: (
      keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
    ) => Effect.Effect<
      Queue.Dequeue<Array<SelectType<Table>>, IndexedDbQueryError>,
      never,
      Scope.Scope | IndexedDbTable.Context<Table>
    >
  }

export interface Count<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends IndexedDbDatabase.IndexFromTable<Table>
  > extends Effect.Effect<number, IndexedDbQueryError> {
    readonly from: From<Table>
    readonly index?: Index
    readonly only?: ExtractIndexType<Table, Index>
    readonly lowerBound?: ExtractIndexType<Table, Index>
    readonly upperBound?: ExtractIndexType<Table, Index>
    readonly excludeLowerBound?: boolean
    readonly excludeUpperBound?: boolean

    readonly equals: (
      value: EqualsType<Table, Index>
    ) => Omit<Count<Table, Index>, ComparisonKeys>

    readonly gte: (
      value: ExtractIndexType<Table, Index>
    ) => Omit<Count<Table, Index>, ComparisonKeys>

    readonly lte: (
      value: ExtractIndexType<Table, Index>
    ) => Omit<Count<Table, Index>, ComparisonKeys>

    readonly gt: (
      value: ExtractIndexType<Table, Index>
    ) => Omit<Count<Table, Index>, ComparisonKeys>

    readonly lt: (
      value: ExtractIndexType<Table, Index>
    ) => Omit<Count<Table, Index>, ComparisonKeys>

    readonly between: (
      lowerBound: ExtractIndexType<Table, Index>,
      upperBound: ExtractIndexType<Table, Index>,
      options?: { excludeLowerBound?: boolean; excludeUpperBound?: boolean }
    ) => Omit<Count<Table, Index>, ComparisonKeys>
  }

export interface Modify<
    Table extends IndexedDbTable.AnyWithProps
  > extends
    Effect.Effect<
      globalThis.IDBValidKey,
      IndexedDbQueryError,
      IndexedDbTable.Context<Table>
    >
  {
    readonly operation: "add" | "put"
    readonly from: From<Table>
    readonly value: ModifyWithKey<Table>

    /**
     * Invalidate any queries using Reactivity service with the provided keys.
     *
     * **Details**
     *
     * If no keys are provided, the table name is used as the reactivity key.
     */
    readonly invalidate: (
      keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
    ) => Effect.Effect<globalThis.IDBValidKey, IndexedDbQueryError, IndexedDbTable.Context<Table>>
  }

export interface ModifyAll<
    Table extends IndexedDbTable.AnyWithProps
  > extends
    Effect.Effect<
      Array<globalThis.IDBValidKey>,
      IndexedDbQueryError,
      IndexedDbTable.Context<Table>
    >
  {
    readonly operation: "add" | "put"
    readonly from: From<Table>
    readonly values: Array<ModifyWithKey<Table>>

    /**
     * Invalidate any queries using Reactivity service with the provided keys.
     *
     * **Details**
     *
     * If no keys are provided, the table name is used as the reactivity key.
     */
    readonly invalidate: (
      keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
    ) => Effect.Effect<globalThis.IDBValidKey, IndexedDbQueryError, IndexedDbTable.Context<Table>>
  }

export interface From<Table extends IndexedDbTable.AnyWithProps> {
    readonly table: Table
    readonly database: MutableRef.MutableRef<globalThis.IDBDatabase>
    readonly IDBKeyRange: typeof globalThis.IDBKeyRange
    readonly reactivity: Reactivity.Reactivity["Service"]

    readonly clear: Effect.Effect<void, IndexedDbQueryError>

    readonly select: {
      <Index extends IndexedDbDatabase.IndexFromTable<Table>>(
        index: Index
      ): Select<Table, Index>
      (): Select<Table, never>
    }

    /** @internal */
    readonly selectCache: Map<
      string | undefined,
      IndexedDbQuery.Select<any, never>
    >

    readonly count: {
      <Index extends IndexedDbDatabase.IndexFromTable<Table>>(
        index: Index
      ): Count<Table, Index>
      (): Count<Table, never>
    }

    /** @internal */
    readonly countCache: Map<
      string | undefined,
      IndexedDbQuery.Count<any, never>
    >

    readonly delete: {
      <Index extends IndexedDbDatabase.IndexFromTable<Table>>(
        index: Index
      ): DeletePartial<Table, Index>
      (): DeletePartial<Table, never>
    }

    /** @internal */
    readonly deleteCache: Map<
      string | undefined,
      IndexedDbQuery.DeletePartial<any, never>
    >

    readonly insert: (value: ModifyWithKey<Table>) => Modify<Table>
    readonly insertAll: (
      values: Array<ModifyWithKey<Table>>
    ) => ModifyAll<Table>
    readonly upsert: (value: ModifyWithKey<Table>) => Modify<Table>
    readonly upsertAll: (
      values: Array<ModifyWithKey<Table>>
    ) => ModifyAll<Table>
  }

export interface DeletePartial<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends IndexedDbDatabase.IndexFromTable<Table>
  > {
    readonly from: From<Table>
    readonly index?: Index

    readonly equals: (
      value: EqualsType<Table, Index>
    ) => Delete<Table, Index>

    readonly gte: (
      value: ExtractIndexType<Table, Index>
    ) => Delete<Table, Index>

    readonly lte: (
      value: ExtractIndexType<Table, Index>
    ) => Delete<Table, Index>

    readonly gt: (
      value: ExtractIndexType<Table, Index>
    ) => Delete<Table, Index>

    readonly lt: (
      value: ExtractIndexType<Table, Index>
    ) => Delete<Table, Index>

    readonly between: (
      lowerBound: ExtractIndexType<Table, Index>,
      upperBound: ExtractIndexType<Table, Index>,
      options?: { excludeLowerBound?: boolean; excludeUpperBound?: boolean }
    ) => Delete<Table, Index>

    readonly limit: (
      limit: number
    ) => DeleteWithout<Table, Index, "limit">
  }

export interface Delete<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends IndexedDbDatabase.IndexFromTable<Table>,
    ExcludedKeys extends string = never
  > extends Effect.Effect<void, IndexedDbQueryError> {
    readonly delete: DeletePartial<Table, Index>
    readonly index?: Index
    readonly limitValue?: number
    readonly only?: ExtractIndexType<Table, Index>
    readonly lowerBound?: ExtractIndexType<Table, Index>
    readonly upperBound?: ExtractIndexType<Table, Index>
    readonly excludeLowerBound?: boolean
    readonly excludeUpperBound?: boolean
    readonly predicate?: (item: IndexedDbTable.Encoded<Table>) => boolean

    readonly limit: (
      limit: number
    ) => DeleteWithout<Table, Index, ExcludedKeys | "limit">

    readonly filter: (
      f: (value: IndexedDbTable.Encoded<Table>) => boolean
    ) => DeleteWithout<Table, Index, ExcludedKeys>

    /**
     * Invalidate any queries using Reactivity service with the provided keys.
     *
     * **Details**
     *
     * If no keys are provided, the table name is used as the reactivity key.
     */
    readonly invalidate: (
      keys?: ReadonlyArray<unknown> | Record.ReadonlyRecord<string, ReadonlyArray<unknown>> | undefined
    ) => Effect.Effect<void, IndexedDbQueryError, IndexedDbTable.Context<Table>>
  }

export type DeleteWithout<
    Table extends IndexedDbTable.AnyWithProps,
    Index extends IndexedDbDatabase.IndexFromTable<Table>,
    ExcludedKeys extends string
  > = Omit<Delete<Table, Index, ExcludedKeys>, ExcludedKeys>
