/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/operations.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Column<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SQL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subquery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Table<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
