/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/mapped/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TIdentifier<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TMappedDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TMappedOperation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TMappedAction<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Type extends TSchema, As extends TSchema, Property extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TMappedOperation<Context, State, Identifier, Type, As, Property>
    : TMappedDeferred<Identifier, Type, As, Property>
> = Result

export type TMappedInstantiate<Context extends TProperties, State extends TState, Identifier extends TIdentifier, Type extends TSchema, As extends TSchema, Property extends TSchema,
  InstaniatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TMappedAction<Context, State, Identifier, InstaniatedType, As, Property>
