/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store-svelte/src/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyStoreConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyStoreLogicCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InputFromStoreLogicCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreFromStoreConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreFromStoreLogicCreator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StoreDefinition = AnyStoreConfig | AnyStoreLogicCreator;

export type StoreFromStoreDefinition<TDefinition extends StoreDefinition> =
  TDefinition extends AnyStoreLogicCreator
    ? StoreFromStoreLogicCreator<TDefinition>
    : TDefinition extends AnyStoreConfig
      ? StoreFromStoreConfig<TDefinition>
      : never;

export type UseStoreArgs<TDefinition extends StoreDefinition> =
  TDefinition extends AnyStoreLogicCreator
    ? undefined extends InputFromStoreLogicCreator<TDefinition>
      ? [logic: TDefinition, input?: InputFromStoreLogicCreator<TDefinition>]
      : [logic: TDefinition, input: InputFromStoreLogicCreator<TDefinition>]
    : [definition: TDefinition];
