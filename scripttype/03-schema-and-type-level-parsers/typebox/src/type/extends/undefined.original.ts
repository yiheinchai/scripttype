/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/undefined.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsRight<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUndefined<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TVoid<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsUndefined<Inferred extends TProperties, Left extends TUndefined, Right extends TSchema> = (
  Right extends TVoid ? Result.TExtendsTrue<Inferred> :
  Right extends TUndefined ? Result.TExtendsTrue<Inferred> :
  TExtendsRight<Inferred, Left, Right>
)
