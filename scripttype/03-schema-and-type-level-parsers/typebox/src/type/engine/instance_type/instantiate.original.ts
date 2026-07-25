/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/instance_type/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TConstructor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstanceTypeDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TInstanceTypeOperation<Type extends TSchema> = (
  Type extends TConstructor
    ? Type['instanceType']
    : TNever
)

export type TInstanceTypeAction<Type extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TInstanceTypeOperation<Type>
    : TInstanceTypeDeferred<Type>
> = Result

export type TInstanceTypeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TInstanceTypeAction<InstantiatedType>
