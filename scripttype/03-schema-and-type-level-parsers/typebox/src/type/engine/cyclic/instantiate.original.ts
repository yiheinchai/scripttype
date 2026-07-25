/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/instantiate.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCyclic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TCyclicDependencies<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TEvaluateIntersect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInstantiateTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TInterfaceDeferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TState<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TCyclicInterface<Context extends TProperties, Heritage extends TSchema[], Properties extends TProperties,
  InstantiatedHeritage extends TSchema[] = TInstantiateTypes<Context, TState<[], []>, Heritage>,
  instantiatedProperties extends TProperties = TInstantiateProperties<{}, TState<[], []>, Properties>,
  EvaluatedInterface extends TSchema = TEvaluateIntersect<[...InstantiatedHeritage, TObject<instantiatedProperties>]>
> = EvaluatedInterface

export type TCyclicDefinitions<Context extends TProperties, Dependencies extends string[],
  Result extends TProperties = {
  [Key in Extract<keyof Context, Dependencies[number]>]: 
    Context[Key] extends TInterfaceDeferred<infer Heritage extends TSchema[], infer Properties extends TProperties>
      ? TCyclicInterface<Context, Heritage, Properties>
      : Context[Key]
}> = Result

export type TInstantiateCyclic<Context extends TProperties, Ref extends string, Type extends TSchema,
  Dependencies extends string[] = TCyclicDependencies<Context, Ref, Type>,
  Definitions extends TProperties = TCyclicDefinitions<Context, Dependencies>,
  Result extends TSchema = TCyclic<Definitions, Ref>
> = Result
