/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/keyof/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCollapseToObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TDependent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TKeyOfDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TNormalizeType<Type extends TSchema,
  Result extends TSchema = (
    Type extends TCyclic ? TCollapseToObject<Type> :
    Type extends TDependent ? TCollapseToObject<Type> :
    Type extends TIntersect ? TCollapseToObject<Type> :
    Type extends TUnion ? TCollapseToObject<Type> : 
    Type
)
> = Result

export type TKeyOfAction<Type extends TSchema, 
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TFromType<TNormalizeType<Type>>
    : TKeyOfDeferred<Type>
> = Result

export type TKeyOfInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TKeyOfAction<InstantiatedType>
