/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/tuple.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TExtendsLeft<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TExtendsRight<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInferTupleResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInferUnionResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInferable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInstantiateElements<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTryInferable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTryRestInferable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TTuple<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TReverse<Types extends TSchema[], Result extends TSchema[] = []> = (
  Types extends [infer Left extends TSchema, ...infer Right extends TSchema[]]
    ? TReverse<Right, [Left, ...Result]>
    : Result
)

export type TApplyReverse<Types extends TSchema[], Reversed extends boolean> 
  = Reversed extends true ? TReverse<Types> : Types

export type TReversed<Types extends TSchema[],
  First extends TSchema | undefined = Types extends [infer Left extends TSchema, ...infer _ extends TSchema[]] ? Left : undefined,
  Inferable extends TSchema | undefined = First extends TSchema ? TTryRestInferable<First> : undefined,
  Result extends boolean = Inferable extends TSchema ? true : false
> =  Result

export type TElementsLeft<Inferred extends TProperties, Reversed extends boolean, LeftRest extends TSchema[], Right extends TSchema, RightRest extends TSchema[],
  Inferable extends TInferable | undefined = TTryRestInferable<Right>
> = (
  // Rest Inferrable Right Means we delegate to TInferTupleResult to Generate a Result
  Inferable extends TInferable
    ? TInferTupleResult<Inferred, Inferable['name'], TApplyReverse<LeftRest, Reversed>, Inferable['type']> 
    : LeftRest extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
      ? TElementsCompare<Inferred, Reversed, Head, Tail, Right, RightRest>
      : Result.TExtendsFalse // 'left-was-empty'
)

export type TElementsRight<Inferred extends TProperties, Reversed extends boolean, LeftRest extends TSchema[], RightRest extends TSchema[]> = (
  RightRest extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
    ? TElementsLeft<Inferred, Reversed, LeftRest, Head, Tail>
    : LeftRest['length'] extends 0 
      ? Result.TExtendsTrue<Inferred> // 'Ok: right-empty-and-left-empty'
      : Result.TExtendsFalse          // 'Fail: right-empty-and-left-not-empty'
)

export type TElements<Inferred extends TProperties, Reversed extends boolean, LeftRest extends TSchema[], RightRest extends TSchema[]> = 
  TElementsRight<Inferred, Reversed, LeftRest, RightRest>

export type TElementsCompare<Inferred extends TProperties, Reversed extends boolean, Left extends TSchema, LeftRest extends TSchema[], Right extends TSchema, RightRest extends TSchema[]> = (
  TExtendsLeft<Inferred, Left, Right> extends Result.TExtendsTrueLike<infer CheckInferred extends TProperties>
    ? TElements<CheckInferred, Reversed, LeftRest, RightRest>
    : Result.TExtendsFalse // 'left-and-right-not-compared'
)

export type TExtendsTupleToTuple<Inferred extends TProperties, Left extends TSchema[], Right extends TSchema[],
  InstantiatedRight extends TSchema[] = TInstantiateElements<Inferred, TState<[], []>, Right>,
  Reversed extends boolean = TReversed<InstantiatedRight>,
> =  TElements<Inferred, Reversed, TApplyReverse<Left, Reversed>, TApplyReverse<InstantiatedRight, Reversed>>

export type TExtendsTupleToArray<Inferred extends TProperties, Left extends TSchema[], Right extends TSchema,
  Inferrable extends TInferable | undefined = TTryInferable<Right>
> = (
  Inferrable extends TInferable
    ? TInferUnionResult<Inferred, Inferrable['name'], Left, Inferrable['type']>
  : Left extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
    ? TExtendsLeft<Inferred, Head, Right> extends Result.TExtendsTrueLike<infer Inferred extends TProperties>
      ? TExtendsTupleToArray<Inferred, Tail, Right>
      : Result.TExtendsFalse
    : Result.TExtendsTrue<Inferred>
)

export type TExtendsTuple<Inferred extends TProperties, Left extends TSchema[], Right extends TSchema,
  InstantiatedLeft extends TSchema[] = TInstantiateElements<Inferred, TState<[], []>, Left>
> = (
  Right extends TTuple<infer Types extends TSchema[]> ? TExtendsTupleToTuple<Inferred, InstantiatedLeft, Types> :
  Right extends TArray<infer Type extends TSchema> ? TExtendsTupleToArray<Inferred, InstantiatedLeft, Type> :
  TExtendsRight<Inferred, TTuple<InstantiatedLeft>, Right>
)
