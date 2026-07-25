/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/action/extract.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtractAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtractDeferred<Left extends TSchema, Right extends TSchema> = (
  TDeferred<'Extract', [Left, Right]>
)

export type TExtract<Left extends TSchema, Right extends TSchema> = (
  TExtractAction<Left, Right>
)
