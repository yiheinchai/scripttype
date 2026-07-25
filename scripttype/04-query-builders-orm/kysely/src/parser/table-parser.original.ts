/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/table-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedDynamicTableBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AliasedExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AliasedExpressionOrFactory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DrainOuterGeneric<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AnyTable<DB> = keyof DB & string

export type AnyAliasedTable<DB> = `${AnyTable<DB>} as ${string}`

export type TableExpression<DB, TB extends keyof DB> =
  | AnyAliasedTable<DB>
  | AnyTable<DB>
  | AliasedExpressionOrFactory<DB, TB>
  | AliasedDynamicTableBuilder<any, any>

export type TableExpressionOrList<DB, TB extends keyof DB> =
  TableExpression<DB, TB> | ReadonlyArray<TableExpression<DB, TB>>

export type SimpleTableReference<DB> = AnyAliasedTable<DB> | AnyTable<DB>

export type ExtractAliasFromTableExpression<DB, TE> = TE extends string
  ? TE extends `${string} as ${infer TA}`
    ? TA
    : TE extends keyof DB
      ? TE
      : never
  : TE extends AliasedExpression<any, infer QA>
    ? QA
    : TE extends (qb: any) => AliasedExpression<any, infer QA>
      ? QA
      : TE extends AliasedDynamicTableBuilder<any, infer DA>
        ? DA
        : never

export type ExtractRowTypeFromTableExpression<
  DB,
  TE,
  A extends keyof any,
> = TE extends `${infer T} as ${infer TA}`
  ? TA extends A
    ? T extends keyof DB
      ? DB[T]
      : never
    : never
  : TE extends A
    ? TE extends keyof DB
      ? DB[TE]
      : never
    : TE extends AliasedExpression<infer O, infer QA>
      ? QA extends A
        ? O
        : never
      : TE extends (qb: any) => AliasedExpression<infer O, infer QA>
        ? QA extends A
          ? O
          : never
        : TE extends AliasedDynamicTableBuilder<infer T, infer DA>
          ? DA extends A
            ? T extends keyof DB
              ? DB[T]
              : never
            : never
          : never

export type From<DB, TE> = DrainOuterGeneric<{
  [
    C in keyof DB | ExtractAliasFromTableExpression<DB, TE>
  ]: C extends ExtractAliasFromTableExpression<DB, TE>
    ? ExtractRowTypeFromTableExpression<DB, TE, C>
    : C extends keyof DB
      ? DB[C]
      : never
}>

export type FromTables<DB, TB extends keyof DB, TE> = DrainOuterGeneric<
  TB | ExtractAliasFromTableExpression<DB, TE>
>

export type ExtractTableAlias<DB, TE> = TE extends `${string} as ${infer TA}`
  ? TA extends keyof DB
    ? TA
    : never
  : TE extends keyof DB
    ? TE
    : never
