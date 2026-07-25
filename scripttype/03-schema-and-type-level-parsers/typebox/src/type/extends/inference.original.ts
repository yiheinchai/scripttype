/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/extends/inference.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TExtendsLeft<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TRest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TTuple<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnreachable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TInferable<Name extends string = string, Type extends TSchema = TSchema> {
  '~kind': 'Inferrable'
  name: Name
  type: Type
}

export type TTryRestInferable<Type extends TSchema,
  Result extends TInferable | undefined = (
    Type extends TRest<infer RestType extends TSchema>
    ? RestType extends TInfer<infer Name extends string, infer Type extends TSchema>
      ? Type extends TArray<infer Type extends TSchema> ? TInferable<Name, Type> :
        Type extends TUnknown ? TInferable<Name, Type> :
        undefined
      : TUnreachable // undefined
    : undefined
  )
> = Result

export type TTryInferable<Type extends TSchema,
  Result extends TInferable | undefined = (
    Type extends TInfer<infer Name extends string, infer Type extends TSchema> ? TInferable<Name, Type>: 
    undefined
  )
> = Result

export type TryInferResults<Rest extends TSchema[], Right extends TSchema, Result extends TSchema[] = []> = (
  Rest extends [infer Head extends TSchema, ...infer Tail extends TSchema[]]
    ? TExtendsLeft<{}, Head, Right> extends Result.TExtendsTrueLike
      ? TryInferResults<Tail, Right, [...Result, Head]>
      : undefined
    : Result
)

export type TInferTupleResult<Inferred extends TProperties, Name extends string, Left extends TSchema[], Right extends TSchema,
  Results extends TSchema[] | undefined = TryInferResults<Left, Right>
> = (
  Results extends [...infer Results extends TSchema[]]
    ? Result.TExtendsTrue<Memory.TAssign<Inferred, { [_ in Name]: TTuple<Results> }>>
    : Result.TExtendsFalse
)

export type TInferUnionResult<Inferred extends TProperties, Name extends string, Left extends TSchema[], Right extends TSchema,
  Results extends TSchema[] | undefined = TryInferResults<Left, Right>
> = (
  Results extends [...infer Results extends TSchema[]]
    ? Result.TExtendsTrue<Memory.TAssign<Inferred, { [_ in Name]: TUnion<Results> }>>
    : Result.TExtendsFalse
)
