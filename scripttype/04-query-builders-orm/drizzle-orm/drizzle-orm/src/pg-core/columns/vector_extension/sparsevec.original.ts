/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/vector_extension/sparsevec.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgSparseVectorBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgSparseVectorBuilderInitial<TName extends string> = PgSparseVectorBuilder<{
	name: TName;
	dataType: 'string';
	columnType: 'PgSparseVector';
	data: string;
	driverParam: string;
	enumValues: undefined;
}>;
