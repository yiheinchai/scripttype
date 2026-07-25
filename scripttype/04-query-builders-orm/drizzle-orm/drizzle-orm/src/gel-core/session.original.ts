/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/gel-core/session.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface GelQueryResultHKT {
	readonly $brand: 'GelQueryResultHKT';
	readonly row: unknown;
	readonly type: unknown;
}

export type GelQueryResultKind<TKind extends GelQueryResultHKT, TRow> = (TKind & {
	readonly row: TRow;
})['type'];
