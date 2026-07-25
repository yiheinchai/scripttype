/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/parser/binary-operation-parser.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExtractTypeFromReferenceExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractTypeFromStringReference<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type KyselyTypeError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SelectType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StringReference<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueExpression<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValueExpressionOrList<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type OperandValueExpression<
  DB,
  TB extends keyof DB,
  RE,
> = ValueExpression<DB, TB, ExtractTypeFromReferenceExpression<DB, TB, RE>>

export type OperandValueExpressionOrList<
  DB,
  TB extends keyof DB,
  RE,
> = ValueExpressionOrList<
  DB,
  TB,
  ExtractTypeFromReferenceExpression<DB, TB, RE> | null
>

export type FilterObject<DB, TB extends keyof DB> =
  IsNever<TB> extends true
    ? KyselyTypeError<'there are no tables in query context, so a filter object cannot be defined. try passing an array instead.'>
    : {
        [R in StringReference<DB, TB>]?: ValueExpressionOrList<
          DB,
          TB,
          SelectType<ExtractTypeFromStringReference<DB, TB, R>>
        >
      }
