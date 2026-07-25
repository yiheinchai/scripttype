/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/union.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsLeft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInferUnionResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInferable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTryInferable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsUnionSome<Inferred extends TProperties, Type extends TSchema, UnionTypes extends TSchema[]> = (
  UnionTypes extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
  ? TExtendsLeft<Inferred, Type, Head> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
    ? Result.TExtendsTrue<Inferred>
    : TExtendsUnionSome<Inferred, Type, Tail>
  : Result.TExtendsFalse
)

export type TExtendsUnionLeft<Inferred extends TProperties, Left extends TSchema[], Right extends TSchema[]> = (
  Left extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
  ? TExtendsUnionSome<Inferred, Head, Right> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
    ? TExtendsUnionLeft<Inferred, Tail, Right>
    : Result.TExtendsFalse
  : Result.TExtendsTrue<Inferred>
)

export type TExtendsUnion<Inferred extends TProperties, Left extends TSchema[], Right extends TSchema,
  Inferrable extends TInferable | undefined = TTryInferable<Right>
> = (
  Inferrable extends TInferable<infer Name extends string, infer Type extends TSchema>
    ? TInferUnionResult<Inferred, Name, Left, Type>
    : Right extends TUnion<infer Types extends TSchema[]>
      ? TExtendsUnionLeft<Inferred, Left, Types>
      : TExtendsUnionLeft<Inferred, Left, [Right]>
)
