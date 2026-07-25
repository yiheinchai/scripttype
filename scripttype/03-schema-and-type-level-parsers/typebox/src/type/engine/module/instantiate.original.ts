/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/module/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Memory<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCyclicCandidates<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TInstantiateCyclics<Context extends TProperties, Declarations extends TProperties, CyclicKeys extends string[], 
  DeclarationContext extends TProperties = Memory.TAssign<Context, Declarations>,
  Result extends TProperties = {
    [Key in Extract<keyof Declarations, CyclicKeys[number]>]: TInstantiateCyclic<DeclarationContext, Key, Declarations[Key]>
  }
> = Result

export type TInstantiateNonCyclics<Context extends TProperties, Declarations extends TProperties, CyclicKeys extends string[], 
  DeclarationContext extends TProperties = Memory.TAssign<Context, Declarations>,
  Result extends TProperties = {
    [Key in Exclude<keyof Declarations, CyclicKeys[number]>]: TInstantiateType<DeclarationContext, TState<[], []>, Declarations[Key]>
  }
> = Result

export type TInstantiateModule<Context extends TProperties, Declarations extends TProperties,
  CyclicCandidates extends string[] = TCyclicCandidates<Declarations>,
  InstantiatedCyclics extends TProperties = TInstantiateCyclics<Context, Declarations, CyclicCandidates>,
  InstantiatedNonCyclics extends TProperties = TInstantiateNonCyclics<Context, Declarations, CyclicCandidates>,
  InstantiatedModule extends TProperties = InstantiatedCyclics & InstantiatedNonCyclics
> = { [Key in keyof InstantiatedModule]: InstantiatedModule[Key] } & {}

export type TModuleInstantiate<Context extends TProperties, _State extends TState, Declarations extends TProperties,
  InstantiatedModule extends TProperties = TInstantiateModule<Context, Declarations>,
> = InstantiatedModule
