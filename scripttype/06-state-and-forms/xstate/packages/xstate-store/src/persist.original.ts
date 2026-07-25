/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store/src/persist.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EventObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StoreContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface PersistStorageValue<TContext> {
  context: Partial<TContext>;
  version: string | number;
}

export interface PersistSnapshotOptions<
  TContext = StoreContext,
  TEvent extends EventObject = EventObject
> extends PersistBaseOptions {
  /** Persist strategy. Defaults to `'snapshot'`. */
  strategy?: 'snapshot';
  /**
   * Controls whether an event should trigger a storage write. Return `false` to
   * skip persisting for that event.
   */
  filter?: (event: TEvent) => boolean;
  /** Select which parts of context to persist. Defaults to full context. */
  pick?: (context: TContext) => Partial<TContext>;
  /** Migration function for version upgrades. */
  migrate?: (persistedContext: any, version: string | number) => TContext;
  /**
   * Custom merge strategy when rehydrating. Defaults to shallow merge (`{
   * ...currentContext, ...persistedContext }`).
   */
  merge?: (
    persistedContext: Partial<TContext>,
    currentContext: TContext
  ) => TContext;
  /** Custom serializer. Defaults to `JSON.stringify`. */
  serialize?: (value: PersistStorageValue<TContext>) => string;
  /** Custom deserializer. Defaults to `JSON.parse`. */
  deserialize?: (str: string) => PersistStorageValue<TContext>;
}

export interface PersistEventStorageValue<
  TEvent extends EventObject = EventObject
> {
  events: TEvent[];
  /**
   * Snapshot checkpoint from which to replay events. When events are truncated
   * by `maxEvents`, this stores the context at the truncation point so replay
   * produces the correct state.
   */
  checkpoint?: unknown;
  version: string | number;
}

export interface PersistEventOptions<
  _TContext = StoreContext,
  TEvent extends EventObject = EventObject
> extends PersistBaseOptions {
  /** Persist strategy. */
  strategy: 'event';
  /**
   * Maximum number of events to keep. When exceeded, a snapshot checkpoint is
   * saved and oldest events are dropped. Replay starts from the checkpoint.
   * Defaults to Infinity.
   */
  maxEvents?: number;
  /** Migration function for version upgrades. Receives the stored events array. */
  migrate?: (persistedEvents: any[], version: string | number) => any[];
  /** Custom serializer. Defaults to `JSON.stringify`. */
  serialize?: (value: PersistEventStorageValue<TEvent>) => string;
  /** Custom deserializer. Defaults to `JSON.parse`. */
  deserialize?: (str: string) => PersistEventStorageValue<TEvent>;
}

export type PersistOptions<
  TContext = StoreContext,
  TEvent extends EventObject = EventObject
> =
  | PersistSnapshotOptions<TContext, TEvent>
  | PersistEventOptions<TContext, TEvent>;
