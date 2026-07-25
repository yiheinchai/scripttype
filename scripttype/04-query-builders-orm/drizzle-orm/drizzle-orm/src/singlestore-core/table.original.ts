/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/table.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TableConfigBase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UpdateTableConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TableConfig = TableConfigBase<SingleStoreColumn>;

export type AnySingleStoreTable<TPartial extends Partial<TableConfig> = {}> = SingleStoreTable<
	UpdateTableConfig<TableConfig, TPartial>
>;

export type SingleStoreTableWithColumns<T extends TableConfig> =
	& SingleStoreTable<T>
	& {
		[Key in keyof T['columns']]: T['columns'][Key];
	};
