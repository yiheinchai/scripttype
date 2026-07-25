/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/kysely/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ColumnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferInsertModel<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InferSelectModel<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MapColumnName<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Table<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
