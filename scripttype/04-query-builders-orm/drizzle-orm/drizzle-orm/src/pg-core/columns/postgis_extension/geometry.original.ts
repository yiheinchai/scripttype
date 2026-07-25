/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/postgis_extension/geometry.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgGeometryBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PgGeometryObjectBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PgGeometryBuilderInitial<TName extends string> = PgGeometryBuilder<{
	name: TName;
	dataType: 'array';
	columnType: 'PgGeometry';
	data: [number, number];
	driverParam: string;
	enumValues: undefined;
}>;

export type PgGeometryObjectBuilderInitial<TName extends string> = PgGeometryObjectBuilder<{
	name: TName;
	dataType: 'json';
	columnType: 'PgGeometryObject';
	data: { x: number; y: number };
	driverParam: string;
	enumValues: undefined;
}>;
