/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/operations.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Column<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SQL<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Subquery<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Table<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RequiredKeyOnly<TKey extends string, T extends Column> = T extends AnyColumn<{
	notNull: true;
	hasDefault: false;
}> ? TKey
	: never;

export type OptionalKeyOnly<TKey extends string, T extends Column, OverrideT extends boolean | undefined = false> =
	TKey extends RequiredKeyOnly<TKey, T> ? never : T extends {
		_: {
			generated: undefined;
		};
	} ? (T extends {
			_: {
				identity: undefined;
			};
		} ? TKey
			: T['_']['identity'] extends 'always' ? OverrideT extends true ? TKey : never
			: TKey)
	: never;

export type SelectedFieldsFlat<TColumn extends Column> = Record<
	string,
	TColumn | SQL | SQL.Aliased | Subquery
>;

export type SelectedFieldsFlatFull<TColumn extends Column> = Record<
	string,
	TColumn | SQL | SQL.Aliased
>;

export type SelectedFields<TColumn extends Column, TTable extends Table> = Record<
	string,
	SelectedFieldsFlat<TColumn>[string] | TTable | SelectedFieldsFlat<TColumn>
>;

export type SelectedFieldsOrdered<TColumn extends Column> = {
	path: string[];
	field: TColumn | SQL | SQL.Aliased | Subquery;
}[];
