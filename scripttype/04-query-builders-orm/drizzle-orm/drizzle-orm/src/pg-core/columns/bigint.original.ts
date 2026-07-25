/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/bigint.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgBigInt53Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgBigInt64Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgBigInt53BuilderInitial<TName extends string> = PgBigInt53Builder<{
	name: TName;
	dataType: 'number';
	columnType: 'PgBigInt53';
	data: number;
	driverParam: number | string;
	enumValues: undefined;
}>;

export type PgBigInt64BuilderInitial<TName extends string> = PgBigInt64Builder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'PgBigInt64';
	data: bigint;
	driverParam: string;
	enumValues: undefined;
}>;
