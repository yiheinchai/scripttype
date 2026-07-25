/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/foreign-keys.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyMySqlColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ColumnsWithTable<
	TTableName extends string,
	TColumns extends MySqlColumn[],
> = { [Key in keyof TColumns]: AnyMySqlColumn<{ tableName: TTableName }> };

export type GetColumnsTable<TColumns extends MySqlColumn | MySqlColumn[]> = (
	TColumns extends MySqlColumn ? TColumns
		: TColumns extends MySqlColumn[] ? TColumns[number]
		: never
) extends AnyMySqlColumn<{ tableName: infer TTableName extends string }> ? TTableName
	: never;
