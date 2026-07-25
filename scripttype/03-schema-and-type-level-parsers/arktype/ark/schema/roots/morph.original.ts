/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/arktype/ark/schema/roots/morph.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Traversal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Morph<i = never, o = unknown> = (In: i, ctx: Traversal) => o

export type In<morph extends Morph> = morph extends Morph<infer i> ? i : never

export type Out<morph extends Morph> =
		morph extends Morph<never, infer o> ? o : never

export type ContextFree<i = never, o = unknown> = (In: i) => o
