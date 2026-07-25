/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/structure/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type writeInvalidPropertyKeyMessage<indexSchema extends string> =
	`Indexed key definition '${indexSchema}' must be a string or symbol`
