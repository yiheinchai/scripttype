/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/entity.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface DrizzleEntity {
	[entityKind]: string;
}

export type DrizzleEntityClass<T> =
	& ((abstract new(...args: any[]) => T) | (new(...args: any[]) => T))
	& DrizzleEntity;
