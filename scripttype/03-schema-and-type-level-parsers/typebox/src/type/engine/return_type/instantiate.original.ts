/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/return_type/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TReturnTypeDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TReturnTypeOperation<Type extends TSchema> = (
  Type extends TFunction
    ? Type['returnType']
    : TNever
)

export type TReturnTypeAction<Type extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TReturnTypeOperation<Type>
    : TReturnTypeDeferred<Type>
> = Result

export type TReturnTypeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TReturnTypeAction<InstantiatedType>
