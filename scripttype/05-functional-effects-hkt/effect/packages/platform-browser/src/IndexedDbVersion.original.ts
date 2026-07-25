/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/platform-browser/src/IndexedDbVersion.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IndexedDbTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Any {
  readonly [TypeId]: typeof TypeId
}

export interface IndexedDbVersion<
  out Tables extends IndexedDbTable.AnyWithProps
> extends Pipeable {
  new(_: never): {}
  readonly [TypeId]: typeof TypeId
  readonly tables: ReadonlyMap<string, Tables>
}

export type Tables<Db extends Any> = Db extends IndexedDbVersion<infer _Tables> ? _Tables : never

export type TableWithName<
  Db extends Any,
  TableName extends string
> = IndexedDbTable.WithName<Tables<Db>, TableName>

export type SchemaWithName<
  Db extends Any,
  TableName extends string
> = IndexedDbTable.TableSchema<IndexedDbTable.WithName<Tables<Db>, TableName>>
