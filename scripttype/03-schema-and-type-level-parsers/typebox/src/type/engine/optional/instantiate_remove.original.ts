/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/optional/instantiate_remove.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TOptional<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TRemoveOptionalOperation<Type extends TSchema,
  Result extends TSchema = Type extends TOptional<infer Type extends TSchema> 
    ? TRemoveOptionalOperation<Type> 
    : Type
> = Result

export type TRemoveOptionalAction<Type extends TSchema,
  Result extends TSchema = TRemoveOptionalOperation<Type>
> = Result

export type TRemoveOptionalInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiateType extends TSchema = TInstantiateType<Context, State, Type>
> = TRemoveOptionalAction<InstantiateType>
