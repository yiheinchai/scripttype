/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/column-builder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Assume<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtraConfigColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelExtraConfigColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgSequenceOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQLiteColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SingleStoreColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GeneratedType = 'always' | 'byDefault';

export type GeneratedStorageMode = 'virtual' | 'stored';

export type GeneratedColumnConfig<TDataType> = {
	as: TDataType | SQL | (() => SQL);
	type?: GeneratedType;
	mode?: GeneratedStorageMode;
};

export type ColumnDataType =
	| 'string'
	| 'number'
	| 'boolean'
	| 'array'
	| 'json'
	| 'date'
	| 'bigint'
	| 'custom'
	| 'buffer'
	| 'dateDuration'
	| 'duration'
	| 'relDuration'
	| 'localTime'
	| 'localDate'
	| 'localDateTime';

export interface ColumnBuilderBaseConfig<TDataType extends ColumnDataType, TColumnType extends string> {
	name: string;
	dataType: TDataType;
	columnType: TColumnType;
	data: unknown;
	driverParam: unknown;
	enumValues: string[] | undefined;
}

export type ColumnBuilderTypeConfig<
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	T extends ColumnBuilderBaseConfig<ColumnDataType, string>,
	TTypeConfig extends object = object,
> = Simplify<
	& {
		brand: 'ColumnBuilder';
		name: T['name'];
		dataType: T['dataType'];
		columnType: T['columnType'];
		data: T['data'];
		driverParam: T['driverParam'];
		notNull: T extends { notNull: infer U } ? U : boolean;
		hasDefault: T extends { hasDefault: infer U } ? U : boolean;
		enumValues: T['enumValues'];
		identity: T extends { identity: infer U } ? U : unknown;
		generated: T extends { generated: infer G } ? G extends undefined ? unknown : G : unknown;
	}
	& TTypeConfig
>;

export interface ColumnBuilderBase<
	T extends ColumnBuilderBaseConfig<ColumnDataType, string> = ColumnBuilderBaseConfig<ColumnDataType, string>,
	TTypeConfig extends object = object,
> {
	_: ColumnBuilderTypeConfig<T, TTypeConfig>;
}

export type Dialect = 'pg' | 'mysql' | 'sqlite' | 'singlestore' | 'common' | 'gel';

export type BuildColumn<
	TTableName extends string,
	TBuilder extends ColumnBuilderBase,
	TDialect extends Dialect,
> = TDialect extends 'pg' ? PgColumn<
		MakeColumnConfig<TBuilder['_'], TTableName>,
		{},
		Simplify<Omit<TBuilder['_'], keyof MakeColumnConfig<TBuilder['_'], TTableName> | 'brand' | 'dialect'>>
	>
	: TDialect extends 'mysql' ? MySqlColumn<
			MakeColumnConfig<TBuilder['_'], TTableName>,
			{},
			Simplify<
				Omit<
					TBuilder['_'],
					| keyof MakeColumnConfig<TBuilder['_'], TTableName>
					| 'brand'
					| 'dialect'
					| 'primaryKeyHasDefault'
					| 'mysqlColumnBuilderBrand'
				>
			>
		>
	: TDialect extends 'sqlite' ? SQLiteColumn<
			MakeColumnConfig<TBuilder['_'], TTableName>,
			{},
			Simplify<Omit<TBuilder['_'], keyof MakeColumnConfig<TBuilder['_'], TTableName> | 'brand' | 'dialect'>>
		>
	: TDialect extends 'common' ? Column<
			MakeColumnConfig<TBuilder['_'], TTableName>,
			{},
			Simplify<Omit<TBuilder['_'], keyof MakeColumnConfig<TBuilder['_'], TTableName> | 'brand' | 'dialect'>>
		>
	: TDialect extends 'singlestore' ? SingleStoreColumn<
			MakeColumnConfig<TBuilder['_'], TTableName>,
			{},
			Simplify<
				Omit<
					TBuilder['_'],
					| keyof MakeColumnConfig<TBuilder['_'], TTableName>
					| 'brand'
					| 'dialect'
					| 'primaryKeyHasDefault'
					| 'singlestoreColumnBuilderBrand'
				>
			>
		>
	: TDialect extends 'gel' ? GelColumn<
			MakeColumnConfig<TBuilder['_'], TTableName>,
			{},
			Simplify<Omit<TBuilder['_'], keyof MakeColumnConfig<TBuilder['_'], TTableName> | 'brand' | 'dialect'>>
		>
	: never;

export type MakeColumnConfig<
	T extends ColumnBuilderBaseConfig<ColumnDataType, string>,
	TTableName extends string,
	TData = T extends { $type: infer U } ? U : T['data'],
> = {
	name: T['name'];
	tableName: TTableName;
	dataType: T['dataType'];
	columnType: T['columnType'];
	data: TData;
	driverParam: T['driverParam'];
	notNull: T extends { notNull: true } ? true : false;
	hasDefault: T extends { hasDefault: true } ? true : false;
	isPrimaryKey: T extends { isPrimaryKey: true } ? true : false;
	isAutoincrement: T extends { isAutoincrement: true } ? true : false;
	hasRuntimeDefault: T extends { hasRuntimeDefault: true } ? true : false;
	enumValues: T['enumValues'];
	baseColumn: T extends { baseBuilder: infer U extends ColumnBuilderBase } ? BuildColumn<TTableName, U, 'common'>
		: never;
	identity: T extends { identity: 'always' } ? 'always' : T extends { identity: 'byDefault' } ? 'byDefault' : undefined;
	generated: T extends { generated: infer G } ? unknown extends G ? undefined
		: G extends undefined ? undefined
		: G
		: undefined;
} & {};

export type GeneratedIdentityConfig = {
	sequenceName?: string;
	sequenceOptions?: PgSequenceOptions;
	type: 'always' | 'byDefault';
};

export type ColumnBuilderRuntimeConfig<TData, TRuntimeConfig extends object = object> = {
	name: string;
	keyAsName: boolean;
	notNull: boolean;
	default: TData | SQL | undefined;
	defaultFn: (() => TData | SQL) | undefined;
	onUpdateFn: (() => TData | SQL) | undefined;
	hasDefault: boolean;
	primaryKey: boolean;
	isUnique: boolean;
	uniqueName: string | undefined;
	uniqueType: string | undefined;
	dataType: string;
	columnType: string;
	generated: GeneratedColumnConfig<TData> | undefined;
	generatedIdentity: GeneratedIdentityConfig | undefined;
} & TRuntimeConfig;

export type NotNull<T extends ColumnBuilderBase> = T & {
	_: {
		notNull: true;
	};
};

export type HasDefault<T extends ColumnBuilderBase> = T & {
	_: {
		hasDefault: true;
	};
};

export type IsPrimaryKey<T extends ColumnBuilderBase> = T & {
	_: {
		isPrimaryKey: true;
	};
};

export type IsAutoincrement<T extends ColumnBuilderBase> = T & {
	_: {
		isAutoincrement: true;
	};
};

export type HasRuntimeDefault<T extends ColumnBuilderBase> = T & {
	_: {
		hasRuntimeDefault: true;
	};
};

export type $Type<T extends ColumnBuilderBase, TType> = T & {
	_: {
		$type: TType;
	};
};

export type HasGenerated<T extends ColumnBuilderBase, TGenerated extends {} = {}> = T & {
	_: {
		hasDefault: true;
		generated: TGenerated;
	};
};

export type IsIdentity<
	T extends ColumnBuilderBase,
	TType extends 'always' | 'byDefault',
> = T & {
	_: {
		notNull: true;
		hasDefault: true;
		identity: TType;
	};
};

export type BuildIndexColumn<
	TDialect extends Dialect,
> = TDialect extends 'pg' ? ExtraConfigColumn
	: TDialect extends 'gel' ? GelExtraConfigColumn
	: never;

export type BuildColumns<
	TTableName extends string,
	TConfigMap extends Record<string, ColumnBuilderBase>,
	TDialect extends Dialect,
> =
	& {
		[Key in keyof TConfigMap]: BuildColumn<TTableName, {
			_:
				& Omit<TConfigMap[Key]['_'], 'name'>
				& { name: TConfigMap[Key]['_']['name'] extends '' ? Assume<Key, string> : TConfigMap[Key]['_']['name'] };
		}, TDialect>;
	}
	& {};

export type BuildExtraConfigColumns<
	_TTableName extends string,
	TConfigMap extends Record<string, ColumnBuilderBase>,
	TDialect extends Dialect,
> =
	& {
		[Key in keyof TConfigMap]: BuildIndexColumn<TDialect>;
	}
	& {};

export type ChangeColumnTableName<TColumn extends Column, TAlias extends string, TDialect extends Dialect> =
	TDialect extends 'pg' ? PgColumn<MakeColumnConfig<TColumn['_'], TAlias>>
		: TDialect extends 'mysql' ? MySqlColumn<MakeColumnConfig<TColumn['_'], TAlias>>
		: TDialect extends 'singlestore' ? SingleStoreColumn<MakeColumnConfig<TColumn['_'], TAlias>>
		: TDialect extends 'sqlite' ? SQLiteColumn<MakeColumnConfig<TColumn['_'], TAlias>>
		: TDialect extends 'gel' ? GelColumn<MakeColumnConfig<TColumn['_'], TAlias>>
		: never;
