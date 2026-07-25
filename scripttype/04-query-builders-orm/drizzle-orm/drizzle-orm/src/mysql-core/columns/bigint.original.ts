/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql-core/columns/bigint.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MySqlBigInt53Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MySqlBigInt64Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MySqlBigInt53BuilderInitial<TName extends string> = MySqlBigInt53Builder<{
	name: TName;
	dataType: 'number';
	columnType: 'MySqlBigInt53';
	data: number;
	driverParam: number | string;
	enumValues: undefined;
}>;

export type MySqlBigInt64BuilderInitial<TName extends string> = MySqlBigInt64Builder<{
	name: TName;
	dataType: 'bigint';
	columnType: 'MySqlBigInt64';
	data: bigint;
	driverParam: string;
	enumValues: undefined;
}>;
