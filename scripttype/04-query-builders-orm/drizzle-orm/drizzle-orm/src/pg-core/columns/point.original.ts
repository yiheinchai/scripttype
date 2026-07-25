/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/point.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgPointObjectBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgPointTupleBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgPointTupleBuilderInitial<TName extends string> = PgPointTupleBuilder<{
	name: TName;
	dataType: 'array';
	columnType: 'PgPointTuple';
	data: [number, number];
	driverParam: number | string;
	enumValues: undefined;
}>;

export type PgPointObjectBuilderInitial<TName extends string> = PgPointObjectBuilder<{
	name: TName;
	dataType: 'json';
	columnType: 'PgPointObject';
	data: { x: number; y: number };
	driverParam: string;
	enumValues: undefined;
}>;
