/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/table.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TableConfigBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateTableConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TableConfig = TableConfigBase<PgColumn>;

export type AnyPgTable<TPartial extends Partial<TableConfig> = {}> = PgTable<UpdateTableConfig<TableConfig, TPartial>>;

export type PgTableWithColumns<T extends TableConfig> =
	& PgTable<T>
	& {
		[Key in keyof T['columns']]: T['columns'][Key];
	}
	& {
		enableRLS: () => Omit<
			PgTableWithColumns<T>,
			'enableRLS'
		>;
	};
