/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/gel-core/columns/bytes.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Buffer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GelBytesBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uint8Array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type GelBytesBuilderInitial<TName extends string> = GelBytesBuilder<{
	name: TName;
	dataType: 'buffer';
	columnType: 'GelBytes';
	data: Uint8Array;
	driverParam: Uint8Array | Buffer;
	enumValues: undefined;
}>;
