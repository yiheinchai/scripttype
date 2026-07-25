/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/never.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsRight<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsNever<Inferred extends TProperties, Left extends TNever, Right extends TSchema> = (
  Right extends TInfer 
    ? TExtendsRight<Inferred, Left, Right> 
    : Result.TExtendsTrue<Inferred>
)
