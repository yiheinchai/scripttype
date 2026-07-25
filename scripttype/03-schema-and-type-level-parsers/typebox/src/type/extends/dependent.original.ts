/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/dependent.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsLeft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsDependent<Inferred extends TProperties, If extends TSchema, Then extends TSchema, Else extends TSchema, Right extends TSchema> = (
  TExtendsLeft<Inferred, If, Right> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
    ? TExtendsLeft<Inferred, Then, Right>
    : TExtendsLeft<Inferred, Else, Right>
)
