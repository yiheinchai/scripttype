/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/common.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ColumnBaseConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ColumnDataType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgColumn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Update<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type AnyPgColumn<TPartial extends Partial<ColumnBaseConfig<ColumnDataType, string>> = {}> = PgColumn<
	Required<Update<ColumnBaseConfig<ColumnDataType, string>, TPartial>>
>;
