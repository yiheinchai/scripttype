/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/query-builder/output-interface.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AliasedExpressionOrFactory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyAliasedColumnWithTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyColumnWithTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExpressionBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OutputPrefix = 'deleted' | 'inserted'

export type OutputDatabase<
  DB,
  TB extends keyof DB,
  OP extends OutputPrefix = OutputPrefix,
> = {
  [K in OP]: DB[TB]
}

export type OutputExpression<
  DB,
  TB extends keyof DB,
  OP extends OutputPrefix = OutputPrefix,
  ODB = OutputDatabase<DB, TB, OP>,
  OTB extends keyof ODB = keyof ODB,
> =
  | AnyAliasedColumnWithTable<ODB, OTB>
  | AnyColumnWithTable<ODB, OTB>
  | AliasedExpressionOrFactory<ODB, OTB>

export type OutputCallback<
  DB,
  TB extends keyof DB,
  OP extends OutputPrefix = OutputPrefix,
> = (
  eb: ExpressionBuilder<OutputDatabase<DB, TB, OP>, OP>,
) => ReadonlyArray<OutputExpression<DB, TB, OP>>

export type SelectExpressionFromOutputExpression<OE> =
  OE extends `${OutputPrefix}.${infer C}` ? C : OE

export type SelectExpressionFromOutputCallback<CB> = CB extends (
  eb: ExpressionBuilder<any, any>,
) => ReadonlyArray<infer OE>
  ? SelectExpressionFromOutputExpression<OE>
  : never
