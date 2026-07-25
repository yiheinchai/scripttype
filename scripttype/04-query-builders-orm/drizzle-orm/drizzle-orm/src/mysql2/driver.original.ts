/**
 * ORIGINAL TypeScript from 04-query-builders-orm/drizzle-orm/drizzle-orm/src/mysql2/driver.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type DrizzleConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Mode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MySql2DrizzleConfig<TSchema extends Record<string, unknown> = Record<string, never>> =
	& Omit<DrizzleConfig<TSchema>, 'schema'>
	& ({ schema: TSchema; mode: Mode } | { schema?: undefined; mode?: Mode });
