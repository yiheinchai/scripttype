/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/sql/Statement.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Custom<
  T extends string = string,
  A = void,
  B = void,
  C = void
> {
  readonly _tag: "Custom"
  readonly kind: T
  readonly paramA: A
  readonly paramB: B
  readonly paramC: C
}

export type Dialect = "sqlite" | "pg" | "mysql" | "mssql" | "clickhouse"

export type CompilerOptions<C extends Custom<any, any, any, any> = any> = {
  readonly dialect: Dialect
  readonly placeholder: (index: number, value: unknown) => string
  readonly onIdentifier: (value: string, withoutTransform: boolean) => string
  readonly onRecordUpdate: (
    placeholders: string,
    alias: string,
    columns: string,
    values: ReadonlyArray<ReadonlyArray<unknown>>,
    returning: readonly [sql: string, params: ReadonlyArray<unknown>] | undefined
  ) => readonly [sql: string, params: ReadonlyArray<unknown>]
  readonly onCustom: (
    type: C,
    placeholder: (u: unknown) => string,
    withoutTransform: boolean
  ) => readonly [sql: string, params: ReadonlyArray<unknown>]
  readonly onInsert?: (
    columns: ReadonlyArray<string>,
    placeholders: string,
    values: ReadonlyArray<ReadonlyArray<unknown>>,
    returning: readonly [sql: string, params: ReadonlyArray<unknown>] | undefined
  ) => readonly [sql: string, binds: ReadonlyArray<unknown>]
  readonly onRecordUpdateSingle?: (
    columns: ReadonlyArray<string>,
    values: ReadonlyArray<unknown>,
    returning: readonly [sql: string, params: ReadonlyArray<unknown>] | undefined
  ) => readonly [sql: string, params: ReadonlyArray<unknown>]
}
