/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/line.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgLineABCBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgLineBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgLineBuilderInitial<TName extends string> = PgLineBuilder<{
	name: TName;
	dataType: 'array';
	columnType: 'PgLine';
	data: [number, number, number];
	driverParam: number | string;
	enumValues: undefined;
}>;

export type PgLineABCBuilderInitial<TName extends string> = PgLineABCBuilder<{
	name: TName;
	dataType: 'json';
	columnType: 'PgLineABC';
	data: { a: number; b: number; c: number };
	driverParam: string;
	enumValues: undefined;
}>;
