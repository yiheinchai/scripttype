/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store/src/undo.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type EnqueueObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventPayloadMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreSnapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface UndoRedoEventOptions<
  TContext extends StoreContext,
  TEvent extends EventObject
> {
  /** A function that returns the transaction ID of an event. */
  getTransactionId?: (
    event: TEvent,
    snapshot: StoreSnapshot<TContext>
  ) => string | null | undefined;
  /**
   * A function that returns whether an event should be skipped during
   * undo/redo. Skipped events are not stored in history and are not replayed
   * during undo/redo.
   */
  skipEvent?: (event: TEvent, snapshot: StoreSnapshot<TContext>) => boolean;
}

export interface UndoRedoSnapshotOptions<
  TContext extends StoreContext,
  TEvent extends EventObject,
  TEmitted extends EventObject,
  TEventPayloadMap extends EventPayloadMap
> {
  /** A function that returns the transaction ID of an event. */
  getTransactionId?: (
    event: TEvent,
    snapshot: StoreSnapshot<TContext>
  ) => string | null | undefined;
  /**
   * A function that returns whether a snapshot should be skipped during
   * undo/redo. Skipped events don't save snapshots to history.
   */
  skipEvent?: (event: TEvent, snapshot: StoreSnapshot<TContext>) => boolean;
  /** Maximum number of snapshots to keep in history. Defaults to Infinity. */
  historyLimit?: number;
  /**
   * A function to compare snapshots for equality. When true, the new snapshot
   * will not be added to history. Useful for avoiding duplicate snapshots.
   */
  compare?: (
    pastSnapshot: StoreSnapshot<TContext>,
    currentSnapshot: StoreSnapshot<TContext>
  ) => boolean;
  /** Customizes the context restored by snapshot-based undo/redo. */
  restore?: (
    args: {
      current: TContext;
      next: TContext;
      direction: 'undo' | 'redo';
    },
    enqueue: EnqueueObject<TContext, TEmitted, TEventPayloadMap>
  ) => TContext;
}

export type UndoRedoStrategyOptions<
  TContext extends StoreContext,
  TEvent extends EventObject,
  TEmitted extends EventObject,
  TEventPayloadMap extends EventPayloadMap
> =
  | ({
      strategy?: 'event';
    } & UndoRedoEventOptions<TContext, TEvent>)
  | ({
      strategy: 'snapshot';
    } & UndoRedoSnapshotOptions<TContext, TEvent, TEmitted, TEventPayloadMap>);
