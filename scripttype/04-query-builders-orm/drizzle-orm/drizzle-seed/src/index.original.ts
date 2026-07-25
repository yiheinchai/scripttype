/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-seed/src/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbstractGenerator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseSQLiteDatabase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlDatabase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgDatabase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Relations<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteTable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type generatorsFuncs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type generatorsFuncsV2<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type InferCallbackType<
	DB extends
		| PgDatabase<any, any>
		| MySqlDatabase<any, any>
		| BaseSQLiteDatabase<any, any>,
	SCHEMA extends {
		[key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | Relations;
	},
> = DB extends PgDatabase<any, any> ? SCHEMA extends {
		[key: string]:
			| PgTable
			| PgSchema
			| MySqlTable
			| MySqlSchema
			| SQLiteTable
			| Relations;
	} ? {
			// iterates through schema fields. example -> schema: {"tableName": PgTable}
			[
				table in keyof SCHEMA as SCHEMA[table] extends PgTable ? table
					: never
			]?: {
				count?: number;
				columns?: {
					// iterates through table fields. example -> table: {"columnName": PgColumn}
					[
						column in keyof SCHEMA[table] as SCHEMA[table][column] extends PgColumn ? column
							: never
					]?: AbstractGenerator<any>;
				};
				with?: {
					[
						refTable in keyof SCHEMA as SCHEMA[refTable] extends PgTable ? refTable
							: never
					]?:
						| number
						| { weight: number; count: number | number[] }[];
				};
			};
		}
	: {}
	: DB extends MySqlDatabase<any, any> ? SCHEMA extends {
			[key: string]:
				| PgTable
				| PgSchema
				| MySqlTable
				| MySqlSchema
				| SQLiteTable
				| Relations;
		} ? {
				// iterates through schema fields. example -> schema: {"tableName": MySqlTable}
				[
					table in keyof SCHEMA as SCHEMA[table] extends MySqlTable ? table
						: never
				]?: {
					count?: number;
					columns?: {
						// iterates through table fields. example -> table: {"columnName": MySqlColumn}
						[
							column in keyof SCHEMA[table] as SCHEMA[table][column] extends MySqlColumn ? column
								: never
						]?: AbstractGenerator<any>;
					};
					with?: {
						[
							refTable in keyof SCHEMA as SCHEMA[refTable] extends MySqlTable ? refTable
								: never
						]?:
							| number
							| { weight: number; count: number | number[] }[];
					};
				};
			}
		: {}
	: DB extends BaseSQLiteDatabase<any, any> ? SCHEMA extends {
			[key: string]:
				| PgTable
				| PgSchema
				| MySqlTable
				| MySqlSchema
				| SQLiteTable
				| Relations;
		} ? {
				// iterates through schema fields. example -> schema: {"tableName": SQLiteTable}
				[
					table in keyof SCHEMA as SCHEMA[table] extends SQLiteTable ? table
						: never
				]?: {
					count?: number;
					columns?: {
						// iterates through table fields. example -> table: {"columnName": SQLiteColumn}
						[
							column in keyof SCHEMA[table] as SCHEMA[table][column] extends SQLiteColumn ? column
								: never
						]?: AbstractGenerator<any>;
					};
					with?: {
						[
							refTable in keyof SCHEMA as SCHEMA[refTable] extends SQLiteTable ? refTable
								: never
						]?:
							| number
							| { weight: number; count: number | number[] }[];
					};
				};
			}
		: {}
	: {};

export type FunctionsVersioning<VERSION extends string | undefined> = VERSION extends `1` ? typeof generatorsFuncs
	: VERSION extends `2` ? typeof generatorsFuncsV2
	: typeof generatorsFuncsV2;
