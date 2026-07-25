/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/interface/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCanInstantiate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInterfaceDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TInterfaceOperation<Heritage extends TSchema[], Properties extends TProperties,
  Result extends TSchema = TEvaluateIntersect<[...Heritage, TObject<Properties>]>
> = Result

export type TInterfaceAction<Heritage extends TSchema[], Properties extends TProperties,
  Result extends TSchema = TCanInstantiate<Heritage> extends true
  ? TInterfaceOperation<Heritage, Properties>
  : TInterfaceDeferred<Heritage, Properties>
> = Result

export type TInterfaceInstantiate<Context extends TProperties, State extends TState, Heritage extends TSchema[], Properties extends TProperties,
  InstantiatedHeritage extends TSchema[] = TInstantiateTypes<Context, State, Heritage>,
  InstantiatedProperties extends TProperties = TInstantiateProperties<Context, State, Properties>,
> = TInterfaceAction<InstantiatedHeritage, InstantiatedProperties>
