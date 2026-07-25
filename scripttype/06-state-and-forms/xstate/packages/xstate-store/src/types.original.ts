/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Omit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StandardSchemaV1<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type EventPayloadMap = Record<string, {} | null | undefined>;

export type Values<T> = T[keyof T];

export type ExtractEvents<T extends EventPayloadMap> = Values<{
  [K in keyof T & string]: T[K] & { type: K };
}>;

export type Compute<A> = A extends any ? { [K in keyof A]: A[K] } : never;

export type InferSchemaOutput<
  TSchema extends StandardSchemaV1,
  TFallback
> = Compute<
  StandardSchemaV1.InferOutput<TSchema> extends TFallback
    ? StandardSchemaV1.InferOutput<TSchema>
    : never
>;

export type StandardSchemaMap = Record<
  string,
  StandardSchemaV1<unknown, object>
>;

export type NormalizeSchemaPayload<TPayload> = string extends keyof TPayload
  ? {}
  : TPayload;

export type InferSchemaPayloadMap<TSchemaMap extends StandardSchemaMap> = {
  [K in keyof TSchemaMap & string]: NormalizeSchemaPayload<
    InferSchemaOutput<TSchemaMap[K], EventPayloadMap[string]>
  >;
};

export type StoreSchemas<
  TContextSchema extends StandardSchemaV1 | undefined = undefined,
  TEventSchemaMap extends StandardSchemaMap | undefined = undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined = undefined
> = {
  context?: TContextSchema;
  events?: TEventSchemaMap;
  emitted?: TEmittedSchemaMap;
};

export type StoreContext = Record<string, any>;

export type ResolveStoreContext<
  TContext extends StoreContext,
  TContextSchema extends StandardSchemaV1 | undefined
> = TContextSchema extends StandardSchemaV1
  ? InferSchemaOutput<TContextSchema, StoreContext>
  : TContext;

export type ResolveStoreEventPayloadMap<
  TEventPayloadMap extends EventPayloadMap,
  TEventSchemaMap extends StandardSchemaMap | undefined
> = TEventSchemaMap extends StandardSchemaMap
  ? InferSchemaPayloadMap<TEventSchemaMap>
  : TEventPayloadMap;

export type ResolveStoreEmittedPayloadMap<
  TEmittedPayloadMap extends EventPayloadMap,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = TEmittedSchemaMap extends StandardSchemaMap
  ? InferSchemaPayloadMap<TEmittedSchemaMap>
  : TEmittedPayloadMap;

export type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;

export type EventPayloadFromEvent<TEvent> = TEvent extends { type: string }
  ? DistributiveOmit<TEvent, 'type'>
  : TEvent;

export type EventPayloadMapFromTransitions<TTransitions> = {
  [K in keyof TTransitions & string]: TTransitions[K] extends (
    context: any,
    event: infer TEvent,
    ...args: any[]
  ) => unknown
    ? EventPayloadFromEvent<TEvent>
    : {};
};

export type EventObject = {
  /** The type of event that is sent. */
  type: string;
};

export type EmitterFunction<TEmittedEvent extends EventObject> = (
  ...args: { type: TEmittedEvent['type'] } extends TEmittedEvent
    ? [DistributiveOmit<TEmittedEvent, 'type'>?]
    : [DistributiveOmit<TEmittedEvent, 'type'>]
) => void;

export type TriggerFunction<TEvent extends EventObject> = (
  ...args: { type: TEvent['type'] } extends TEvent
    ? [DistributiveOmit<TEvent, 'type'>?]
    : [DistributiveOmit<TEvent, 'type'>]
) => void;

export type EventFromPayload<TKey extends string, TPayload> = {
  type: TKey;
} & (TPayload extends null | undefined ? {} : TPayload);

export type TriggerObject<TEventPayloadMap extends EventPayloadMap> = {
  [K in keyof TEventPayloadMap & string]: string extends K
    ? (...args: any[]) => void
    : TriggerFunction<EventFromPayload<K, TEventPayloadMap[K]>>;
};

export type Snapshot<TOutput> =
  | {
      status: 'active';
      output: undefined;
      error: undefined;
    }
  | {
      status: 'done';
      output: TOutput;
      error: undefined;
    }
  | {
      status: 'error';
      output: undefined;
      error: unknown;
    }
  | {
      status: 'stopped';
      output: undefined;
      error: undefined;
    };

export type StoreSnapshot<TContext> = Snapshot<undefined> & {
  context: TContext;
};

export type StoreEffectEnqueue<
  TContext extends StoreContext = StoreContext,
  TEventPayloadMap extends EventPayloadMap = {}
> = {
  trigger: TriggerObject<TEventPayloadMap>;
  send: (event: EventObject) => void;
  getSnapshot: () => StoreSnapshot<TContext>;
};

export type EnqueueObject<
  TContext extends StoreContext,
  TEmittedEvent extends EventObject,
  TEventPayloadMap extends EventPayloadMap = {}
> = {
  emit: {
    [E in TEmittedEvent as E['type']]: EmitterFunction<E>;
  };
  trigger: TriggerObject<TEventPayloadMap>;
  effect: (
    fn: (enq: StoreEffectEnqueue<TContext, TEventPayloadMap>) => void
  ) => void;
};

export type StoreAssigner<
  TContext extends StoreContext,
  TEvent extends EventObject,
  TEmitted extends EventObject,
  TEventPayloadMap extends EventPayloadMap = {}
> = (
  context: TContext,
  event: TEvent,
  enq: EnqueueObject<TContext, TEmitted, TEventPayloadMap>
) => TContext | void;

export type StoreConfig<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TEmittedPayloadMap extends EventPayloadMap = {},
  TContextSchema extends StandardSchemaV1 | undefined = undefined,
  TEventSchemaMap extends StandardSchemaMap | undefined = undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined = undefined
> = {
  context: ResolveStoreContext<TContext, TContextSchema>;
  schemas?: StoreSchemas<TContextSchema, TEventSchemaMap, TEmittedSchemaMap>;
  on: TEventSchemaMap extends StandardSchemaMap
    ? {
        [K in keyof ResolveStoreEventPayloadMap<
          TEventPayloadMap,
          TEventSchemaMap
        > &
          string]?: StoreAssigner<
          ResolveStoreContext<TContext, TContextSchema>,
          {
            type: K;
          } & ResolveStoreEventPayloadMap<TEventPayloadMap, TEventSchemaMap>[K],
          ExtractEvents<
            ResolveStoreEmittedPayloadMap<TEmittedPayloadMap, TEmittedSchemaMap>
          >,
          ResolveStoreEventPayloadMap<TEventPayloadMap, TEventSchemaMap>
        >;
      }
    : {
        [K in keyof TEventPayloadMap & string]: StoreAssigner<
          ResolveStoreContext<TContext, TContextSchema>,
          { type: K } & TEventPayloadMap[K],
          ExtractEvents<
            ResolveStoreEmittedPayloadMap<TEmittedPayloadMap, TEmittedSchemaMap>
          >,
          ResolveStoreEventPayloadMap<TEventPayloadMap, TEventSchemaMap>
        >;
      };
};

export type AnyStoreConfig = StoreConfig<any, any, any, any, any, any>;

export type StoreEventPayloadMapFromConfig<TConfig extends AnyStoreConfig> =
  TConfig extends { schemas: { events: infer TEventSchemaMap } }
    ? TEventSchemaMap extends StandardSchemaMap
      ? InferSchemaPayloadMap<TEventSchemaMap>
      : {}
    : TConfig extends { on: infer TTransitions }
      ? EventPayloadMapFromTransitions<TTransitions>
      : {};

export type CanFunction<TEvent extends EventObject> = (
  ...args: { type: TEvent['type'] } extends TEvent
    ? [DistributiveOmit<TEvent, 'type'>?]
    : [DistributiveOmit<TEvent, 'type'>]
) => boolean;

export type CanObject<TEventPayloadMap extends EventPayloadMap> = {
  [K in keyof TEventPayloadMap & string]: string extends K
    ? (...args: any[]) => boolean
    : CanFunction<EventFromPayload<K, TEventPayloadMap[K]>>;
};

export type StoreEffect<TEmitted extends EventObject> =
  | ((enq?: StoreEffectEnqueue<any, any>) => void)
  | TEmitted;

export type StoreProducerAssigner<
  TContext extends StoreContext,
  TEvent extends EventObject,
  TEmitted extends EventObject,
  TEventPayloadMap extends EventPayloadMap = {}
> = (
  context: TContext,
  event: TEvent,
  enq: EnqueueObject<TContext, TEmitted, TEventPayloadMap>
) => void;

export type StoreTransitionResult<
  TSnapshot extends StoreSnapshot<any>,
  TEmitted extends EventObject
> = [TSnapshot, StoreEffect<TEmitted>[]] & {
  _allowed?: boolean;
};

export type StoreTransition<
  TContext extends StoreContext,
  TEvent extends EventObject,
  TEmitted extends EventObject
> = (
  state: StoreSnapshot<TContext>,
  event: TEvent
) => StoreTransitionResult<StoreSnapshot<TContext>, TEmitted>;

export type EventPayloadMapFromEvents<TEvent extends EventObject> = {
  [E in TEvent as E['type']]: DistributiveOmit<E, 'type'>;
};

export type SpecificStoreConfig<
  TContext extends StoreContext,
  TEvent extends EventObject,
  TEmitted extends EventObject,
  TContextSchema extends StandardSchemaV1 | undefined = undefined,
  TEventSchemaMap extends StandardSchemaMap | undefined = undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined = undefined
> = {
  context: ResolveStoreContext<TContext, TContextSchema>;
  schemas?: StoreSchemas<TContextSchema, TEventSchemaMap, TEmittedSchemaMap>;
  on: {
    [E in TEvent as E['type']]?: StoreAssigner<
      ResolveStoreContext<TContext, TContextSchema>,
      E,
      TEmitted,
      EventPayloadMapFromEvents<TEvent>
    >;
  };
};

export type Observer<T> = {
  next?: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
};

export interface AnyEventObject {
  type: string;
  [key: string]: any;
}

export interface StoreInspectionEvent
  extends StoreBaseInspectionEventProperties {
  type: '@xstate.transition';
  event: AnyEventObject; // { type: string, ... }
  snapshot: Snapshot<unknown>;
}

export interface Subscription {
  unsubscribe(): void;
}

export type Selector<TContext, TSelected> = (context: TContext) => TSelected;

export interface Readable<T> extends Subscribable<T> {
  get: () => T;
}

export type Selection<TSelected> = Readable<TSelected>;

export type StoreLogic<
  TSnapshot extends StoreSnapshot<any>,
  TEvent extends EventObject,
  TEmitted extends EventObject
> = {
  eventTypes?: readonly string[];
  schemas?: StoreSchemas<any, any, any>;
  getInitialSnapshot: () => TSnapshot;
  transition: (
    snapshot: TSnapshot,
    event: TEvent
  ) => StoreTransitionResult<TSnapshot, TEmitted>;
};

export type StoreExtension<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TNewEventPayloadMap extends EventPayloadMap,
  TEmitted extends EventObject
> = (
  logic: StoreLogic<
    StoreSnapshot<TContext>,
    ExtractEvents<TEventPayloadMap>,
    TEmitted
  >
) => StoreLogic<
  StoreSnapshot<TContext>,
  ExtractEvents<TEventPayloadMap> | ExtractEvents<TNewEventPayloadMap>,
  TEmitted
>;

export interface Store<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TEmitted extends EventObject
> extends Subscribable<StoreSnapshot<TContext>>,
    InteropObservable<StoreSnapshot<TContext>>,
    Readable<StoreSnapshot<TContext>> {
  /** Standard Schema definitions for this store, if provided. */
  readonly schemas?: StoreSchemas<any, any, any>;
  send: (event: ExtractEvents<TEventPayloadMap>) => void;
  getSnapshot: () => StoreSnapshot<TContext>;
  /** Read the current snapshot as a `Readable` value. */
  get: () => StoreSnapshot<TContext>;
  getInitialSnapshot: () => StoreSnapshot<TContext>;
  /**
   * Subscribes to [inspection events](https://stately.ai/docs/inspection) from
   * the store.
   *
   * Inspectors that call `store.inspect(…)` will immediately receive the
   * current snapshot as an "@xstate.transition" inspection event.
   */
  inspect: (
    observer:
      | Observer<StoreInspectionEvent>
      | ((inspectionEvent: StoreInspectionEvent) => void)
  ) => Subscription;
  sessionId: string;
  on: <TType extends TEmitted['type'] | '*'>(
    type: TType,
    handler: (
      emitted: Compute<
        TEmitted & (TType extends '*' ? unknown : { type: TType })
      >
    ) => void
  ) => Subscription;
  /**
   * A trigger object that allows you to send events to the store without
   * manually constructing event objects.
   *
   * @example
   *
   * ```ts
   * // Equivalent to:
   * // store.send({ type: 'increment', by: 1 });
   * store.trigger.increment({ by: 1 });
   * ```
   */
  trigger: TriggerObject<TEventPayloadMap>;
  can: CanObject<TEventPayloadMap>;
  select<TSelected>(
    selector: Selector<TContext, TSelected>,
    equalityFn?: (a: TSelected, b: TSelected) => boolean
  ): Selection<TSelected>;
  /**
   * Returns the next state and effects for the given state and event, as a
   * tuple.
   *
   * @example
   *
   * ```ts
   * const [nextState, effects] = store.transition(store.getSnapshot(), {
   *   type: 'increment',
   *   by: 1
   * });
   * ```
   */
  transition: StoreTransition<
    TContext,
    ExtractEvents<TEventPayloadMap>,
    TEmitted
  >;
  /**
   * Extends the store with additional functionality via a store extension.
   *
   * @example
   *
   * ```ts
   * const store = createStore({
   *   context: { count: 0 },
   *   on: { inc: (ctx) => ({ count: ctx.count + 1 }) }
   * }).with(undoRedo());
   *
   * store.trigger.inc();
   * store.trigger.undo(); // undoes the increment
   * ```
   */
  with<TNewEventPayloadMap extends EventPayloadMap>(
    extension: StoreExtension<
      TContext,
      TEventPayloadMap,
      TNewEventPayloadMap,
      TEmitted
    >
  ): Store<TContext, TEventPayloadMap & TNewEventPayloadMap, TEmitted>;
}

export type SnapshotFromStore<TStore extends Store<any, any, any>> =
  TStore extends Store<infer TContext, any, any>
    ? StoreSnapshot<TContext>
    : never;

export type EventFromStore<TStore extends Store<any, any, any>> =
  TStore extends Store<infer _TContext, infer TEventPayloadMap, infer _TEmitted>
    ? ExtractEvents<TEventPayloadMap>
    : never;

export type StoreSelectorsConfig<TContext extends StoreContext> = Record<
  string,
  Selector<TContext, any>
>;

export type ResolvedStoreSelectors<
  TContext extends StoreContext,
  TSelectors extends StoreSelectorsConfig<TContext>
> = {
  [K in keyof TSelectors]: Selection<ReturnType<TSelectors[K]>>;
};

export type StoreWithSelectors<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TEmitted extends EventObject,
  TSelectors extends StoreSelectorsConfig<TContext>
> = Omit<Store<TContext, TEventPayloadMap, TEmitted>, 'with'> & {
  selectors: ResolvedStoreSelectors<TContext, TSelectors>;
  with<TNewEventPayloadMap extends EventPayloadMap>(
    extension: StoreExtension<
      TContext,
      TEventPayloadMap,
      TNewEventPayloadMap,
      TEmitted
    >
  ): StoreWithSelectors<
    TContext,
    TEventPayloadMap & TNewEventPayloadMap,
    TEmitted,
    TSelectors
  >;
};

export interface StoreLogicCreator<
  TContext extends StoreContext,
  TEventPayloadMap extends EventPayloadMap,
  TEmitted extends EventObject,
  TInput,
  TSelectors extends StoreSelectorsConfig<TContext>
> {
  createStore: undefined extends TInput
    ? (
        input?: TInput
      ) => StoreWithSelectors<TContext, TEventPayloadMap, TEmitted, TSelectors>
    : (
        input: TInput
      ) => StoreWithSelectors<TContext, TEventPayloadMap, TEmitted, TSelectors>;
}

export type AnyStoreLogicCreator = StoreLogicCreator<any, any, any, any, any>;

export type StoreFromStoreLogicCreator<TLogic extends AnyStoreLogicCreator> =
  TLogic extends StoreLogicCreator<
    infer TContext,
    infer TEventPayloadMap,
    infer TEmitted,
    any,
    infer TSelectors
  >
    ? StoreWithSelectors<TContext, TEventPayloadMap, TEmitted, TSelectors>
    : never;

export type InputFromStoreLogicCreator<TLogic extends AnyStoreLogicCreator> =
  TLogic extends StoreLogicCreator<any, any, any, infer TInput, any>
    ? TInput
    : never;

export interface Atom<T> extends BaseAtom<T> {
  /** Sets the value of the atom using a function. */
  set(fn: (prevVal: T) => T): void;
  /** Sets the value of the atom. */
  set(value: T): void;
}

export interface AtomConfig<TValue, TInput> {
  createAtom: undefined extends TInput
    ? (input?: TInput) => Atom<TValue>
    : (input: TInput) => Atom<TValue>;
}

export type AnyAtomConfig = AtomConfig<any, any>;

export type ValueFromAtomConfig<TConfig extends AnyAtomConfig> =
  TConfig extends AtomConfig<infer TValue, any> ? TValue : never;

export type InputFromAtomConfig<TConfig extends AnyAtomConfig> =
  TConfig extends AtomConfig<any, infer TInput> ? TInput : never;

export type EventFromStoreConfig<TStore extends AnyStoreConfig> =
  TStore extends StoreConfig<
    any,
    infer TEventPayloadMap,
    any,
    any,
    infer TEventSchemaMap,
    any
  >
    ? ExtractEvents<
        ResolveStoreEventPayloadMap<TEventPayloadMap, TEventSchemaMap>
      >
    : never;

export type EmitsFromStoreConfig<TStore extends AnyStoreConfig> =
  TStore extends StoreConfig<
    any,
    any,
    infer TEmittedPayloadMap,
    any,
    any,
    infer TEmittedSchemaMap
  >
    ? ExtractEvents<
        ResolveStoreEmittedPayloadMap<TEmittedPayloadMap, TEmittedSchemaMap>
      >
    : never;

export type ContextFromStoreConfig<TStore extends AnyStoreConfig> =
  TStore extends StoreConfig<
    infer TContext,
    any,
    any,
    infer TContextSchema,
    any,
    any
  >
    ? ResolveStoreContext<TContext, TContextSchema>
    : never;

export type StoreFromStoreConfig<TConfig extends AnyStoreConfig> =
  TConfig extends StoreConfig<
    infer TContext,
    any,
    infer TEmittedPayloadMap,
    infer TContextSchema,
    any,
    infer TEmittedSchemaMap
  >
    ? Store<
        ResolveStoreContext<TContext, TContextSchema>,
        StoreEventPayloadMapFromConfig<TConfig>,
        ExtractEvents<
          ResolveStoreEmittedPayloadMap<TEmittedPayloadMap, TEmittedSchemaMap>
        >
      >
    : never;
