/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/gel-core/view.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ColumnsSelection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelMaterializedView<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelView<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GelViewWithSelection<
	TName extends string = string,
	TExisting extends boolean = boolean,
	TSelectedFields extends ColumnsSelection = ColumnsSelection,
> = GelView<TName, TExisting, TSelectedFields> & TSelectedFields;

export type GelMaterializedViewWithSelection<
	TName extends string = string,
	TExisting extends boolean = boolean,
	TSelectedFields extends ColumnsSelection = ColumnsSelection,
> = GelMaterializedView<TName, TExisting, TSelectedFields> & TSelectedFields;
