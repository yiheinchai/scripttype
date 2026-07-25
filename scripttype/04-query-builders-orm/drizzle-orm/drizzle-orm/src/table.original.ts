/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/table.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Column<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetColumnData<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type OptionalKeyOnly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Required<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequiredKeyOnly<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Update<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface TableConfig<TColumn extends Column = Column<any>> {
	name: string;
	schema: string | undefined;
	columns: Record<string, TColumn>;
	dialect: string;
}

export type UpdateTableConfig<T extends TableConfig, TUpdate extends Partial<TableConfig>> = Required<
	Update<T, TUpdate>
>;

export interface Table<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	T extends TableConfig = TableConfig,
> extends SQLWrapper {
	// SQLWrapper runtime implementation is defined in 'sql/sql.ts'
}

export type AnyTable<TPartial extends Partial<TableConfig>> = Table<UpdateTableConfig<TableConfig, TPartial>>;

export type MapColumnName<TName extends string, TColumn extends Column, TDBColumNames extends boolean> =
	TDBColumNames extends true ? TColumn['_']['name']
		: TName;

export type InferModelFromColumns<
	TColumns extends Record<string, Column>,
	TInferMode extends 'select' | 'insert' = 'select',
	TConfig extends { dbColumnNames: boolean; override?: boolean } = { dbColumnNames: false; override: false },
> = Simplify<
	TInferMode extends 'insert' ?
			& {
				[
					Key in keyof TColumns & string as RequiredKeyOnly<
						MapColumnName<Key, TColumns[Key], TConfig['dbColumnNames']>,
						TColumns[Key]
					>
				]: GetColumnData<TColumns[Key], 'query'>;
			}
			& {
				[
					Key in keyof TColumns & string as OptionalKeyOnly<
						MapColumnName<Key, TColumns[Key], TConfig['dbColumnNames']>,
						TColumns[Key],
						TConfig['override']
					>
				]?: GetColumnData<TColumns[Key], 'query'> | undefined;
			}
		: {
			[
				Key in keyof TColumns & string as MapColumnName<
					Key,
					TColumns[Key],
					TConfig['dbColumnNames']
				>
			]: GetColumnData<TColumns[Key], 'query'>;
		}
>;

export type InferModel<
	TTable extends Table,
	TInferMode extends 'select' | 'insert' = 'select',
	TConfig extends { dbColumnNames: boolean } = { dbColumnNames: false },
> = InferModelFromColumns<TTable['_']['columns'], TInferMode, TConfig>;

export type InferSelectModel<
	TTable extends Table,
	TConfig extends { dbColumnNames: boolean } = { dbColumnNames: false },
> = InferModelFromColumns<TTable['_']['columns'], 'select', TConfig>;

export type InferInsertModel<
	TTable extends Table,
	TConfig extends { dbColumnNames: boolean; override?: boolean } = { dbColumnNames: false; override: false },
> = InferModelFromColumns<TTable['_']['columns'], 'insert', TConfig>;

export type InferEnum<T> = T extends { enumValues: readonly (infer U)[] } ? U
	: never;
