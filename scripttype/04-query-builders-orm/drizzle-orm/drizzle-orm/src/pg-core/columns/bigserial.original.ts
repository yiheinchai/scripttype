/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/bigserial.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HasDefault<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NotNull<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgBigSerial53Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgBigSerial64Builder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgBigSerial53BuilderInitial<TName extends string> = NotNull<
	HasDefault<
		PgBigSerial53Builder<{
			name: TName;
			dataType: 'number';
			columnType: 'PgBigSerial53';
			data: number;
			driverParam: number;
			enumValues: undefined;
		}>
	>
>;

export type PgBigSerial64BuilderInitial<TName extends string> = NotNull<
	HasDefault<
		PgBigSerial64Builder<{
			name: TName;
			dataType: 'bigint';
			columnType: 'PgBigSerial64';
			data: bigint;
			driverParam: string;
			enumValues: undefined;
		}>
	>
>;
