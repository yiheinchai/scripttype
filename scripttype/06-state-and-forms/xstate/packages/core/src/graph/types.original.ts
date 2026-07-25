/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/graph/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActorLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Snapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type JSONSerializable<T extends object, U> = T & {
  toJSON: () => U;
};

export interface Step<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject
> {
  /** The event that resulted in the current state */
  event: TEvent;
  /** The current state after taking the event. */
  state: TSnapshot;
}

export type Steps<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject
> = Array<Step<TSnapshot, TEvent>>;

export type ExtractEvent<
  TEvent extends EventObject,
  TType extends TEvent['type']
> = TEvent extends { type: TType } ? TEvent : never;

export interface SerializationConfig<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject
> {
  serializeState: (
    state: TSnapshot,
    event: TEvent | undefined,
    prevState?: TSnapshot
  ) => string;
  serializeEvent: (event: TEvent) => string;
}

export type SerializationOptions<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject
> = Partial<
  Pick<
    SerializationConfig<TSnapshot, TEvent>,
    'serializeState' | 'serializeEvent'
  >
>;

export interface TraversalConfig<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject
> extends SerializationConfig<TSnapshot, TEvent> {
  events: readonly TEvent[] | ((state: TSnapshot) => readonly TEvent[]);
  filterEvents: ((snapshot: TSnapshot, event: TEvent) => boolean) | undefined;
  /**
   * The maximum number of traversals to perform when calculating the state
   * transition adjacency map.
   *
   * @default `Infinity`
   */
  limit: number;
  fromState: TSnapshot | undefined;
  /** When true, traversal of the adjacency map will stop for that current state. */
  stopWhen: ((state: TSnapshot) => boolean) | undefined;
  toState: ((state: TSnapshot) => boolean) | undefined;
}

export type TraversalOptions<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject,
  TInput
> = {
  input?: TInput;
} & SerializationOptions<TSnapshot, TEvent> &
  Partial<
    Pick<
      TraversalConfig<TSnapshot, TEvent>,
      'events' | 'filterEvents' | 'limit' | 'fromState' | 'stopWhen' | 'toState'
    >
  >;

export type Brand<T, Tag extends string> = T & { __tag: Tag };

export type EventExecutor<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject
> = (step: Step<TSnapshot, TEvent>) => Promise<any> | void;

export interface StatePath<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject
> {
  /** The ending state of the path. */
  state: TSnapshot;
  /**
   * The ordered array of state-event pairs (steps) which reach the ending
   * `state`.
   */
  steps: Steps<TSnapshot, TEvent>;
  /** The combined weight of all steps in the path. */
  weight: number;
}

export type PathGenerator<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject,
  TInput
> = (
  behavior: ActorLogic<TSnapshot, TEvent, TInput>,
  options: TraversalOptions<TSnapshot, TEvent, TInput>
) => Array<StatePath<TSnapshot, TEvent>>;
