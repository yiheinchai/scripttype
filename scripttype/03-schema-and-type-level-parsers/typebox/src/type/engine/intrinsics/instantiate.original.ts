/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/intrinsics/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Capitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCapitalizeDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TFromType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TLowercaseDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUncapitalizeDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TUppercaseDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uncapitalize<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TCapitalizeMapping extends TMappingType { output: Capitalize<this['input']> }

export type TCapitalizeAction<Type extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TFromType<TCapitalizeMapping, Type>
    : TCapitalizeDeferred<Type>
> = Result

export interface TLowercaseMapping extends TMappingType { output: Lowercase<this['input']> }

export type TLowercaseAction<Type extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TFromType<TLowercaseMapping, Type>
    : TLowercaseDeferred<Type>
> = Result

export interface TUncapitalizeMapping extends TMappingType { output: Uncapitalize<this['input']> }

export type TUncapitalizeAction<Type extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TFromType<TUncapitalizeMapping, Type>
    : TUncapitalizeDeferred<Type>
> = Result

export interface TUppercaseMapping extends TMappingType { output: Uppercase<this['input']> }

export type TUppercaseAction<Type extends TSchema,
  Result extends TSchema = TCanInstantiate<[Type]> extends true
    ? TFromType<TUppercaseMapping, Type>
    : TUppercaseDeferred<Type>
> = Result

export type TCapitalizeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TCapitalizeAction<InstantiatedType>

export type TLowercaseInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TLowercaseAction<InstantiatedType>

export type TUncapitalizeInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TUncapitalizeAction<InstantiatedType>

export type TUppercaseInstantiate<Context extends TProperties, State extends TState, Type extends TSchema,
  InstantiatedType extends TSchema = TInstantiateType<Context, State, Type>
> = TUppercaseAction<InstantiatedType>
