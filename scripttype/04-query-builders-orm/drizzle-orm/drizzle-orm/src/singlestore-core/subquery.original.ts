/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/singlestore-core/subquery.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AddAliasToSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ColumnsSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Subquery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WithSubquery<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type SubqueryWithSelection<
	TSelection extends ColumnsSelection,
	TAlias extends string,
> =
	& Subquery<TAlias, AddAliasToSelection<TSelection, TAlias, 'singlestore'>>
	& AddAliasToSelection<TSelection, TAlias, 'singlestore'>;

export type WithSubqueryWithSelection<
	TSelection extends ColumnsSelection,
	TAlias extends string,
> =
	& WithSubquery<TAlias, AddAliasToSelection<TSelection, TAlias, 'singlestore'>>
	& AddAliasToSelection<TSelection, TAlias, 'singlestore'>;
