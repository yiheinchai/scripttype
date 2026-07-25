/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/smallint.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgSmallIntBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgSmallIntBuilderInitial<TName extends string> = PgSmallIntBuilder<{
	name: TName;
	dataType: 'number';
	columnType: 'PgSmallInt';
	data: number;
	driverParam: number | string;
	enumValues: undefined;
}>;
