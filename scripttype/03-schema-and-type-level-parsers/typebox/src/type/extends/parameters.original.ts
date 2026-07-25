/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/parameters.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TExtendsLeft<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInfer<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TOptional<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TParameterRight<Inferred extends TProperties, Left extends TSchema, LeftRest extends TSchema[], RightRest extends TSchema[]> = (
  RightRest extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
  ? TParameterCompare<Inferred, Left, LeftRest, Head, Tail>
  : Left extends TOptional              // 'right-did-not-have-enough-elements'
    ? Result.TExtendsTrue<Inferred>     // 'ok: left was optional'
    : Result.TExtendsFalse              // 'fail: left was required'
)

export type TParameterLeft<Inferred extends TProperties, LeftRest extends TSchema[], RightRest extends TSchema[]> = (
  LeftRest extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
  ? TParameterRight<Inferred, Head, Tail, RightRest>
  : Result.TExtendsTrue<Inferred> // 'ok: no-more-elements-in-left'
)

export type TExtendsParameters<Inferred extends TProperties, Left extends TSchema[], Right extends TSchema[]> =
  TParameterLeft<Inferred, Left, Right>

export type TParameterCompare<Inferred extends TProperties, Left extends TSchema, LeftRest extends TSchema[], Right extends TSchema, RightRest extends TSchema[],
  // Parameter extends Right on Left, except when infer Right  
  CheckLeft extends TSchema = Right extends TInfer ? Left : Right,
  CheckRight extends TSchema = Right extends TInfer ? Right : Left,
  IsLeftOptional extends boolean = Left extends TOptional ? true : false,
  IsRightOptional extends boolean = Right extends TOptional ? true : false,
> = (
    [IsLeftOptional, IsRightOptional] extends [false, true]
      ? Result.TExtendsFalse // 'fail: left-required-but-right-is-optional'
      : TExtendsLeft<Inferred, CheckLeft, CheckRight> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
        ? TExtendsParameters<Inferred, LeftRest, RightRest>
        : Result.TExtendsFalse // 'fail: left-and-right-did-not-match'
  )
