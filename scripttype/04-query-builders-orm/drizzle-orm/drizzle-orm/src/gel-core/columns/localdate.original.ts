/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/gel-core/columns/localdate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type GelLocalDateStringBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LocalDate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GelLocalDateStringBuilderInitial<TName extends string> = GelLocalDateStringBuilder<{
	name: TName;
	dataType: 'localDate';
	columnType: 'GelLocalDateString';
	data: LocalDate;
	driverParam: LocalDate;
	enumValues: undefined;
}>;
