/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/pg-core/columns/line.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PgLineABCBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PgLineBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
