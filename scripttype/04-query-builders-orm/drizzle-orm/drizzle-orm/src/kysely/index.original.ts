/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/kysely/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ColumnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferInsertModel<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferSelectModel<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MapColumnName<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Table<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Kyselify<T extends Table> = Simplify<
	{
		[Key in keyof T['_']['columns'] & string as MapColumnName<Key, T['_']['columns'][Key], true>]: ColumnType<
			// select
			InferSelectModel<T, { dbColumnNames: true }>[MapColumnName<Key, T['_']['columns'][Key], true>],
			// insert
			MapColumnName<Key, T['_']['columns'][Key], true> extends keyof InferInsertModel<
				T,
				{ dbColumnNames: true }
			> ? InferInsertModel<T, { dbColumnNames: true }>[MapColumnName<Key, T['_']['columns'][Key], true>]
				: never,
			// update
			MapColumnName<Key, T['_']['columns'][Key], true> extends keyof InferInsertModel<
				T,
				{ dbColumnNames: true }
			> ? InferInsertModel<T, { dbColumnNames: true }>[MapColumnName<Key, T['_']['columns'][Key], true>]
				: never
		>;
	}
>;
