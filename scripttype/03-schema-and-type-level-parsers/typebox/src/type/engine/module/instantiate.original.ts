/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/module/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Memory<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TCyclicCandidates<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInstantiateCyclic<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TInstantiateType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TState<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
