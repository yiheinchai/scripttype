/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/array.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsLeft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsRight<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TImmutable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TExtendsImmutable<Left extends TSchema, Right extends TSchema,
  IsImmutableLeft extends boolean = Left extends TImmutable ? true : false,
  IsImmutableRight extends boolean = Right extends TImmutable ? true : false,
  Result extends boolean  =
    [IsImmutableLeft, IsImmutableRight] extends [true, true] ? true :
    [IsImmutableLeft, IsImmutableRight] extends [false, true] ? true :
    [IsImmutableLeft, IsImmutableRight] extends [true, false] ? false :
    true
> = Result

export type TExtendsArray<Inferred extends TProperties, ArrayLeft extends TSchema, Left extends TSchema, Right extends TSchema> = (
  Right extends TArray<infer Type extends TSchema>
    ? TExtendsImmutable<ArrayLeft, Right> extends true
      ? TExtendsLeft<Inferred, Left, Type>
      : Result.TExtendsFalse
    : TExtendsRight<Inferred, ArrayLeft, Right>
)
