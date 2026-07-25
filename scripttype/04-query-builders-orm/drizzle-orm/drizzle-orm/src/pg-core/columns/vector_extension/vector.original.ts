/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/vector_extension/vector.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgVectorBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgVectorBuilderInitial<TName extends string, TDimensions extends number> = PgVectorBuilder<{
	name: TName;
	dataType: 'array';
	columnType: 'PgVector';
	data: number[];
	driverParam: string;
	enumValues: undefined;
	dimensions: TDimensions;
}>;
