/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store-preact/src/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyAtomConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyStoreConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyStoreLogicCreator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type BaseAtom<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InputFromAtomConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type InputFromStoreLogicCreator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StoreFromStoreConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StoreFromStoreLogicCreator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValueFromAtomConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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

export type AtomDefinition = BaseAtom<any> | AnyAtomConfig;

export type AtomStateFromDefinition<TDefinition extends AtomDefinition> =
  TDefinition extends AnyAtomConfig
    ? readonly [
        value: ValueFromAtomConfig<TDefinition>,
        atom: ReturnType<TDefinition['createAtom']>
      ]
    : TDefinition extends BaseAtom<infer TValue>
      ? readonly [value: TValue, atom: TDefinition]
      : never;

export type UseAtomStateArgs<TDefinition extends AtomDefinition> =
  TDefinition extends AnyAtomConfig
    ? undefined extends InputFromAtomConfig<TDefinition>
      ? [config: TDefinition, input?: InputFromAtomConfig<TDefinition>]
      : [config: TDefinition, input: InputFromAtomConfig<TDefinition>]
    : [atom: TDefinition];

export type AtomConfigInput<TInput> = undefined extends TInput
  ? [input?: TInput]
  : [input: TInput];
