/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/result.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TExtendsUnion<Inferred extends TProperties = TProperties> {
  '~kind': 'ExtendsUnion'
  inferred: Inferred
}

export interface TExtendsTrue<Inferred extends TProperties = TProperties> {
  '~kind': 'ExtendsTrue'
  inferred: Inferred
}

export type TExtendsTrueLike<Inferred extends TProperties = TProperties> =
  | TExtendsUnion<Inferred>
  | TExtendsTrue<Inferred>
