/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Actor<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyActorSystem<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AssignArgs<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExecutableRaiseAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExecutableSendToAction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Guard<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GuardPredicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MachineSnapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ProcessingStatus<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PromiseActorLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PropertyKey<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Required<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Spawner<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateMachine<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateNode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownGuard<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Identity<T> = { [K in keyof T]: T[K] };

export type HomomorphicPick<T, K extends keyof any> = {
  [P in keyof T as P & K]: T[P];
};

export type HomomorphicOmit<T, K extends keyof any> = {
  [P in keyof T as Exclude<P, K>]: T[P];
};

export type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};

export type NonReducibleUnknown = {} | null | undefined;

export interface ParameterizedObject {
  type: string;
  params?: NonReducibleUnknown;
}

export type GetParameterizedParams<T extends ParameterizedObject | undefined> =
  T extends any ? ('params' extends keyof T ? T['params'] : undefined) : never;

export type AnyFunction = (...args: any[]) => any;

export type ReturnTypeOrValue<T> = T extends AnyFunction ? ReturnType<T> : T;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsNotNever<T> = [T] extends [never] ? false : true;

export type Compute<A> = { [K in keyof A]: A[K] } & unknown;

export type Prop<T, K> = K extends keyof T ? T[K] : never;

export type Values<T> = T[keyof T];

export type Elements<T> = T[keyof T & `${number}`];

export type Merge<M, N> = Omit<M, keyof N> & N;

export type IndexByProp<T extends Record<P, string>, P extends keyof T> = {
  [E in T as E[P]]: E;
};

export type IndexByType<T extends { type: string }> = IndexByProp<T, 'type'>;

export type Equals<A1, A2> =
  (<A>() => A extends A2 ? true : false) extends <A>() => A extends A1
    ? true
    : false
    ? true
    : false;

export type IsAny<T> = Equals<T, any>;

export type Cast<A, B> = A extends B ? A : B;

export type DoNotInfer<T> = [T][T extends any ? 0 : any];

export type NoInfer<T> = DoNotInfer<T>;

export type LowInfer<T> = T & NonNullable<unknown>;

export type Lazy<T> = () => T;

export type MaybeLazy<T> = T | Lazy<T>;

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

export type EventObject = {
  /** The type of event that is sent. */
  type: string;
};

export type AnyActorRef = ActorRef<
  any,
  any, // TODO: shouldn't this be AnyEventObject?
  any
>;

export type AnyActorLogic = ActorLogic<
  any, // snapshot
  any, // event
  any, // input
  any, // system
  any // emitted
>;

export interface Subscription {
  unsubscribe(): void;
}

export interface Readable<T> extends Subscribable<T> {
  get: () => T;
}

export interface ActorRef<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject,
  TEmitted extends EventObject = EventObject
> extends Subscribable<TSnapshot>,
    InteropObservable<TSnapshot> {
  /** The unique identifier for this actor relative to its parent. */
  id: string;
  sessionId: string;
  /** @internal */
  _send: (event: TEvent) => void;
  send: (event: TEvent) => void;
  start: () => void;
  getSnapshot: () => TSnapshot;
  getPersistedSnapshot: () => Snapshot<unknown>;
  stop: () => void;
  toJSON?: () => any;
  // TODO: figure out how to hide this externally as `sendTo(ctx => ctx.actorRef._parent._parent._parent._parent)` shouldn't be allowed
  _parent?: AnyActorRef;
  system: AnyActorSystem;
  /** @internal */
  _processingStatus: ProcessingStatus;
  src: string | AnyActorLogic;
  // TODO: remove from ActorRef interface
  // (should only be available on Actor)
  on: <TType extends TEmitted['type'] | '*'>(
    type: TType,
    handler: (
      emitted: TEmitted & (TType extends '*' ? unknown : { type: TType })
    ) => void
  ) => Subscription;
  select<TSelected>(
    selector: (snapshot: TSnapshot) => TSelected,
    equalityFn?: (a: TSelected, b: TSelected) => boolean
  ): Readable<TSelected>;
}

export type MachineContext = Record<string, any>;

export interface ActionArgs<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject
> extends UnifiedArg<TContext, TExpressionEvent, TEvent> {}

export interface ExecutableActionObject {
  type: string;
  info: ActionArgs<MachineContext, EventObject, EventObject>;
  params: NonReducibleUnknown;
  exec:
    | ((info: ActionArgs<any, any, any>, params: unknown) => void)
    | undefined;
}

export type ActionExecutor = (actionToExecute: ExecutableActionObject) => void;

export interface ActorScope<
  TSnapshot extends Snapshot<unknown>,
  TEvent extends EventObject,
  TSystem extends AnyActorSystem = AnyActorSystem,
  TEmitted extends EventObject = EventObject
> {
  self: ActorRef<TSnapshot, TEvent, TEmitted>;
  id: string;
  sessionId: string;
  logger: (...args: any[]) => void;
  defer: (fn: () => void) => void;
  emit: (event: TEmitted) => void;
  system: TSystem;
  stopChild: (child: AnyActorRef) => void;
  actionExecutor: ActionExecutor;
}

export interface ActorLogic<
  in out TSnapshot extends Snapshot<unknown>, // it's invariant because it's also part of `ActorScope["self"]["getSnapshot"]`
  in out TEvent extends EventObject, // it's invariant because it's also part of `ActorScope["self"]["send"]`
  in TInput = NonReducibleUnknown,
  TSystem extends AnyActorSystem = AnyActorSystem,
  in out TEmitted extends EventObject = EventObject // it's invariant because it's also aprt of `ActorScope["self"]["on"]`
> {
  /** The initial setup/configuration used to create the actor logic. */
  config?: unknown;
  /**
   * Transition function that processes the current state and an incoming event
   * to produce a new state.
   *
   * @param snapshot - The current state.
   * @param event - The incoming event.
   * @param actorScope - The actor scope.
   * @returns The new state.
   */
  transition: (
    snapshot: TSnapshot,
    event: TEvent,
    actorScope: ActorScope<TSnapshot, TEvent, TSystem, TEmitted>
  ) => TSnapshot;
  /**
   * Called to provide the initial state of the actor.
   *
   * @param actorScope - The actor scope.
   * @param input - The input for the initial state.
   * @returns The initial state.
   */
  getInitialSnapshot: (
    actorScope: ActorScope<TSnapshot, TEvent, TSystem, TEmitted>,
    input: TInput
  ) => TSnapshot;
  /**
   * Called when Actor is created to restore the internal state of the actor
   * given a persisted state. The persisted state can be created by
   * `getPersistedSnapshot`.
   *
   * @param persistedState - The persisted state to restore from.
   * @param actorScope - The actor scope.
   * @returns The restored state.
   */
  restoreSnapshot?: (
    persistedState: Snapshot<unknown>,
    actorScope: ActorScope<TSnapshot, TEvent, AnyActorSystem, TEmitted>
  ) => TSnapshot;
  /**
   * Called when the actor is started.
   *
   * @param snapshot - The starting state.
   * @param actorScope - The actor scope.
   */
  start?: (
    snapshot: TSnapshot,
    actorScope: ActorScope<TSnapshot, TEvent, AnyActorSystem, TEmitted>
  ) => void;
  /**
   * Obtains the internal state of the actor in a representation which can be be
   * persisted. The persisted state can be restored by `restoreSnapshot`.
   *
   * @param snapshot - The current state.
   * @returns The a representation of the internal state to be persisted.
   */
  getPersistedSnapshot: (
    snapshot: TSnapshot,
    options?: unknown
  ) => Snapshot<unknown>;
}

export type InputFrom<T> =
  T extends StateMachine<
    infer _TContext,
    infer _TEvent,
    infer _TChildren,
    infer _TActor,
    infer _TAction,
    infer _TGuard,
    infer _TDelay,
    infer _TStateValue,
    infer _TTag,
    infer TInput,
    infer _TOutput,
    infer _TEmitted,
    infer _TMeta,
    infer _TStateSchema
  >
    ? TInput
    : T extends ActorLogic<
          infer _TSnapshot,
          infer _TEvent,
          infer TInput,
          infer _TSystem,
          infer _TEmitted
        >
      ? TInput
      : never;

export type OutputFrom<T> =
  T extends ActorLogic<
    infer TSnapshot,
    infer _TEvent,
    infer _TInput,
    infer _TSystem,
    infer _TEmitted
  >
    ? (TSnapshot & { status: 'done' })['output']
    : T extends ActorRef<infer TSnapshot, infer _TEvent, infer _TEmitted>
      ? (TSnapshot & { status: 'done' })['output']
      : never;

export type UnknownActorLogic = ActorLogic<
  any, // snapshot
  any, // event
  any, // input
  AnyActorSystem,
  any // emitted
>;

export interface ProvidedActor {
  src: string;
  logic: UnknownActorLogic;
  id?: string | undefined; // `| undefined` is required here for compatibility with `exactOptionalPropertyTypes`, see #4613
}

export type ActionFunction<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject
> = {
  (args: ActionArgs<TContext, TExpressionEvent, TEvent>, params: TParams): void;
  _out_TEvent?: TEvent; // TODO: it feels like we should be able to remove this since now `TEvent` is "observable" by `self`
  _out_TActor?: TActor;
  _out_TAction?: TAction;
  _out_TGuard?: TGuard;
  _out_TDelay?: TDelay;
  _out_TEmitted?: TEmitted;
};

export type NoRequiredParams<T extends ParameterizedObject> = T extends any
  ? undefined extends T['params']
    ? T['type']
    : never
  : never;

export type ConditionalRequired<
  T,
  Condition extends boolean
> = Condition extends true ? Required<T> : T;

export type WithDynamicParams<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  T extends ParameterizedObject
> = T extends any
  ? ConditionalRequired<
      {
        type: T['type'];
        params?:
          | T['params']
          | (({
              context,
              event
            }: {
              context: TContext;
              event: TExpressionEvent;
            }) => T['params']);
      },
      undefined extends T['params'] ? false : true
    >
  : never;

export type Action<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject
> =
  // TODO: consider merging `NoRequiredParams` and `WithDynamicParams` into one
  // this way we could iterate over `TAction` (and `TGuard` in the `Guard` type) once and not twice
  | NoRequiredParams<TAction>
  | WithDynamicParams<TContext, TExpressionEvent, TAction>
  | ActionFunction<
      TContext,
      TExpressionEvent,
      TEvent,
      TParams,
      TActor,
      TAction,
      TGuard,
      TDelay,
      TEmitted
    >;

export type SingleOrArray<T> = readonly T[] | T;

export type Actions<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject
> = SingleOrArray<
  Action<
    TContext,
    TExpressionEvent,
    TEvent,
    TParams,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >
>;

export type Delay<TDelay extends string> = TDelay | number;

export type MetaObject = Record<string, any>;

export type TransitionTarget = SingleOrArray<string>;

export interface TransitionConfig<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject = EventObject,
  TMeta extends MetaObject = MetaObject
> {
  guard?: Guard<TContext, TExpressionEvent, undefined, TGuard>;
  actions?: Actions<
    TContext,
    TExpressionEvent,
    TEvent,
    undefined,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >;
  reenter?: boolean;
  target?: TransitionTarget | undefined;
  meta?: TMeta;
  description?: string;
}

export type TODO = any;

export type DelayedTransitions<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string
> = {
  [K in Delay<TDelay>]?:
    | string
    | SingleOrArray<
        TransitionConfig<
          TContext,
          TEvent,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TODO, // TEmitted
          TODO // TMeta
        >
      >;
};

export type StateNodesConfig<
  TContext extends MachineContext,
  TEvent extends EventObject
> = {
  [K in string]: StateNode<TContext, TEvent>;
};

export interface InitialTransitionConfig<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string
> extends TransitionConfig<
    TContext,
    TEvent,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TODO, // TEmitted
    TODO // TMeta
  > {
  target: string;
}

export type IsLiteralString<T extends string> = string extends T ? false : true;

export interface StateValueMap {
  [key: string]: StateValue | undefined;
}

export type StateValue = string | StateValueMap;

export interface AnyEventObject extends EventObject {
  [key: string]: any;
}

export type Mapper<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TResult,
  TEvent extends EventObject
> = (args: {
  context: TContext;
  event: TExpressionEvent;
  self: ActorRef<
    MachineSnapshot<
      TContext,
      TEvent,
      Record<string, AnyActorRef>, // TODO: this should be replaced with `TChildren`
      StateValue,
      string,
      unknown,
      TODO, // TMeta
      TODO // State schema
    >,
    TEvent,
    AnyEventObject
  >;
}) => TResult;

export type TransitionConfigTarget = string | undefined;

export type TransitionConfigOrTarget<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject,
  TMeta extends MetaObject
> = SingleOrArray<
  | TransitionConfigTarget
  | TransitionConfig<
      TContext,
      TExpressionEvent,
      TEvent,
      TActor,
      TAction,
      TGuard,
      TDelay,
      TEmitted,
      TMeta
    >
>;

export interface DoneActorEvent<TOutput = unknown, TId extends string = string>
  extends EventObject {
  type: `xstate.done.actor.${TId}`;
  output: TOutput;
  actorId: TId;
}

export interface ErrorActorEvent<
  TErrorData = unknown,
  TId extends string = string
> extends EventObject {
  type: `xstate.error.actor.${TId}`;
  error: TErrorData;
  actorId: TId;
}

export interface SnapshotEvent<
  TSnapshot extends Snapshot<unknown> = Snapshot<unknown>
> extends EventObject {
  type: `xstate.snapshot.${string}`;
  snapshot: TSnapshot;
}

export type SnapshotFrom<T> =
  ReturnTypeOrValue<T> extends infer R
    ? R extends ActorRef<infer TSnapshot, infer _, infer __>
      ? TSnapshot
      : R extends Actor<infer TLogic>
        ? SnapshotFrom<TLogic>
        : R extends ActorLogic<
              infer _TSnapshot,
              infer _TEvent,
              infer _TInput,
              infer _TEmitted,
              infer _TSystem
            >
          ? ReturnType<R['transition']>
          : R extends ActorScope<
                infer TSnapshot,
                infer _TEvent,
                infer _TEmitted,
                infer _TSystem
              >
            ? TSnapshot
            : never
    : never;

export type RequiredActorOptions<TActor extends ProvidedActor> =
  | (undefined extends TActor['id'] ? never : 'id')
  | (undefined extends InputFrom<TActor['logic']> ? never : 'input');

export type DistributeActors<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject,
  TMeta extends MetaObject,
  TSpecificActor extends ProvidedActor
> = TSpecificActor extends { src: infer TSrc }
  ?
      | Compute<
          {
            systemId?: string;
            /** The source of the machine to be invoked, or the machine itself. */
            src: TSrc;

            /**
             * The unique identifier for the invoked machine. If not specified,
             * this will be the machine's own `id`, or the URL (from `src`).
             */
            id?: TSpecificActor['id'];

            // TODO: currently we do not enforce required inputs here
            // in a sense, we shouldn't - they could be provided within the `implementations` object
            // how do we verify if the required input has been provided?
            input?:
              | Mapper<
                  TContext,
                  TEvent,
                  InputFrom<TSpecificActor['logic']>,
                  TEvent
                >
              | InputFrom<TSpecificActor['logic']>;
            /**
             * The transition to take upon the invoked child machine reaching
             * its final top-level state.
             */
            onDone?:
              | string
              | SingleOrArray<
                  TransitionConfigOrTarget<
                    TContext,
                    DoneActorEvent<OutputFrom<TSpecificActor['logic']>>,
                    TEvent,
                    TActor,
                    TAction,
                    TGuard,
                    TDelay,
                    TEmitted,
                    TMeta
                  >
                >;
            /**
             * The transition to take upon the invoked child machine sending an
             * error event.
             */
            onError?:
              | string
              | SingleOrArray<
                  TransitionConfigOrTarget<
                    TContext,
                    ErrorActorEvent,
                    TEvent,
                    TActor,
                    TAction,
                    TGuard,
                    TDelay,
                    TEmitted,
                    TMeta
                  >
                >;

            onSnapshot?:
              | string
              | SingleOrArray<
                  TransitionConfigOrTarget<
                    TContext,
                    SnapshotEvent<SnapshotFrom<TSpecificActor['logic']>>,
                    TEvent,
                    TActor,
                    TAction,
                    TGuard,
                    TDelay,
                    TEmitted,
                    TMeta
                  >
                >;
          } & { [K in RequiredActorOptions<TSpecificActor>]: unknown }
        >
      | {
          id?: never;
          systemId?: string;
          src: AnyActorLogic;
          input?:
            | Mapper<TContext, TEvent, NonReducibleUnknown, TEvent>
            | NonReducibleUnknown;
          onDone?:
            | string
            | SingleOrArray<
                TransitionConfigOrTarget<
                  TContext,
                  DoneActorEvent<unknown>,
                  TEvent,
                  TActor,
                  TAction,
                  TGuard,
                  TDelay,
                  TEmitted,
                  TMeta
                >
              >;
          onError?:
            | string
            | SingleOrArray<
                TransitionConfigOrTarget<
                  TContext,
                  ErrorActorEvent,
                  TEvent,
                  TActor,
                  TAction,
                  TGuard,
                  TDelay,
                  TEmitted,
                  TMeta
                >
              >;

          onSnapshot?:
            | string
            | SingleOrArray<
                TransitionConfigOrTarget<
                  TContext,
                  SnapshotEvent,
                  TEvent,
                  TActor,
                  TAction,
                  TGuard,
                  TDelay,
                  TEmitted,
                  TMeta
                >
              >;
        }
  : never;

export type InvokeConfig<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject,
  TMeta extends MetaObject
> =
  IsLiteralString<TActor['src']> extends true
    ? DistributeActors<
        TContext,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TEmitted,
        TMeta,
        TActor
      >
    : {
        /**
         * The unique identifier for the invoked machine. If not specified, this
         * will be the machine's own `id`, or the URL (from `src`).
         */
        id?: string;

        systemId?: string;
        /** The source of the machine to be invoked, or the machine itself. */
        src: AnyActorLogic | string; // TODO: fix types

        input?:
          | Mapper<TContext, TEvent, NonReducibleUnknown, TEvent>
          | NonReducibleUnknown;
        /**
         * The transition to take upon the invoked child machine reaching its
         * final top-level state.
         */
        onDone?:
          | string
          | SingleOrArray<
              TransitionConfigOrTarget<
                TContext,
                DoneActorEvent<any>, // TODO: consider replacing with `unknown`
                TEvent,
                TActor,
                TAction,
                TGuard,
                TDelay,
                TEmitted,
                TMeta
              >
            >;
        /**
         * The transition to take upon the invoked child machine sending an
         * error event.
         */
        onError?:
          | string
          | SingleOrArray<
              TransitionConfigOrTarget<
                TContext,
                ErrorActorEvent,
                TEvent,
                TActor,
                TAction,
                TGuard,
                TDelay,
                TEmitted,
                TMeta
              >
            >;

        onSnapshot?:
          | string
          | SingleOrArray<
              TransitionConfigOrTarget<
                TContext,
                SnapshotEvent,
                TEvent,
                TActor,
                TAction,
                TGuard,
                TDelay,
                TEmitted,
                TMeta
              >
            >;
      };

export type PartialEventDescriptor<TEventType extends string> =
  TEventType extends `${infer TLeading}.${infer TTail}`
    ? `${TLeading}.*` | `${TLeading}.${PartialEventDescriptor<TTail>}`
    : never;

export type EventDescriptor<TEvent extends EventObject> =
  | TEvent['type']
  | PartialEventDescriptor<TEvent['type']>
  | '*';

export type NormalizeDescriptor<TDescriptor extends string> = TDescriptor extends '*'
  ? string
  : TDescriptor extends `${infer TLeading}.*`
    ? `${TLeading}.${string}`
    : TDescriptor;

export type EventDescriptorMatches<
  TEventType extends string,
  TNormalizedDescriptor
> = TEventType extends TNormalizedDescriptor ? true : false;

export type ExtractEvent<
  TEvent extends EventObject,
  TDescriptor extends EventDescriptor<TEvent>
> = string extends TEvent['type']
  ? TEvent
  : NormalizeDescriptor<TDescriptor> extends infer TNormalizedDescriptor
    ? TEvent extends any
      ? // true is the check type here to match both true and boolean
        true extends EventDescriptorMatches<
          TEvent['type'],
          TNormalizedDescriptor
        >
        ? TEvent
        : never
      : never
    : never;

export type TransitionsConfig<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject,
  TMeta extends MetaObject
> = {
  [K in EventDescriptor<TEvent>]?: TransitionConfigOrTarget<
    TContext,
    ExtractEvent<TEvent, K>,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted,
    TMeta
  >;
};

export interface DoneStateEvent<TOutput = unknown> extends EventObject {
  type: `xstate.done.state.${string}`;
  output: TOutput;
}

export interface RouteTransitionConfig<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject
> {
  guard?: Guard<TContext, TExpressionEvent, undefined, TGuard>;
  actions?: Actions<
    TContext,
    TExpressionEvent,
    TEvent,
    undefined,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >;
  meta?: Record<string, any>;
  description?: string;
}

export interface StateNodeConfig<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TTag extends string,
  _TOutput,
  TEmitted extends EventObject,
  TMeta extends MetaObject
> {
  /** The initial state transition. */
  initial?:
    | InitialTransitionConfig<TContext, TEvent, TActor, TAction, TGuard, TDelay>
    | string
    | undefined;
  /**
   * The type of this state node:
   *
   * - `'atomic'` - no child state nodes
   * - `'compound'` - nested child state nodes (XOR)
   * - `'parallel'` - orthogonal nested child state nodes (AND)
   * - `'history'` - history state node
   * - `'final'` - final state node
   */
  type?: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
  /**
   * Indicates whether the state node is a history state node, and what type of
   * history: shallow, deep, true (shallow), false (none), undefined (none)
   */
  history?: 'shallow' | 'deep' | boolean | undefined;
  /**
   * The mapping of state node keys to their state node configurations
   * (recursive).
   */
  states?:
    | StatesConfig<
        TContext,
        TEvent,
        TActor,
        TAction,
        TGuard,
        TDelay,
        TTag,
        NonReducibleUnknown,
        TEmitted,
        TMeta
      >
    | undefined;
  /**
   * The services to invoke upon entering this state node. These services will
   * be stopped upon exiting this state node.
   */
  invoke?: SingleOrArray<
    InvokeConfig<
      TContext,
      TEvent,
      TActor,
      TAction,
      TGuard,
      TDelay,
      TEmitted,
      TMeta
    >
  >;
  /** The mapping of event types to their potential transition(s). */
  on?: TransitionsConfig<
    TContext,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted,
    TMeta
  >;
  /** The action(s) to be executed upon entering the state node. */
  entry?: Actions<
    TContext,
    TEvent,
    TEvent,
    undefined,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >;
  /** The action(s) to be executed upon exiting the state node. */
  exit?: Actions<
    TContext,
    TEvent,
    TEvent,
    undefined,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >;
  /**
   * The potential transition(s) to be taken upon reaching a final child state
   * node.
   *
   * This is equivalent to defining a `[done(id)]` transition on this state
   * node's `on` property.
   */
  onDone?:
    | string
    | SingleOrArray<
        TransitionConfig<
          TContext,
          DoneStateEvent,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TEmitted,
          TMeta
        >
      >
    | undefined;
  /**
   * The mapping (or array) of delays (in milliseconds) to their potential
   * transition(s). The delayed transitions are taken after the specified delay
   * in an interpreter.
   */
  after?: DelayedTransitions<TContext, TEvent, TActor, TAction, TGuard, TDelay>;

  /**
   * An eventless transition that is always taken when this state node is
   * active.
   */
  always?: TransitionConfigOrTarget<
    TContext,
    TEvent,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted,
    TMeta
  >;
  parent?: StateNode<TContext, TEvent>;
  /**
   * The meta data associated with this state node, which will be returned in
   * State instances.
   */
  meta?: TMeta;
  /**
   * The output data sent with the "xstate.done.state._id_" event if this is a
   * final state node.
   *
   * The output data will be evaluated with the current `context` and placed on
   * the `.data` property of the event.
   */
  output?: Mapper<TContext, TEvent, unknown, TEvent> | NonReducibleUnknown;
  /**
   * The unique ID of the state node, which can be referenced as a transition
   * target via the `#id` syntax.
   */
  id?: string | undefined;
  /**
   * The order this state node appears. Corresponds to the implicit document
   * order.
   */
  order?: number;

  /**
   * The tags for this state node, which are accumulated into the `state.tags`
   * property.
   */
  tags?: SingleOrArray<TTag>;
  /** A text description of the state node */
  description?: string;

  /** A default target for a history state */
  target?: string | undefined; // `| undefined` makes `HistoryStateNodeConfig` compatible with this interface (it extends it) under `exactOptionalPropertyTypes`
  route?: RouteTransitionConfig<
    TContext,
    TEvent,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >;
}

export type StatesConfig<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TTag extends string,
  TOutput,
  TEmitted extends EventObject,
  TMeta extends MetaObject
> = {
  [K in string]: StateNodeConfig<
    TContext,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TTag,
    TOutput,
    TEmitted,
    TMeta
  >;
};

export interface InitialTransitionDefinition<
  TContext extends MachineContext,
  TEvent extends EventObject
> extends TransitionDefinition<TContext, TEvent> {
  target: ReadonlyArray<StateNode<TContext, TEvent>>;
  guard?: never;
}

export type UnknownAction = Action<
  MachineContext,
  EventObject,
  EventObject,
  ParameterizedObject['params'] | undefined,
  ProvidedActor,
  ParameterizedObject,
  ParameterizedObject,
  string,
  EventObject
>;

export interface TransitionDefinition<
  TContext extends MachineContext,
  TEvent extends EventObject
> extends Omit<
    TransitionConfig<
      TContext,
      TEvent,
      TEvent,
      TODO,
      TODO,
      TODO,
      TODO,
      TODO, // TEmitted
      TODO // TMeta
    >,
    | 'target'
    // `guard` is correctly rejected by `extends` here and `actions` should be too
    // however, `any` passed to `TransitionConfig` as `TAction` collapses its `.actions` to `any` and it's accidentally allowed here
    // it doesn't exactly have to be incorrect, we are overriding this here anyway but it looks like a lucky accident rather than smth done on purpose
    | 'guard'
  > {
  target: ReadonlyArray<StateNode<TContext, TEvent>> | undefined;
  source: StateNode<TContext, TEvent>;
  actions: readonly UnknownAction[];
  reenter: boolean;
  guard?: UnknownGuard;
  eventType: EventDescriptor<TEvent>;
  toJSON: () => {
    target: string[] | undefined;
    source: string;
    actions: readonly UnknownAction[];
    guard?: UnknownGuard;
    eventType: EventDescriptor<TEvent>;
    meta?: Record<string, any>;
  };
}

export type TransitionDefinitionMap<
  TContext extends MachineContext,
  TEvent extends EventObject
> = {
  [K in EventDescriptor<TEvent>]: Array<
    TransitionDefinition<TContext, ExtractEvent<TEvent, K>>
  >;
};

export interface InvokeDefinition<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TEmitted extends EventObject,
  TMeta extends MetaObject
> {
  id: string;

  systemId: string | undefined;
  /** The source of the actor logic to be invoked */
  src: AnyActorLogic | string;

  input?:
    | Mapper<TContext, TEvent, NonReducibleUnknown, TEvent>
    | NonReducibleUnknown;
  /**
   * The transition to take upon the invoked child machine reaching its final
   * top-level state.
   */
  onDone?:
    | string
    | SingleOrArray<
        TransitionConfig<
          TContext,
          DoneActorEvent<unknown>,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TEmitted,
          TMeta
        >
      >;
  /**
   * The transition to take upon the invoked child machine sending an error
   * event.
   */
  onError?:
    | string
    | SingleOrArray<
        TransitionConfig<
          TContext,
          ErrorActorEvent,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TEmitted,
          TMeta
        >
      >;

  onSnapshot?:
    | string
    | SingleOrArray<
        TransitionConfig<
          TContext,
          SnapshotEvent,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TEmitted,
          TMeta
        >
      >;

  toJSON: () => Omit<
    InvokeDefinition<
      TContext,
      TEvent,
      TActor,
      TAction,
      TGuard,
      TDelay,
      TEmitted,
      TMeta
    >,
    'onDone' | 'onError' | 'toJSON'
  >;
}

export interface StateNodeDefinition<
  TContext extends MachineContext,
  TEvent extends EventObject
> {
  id: string;
  version?: string | undefined;
  key: string;
  type: 'atomic' | 'compound' | 'parallel' | 'final' | 'history';
  initial: InitialTransitionDefinition<TContext, TEvent> | undefined;
  history: boolean | 'shallow' | 'deep' | undefined;
  states: StatesDefinition<TContext, TEvent>;
  on: TransitionDefinitionMap<TContext, TEvent>;
  transitions: Array<TransitionDefinition<TContext, TEvent>>;
  // TODO: establish what a definition really is
  entry: UnknownAction[];
  exit: UnknownAction[];
  meta: any;
  order: number;
  output?: StateNodeConfig<
    TContext,
    TEvent,
    ProvidedActor,
    ParameterizedObject,
    ParameterizedObject,
    string,
    string,
    unknown,
    EventObject, // TEmitted
    any // TMeta
  >['output'];
  invoke: Array<
    InvokeDefinition<
      TContext,
      TEvent,
      TODO,
      TODO,
      TODO,
      TODO,
      TODO, // TEmitted
      TODO // TMeta
    >
  >;
  description?: string;
  tags: string[];
}

export type StatesDefinition<
  TContext extends MachineContext,
  TEvent extends EventObject
> = {
  [K in string]: StateNodeDefinition<TContext, TEvent>;
};

export interface AtomicStateNodeConfig<
  TContext extends MachineContext,
  TEvent extends EventObject
> extends StateNodeConfig<
    TContext,
    TEvent,
    TODO,
    TODO,
    TODO,
    TODO,
    TODO,
    TODO,
    TODO, // emitted
    TODO // meta
  > {
  initial?: undefined;
  parallel?: false | undefined;
  states?: undefined;
  onDone?: undefined;
}

export type SimpleOrStateNodeConfig<
  TContext extends MachineContext,
  TEvent extends EventObject
> =
  | AtomicStateNodeConfig<TContext, TEvent>
  | StateNodeConfig<
      TContext,
      TEvent,
      TODO,
      TODO,
      TODO,
      TODO,
      TODO,
      TODO,
      TODO, // emitted
      TODO // meta
    >;

export type ActionFunctionMap<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject = ParameterizedObject,
  TGuard extends ParameterizedObject = ParameterizedObject,
  TDelay extends string = string,
  TEmitted extends EventObject = EventObject
> = {
  [K in TAction['type']]?: ActionFunction<
    TContext,
    TEvent,
    TEvent,
    GetParameterizedParams<TAction extends { type: K } ? TAction : never>,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TEmitted
  >;
};

export type GuardMap<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TGuard extends ParameterizedObject
> = {
  [K in TGuard['type']]?: GuardPredicate<
    TContext,
    TEvent,
    GetParameterizedParams<TGuard extends { type: K } ? TGuard : never>,
    TGuard
  >;
};

export type DelayExpr<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject
> = (
  args: ActionArgs<TContext, TExpressionEvent, TEvent>,
  params: TParams
) => number;

export type DelayConfig<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject
> = number | DelayExpr<TContext, TExpressionEvent, TParams, TEvent>;

export type DelayFunctionMap<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TAction extends ParameterizedObject
> = Record<string, DelayConfig<TContext, TEvent, TAction['params'], TEvent>>;

export interface StateMachineTypes {
  context: MachineContext;
  events: EventObject;
  actors: ProvidedActor;
  actions: ParameterizedObject;
  guards: ParameterizedObject;
  delays: string;
  tags: string;
  emitted: EventObject;
}

export type GetConcreteByKey<
  T,
  TKey extends keyof T,
  TValue extends T[TKey]
> = T & Record<TKey, TValue>;

export type MachineImplementationsActions<TTypes extends StateMachineTypes> = {
  [K in TTypes['actions']['type']]?: ActionFunction<
    TTypes['context'],
    TTypes['events'],
    TTypes['events'],
    GetConcreteByKey<TTypes['actions'], 'type', K>['params'],
    TTypes['actors'],
    TTypes['actions'],
    TTypes['guards'],
    TTypes['delays'],
    TTypes['emitted']
  >;
};

export type MachineImplementationsActors<TTypes extends StateMachineTypes> = {
  [K in TTypes['actors']['src']]?: GetConcreteByKey<
    TTypes['actors'],
    'src',
    K
  >['logic'];
};

export type MachineImplementationsDelays<TTypes extends StateMachineTypes> = {
  [K in TTypes['delays']]?: DelayConfig<
    TTypes['context'],
    TTypes['events'],
    // delays in referenced send actions might use specific `TAction`
    // delays executed by auto-generated send actions related to after transitions won't have that
    // since they are effectively implicit inline actions
    undefined,
    TTypes['events']
  >;
};

export type MachineImplementationsGuards<TTypes extends StateMachineTypes> = {
  [K in TTypes['guards']['type']]?: Guard<
    TTypes['context'],
    TTypes['events'],
    GetConcreteByKey<TTypes['guards'], 'type', K>['params'],
    TTypes['guards']
  >;
};

export type InternalMachineImplementations<TTypes extends StateMachineTypes> = {
  actions?: MachineImplementationsActions<TTypes>;
  actors?: MachineImplementationsActors<TTypes>;
  delays?: MachineImplementationsDelays<TTypes>;
  guards?: MachineImplementationsGuards<TTypes>;
};

export type ContextFactory<
  TContext extends MachineContext,
  TActor extends ProvidedActor,
  TInput,
  TEvent extends EventObject = EventObject
> = ({
  spawn,
  input,
  self
}: {
  spawn: Spawner<TActor>;
  input: TInput;
  self: ActorRef<
    MachineSnapshot<
      TContext,
      TEvent,
      Record<string, AnyActorRef | undefined>, // TODO: this should be replaced with `TChildren`
      StateValue,
      string,
      unknown,
      TODO, // TMeta
      TODO // State schema
    >,
    TEvent,
    AnyEventObject
  >;
}) => TContext;

export type InitialContext<
  TContext extends MachineContext,
  TActor extends ProvidedActor,
  TInput,
  TEvent extends EventObject
> = TContext | ContextFactory<TContext, TActor, TInput, TEvent>;

export interface MachineOptions {
  /**
   * Maximum number of microsteps allowed before throwing an infinite loop
   * error. Defaults to `Infinity` (no limit). Set to a finite number to enable
   * infinite loop detection.
   *
   * @default Infinity
   */
  maxIterations?: number;
}

export type MachineConfig<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor = ProvidedActor,
  TAction extends ParameterizedObject = ParameterizedObject,
  TGuard extends ParameterizedObject = ParameterizedObject,
  TDelay extends string = string,
  TTag extends string = string,
  TInput = any,
  TOutput = unknown,
  TEmitted extends EventObject = EventObject,
  TMeta extends MetaObject = MetaObject
> = (Omit<
  StateNodeConfig<
    DoNotInfer<TContext>,
    DoNotInfer<TEvent>,
    DoNotInfer<TActor>,
    DoNotInfer<TAction>,
    DoNotInfer<TGuard>,
    DoNotInfer<TDelay>,
    DoNotInfer<TTag>,
    DoNotInfer<TOutput>,
    DoNotInfer<TEmitted>,
    DoNotInfer<TMeta>
  >,
  'output'
> & {
  /** The initial context (extended state) */
  /** The machine's own version. */
  version?: string;
  // TODO: make it conditionally required
  output?: Mapper<TContext, DoneStateEvent, TOutput, TEvent> | TOutput;
  /** Runtime options for machine execution. */
  options?: MachineOptions;
}) &
  (MachineContext extends TContext
    ? { context?: InitialContext<LowInfer<TContext>, TActor, TInput, TEvent> }
    : { context: InitialContext<LowInfer<TContext>, TActor, TInput, TEvent> });

export type HistoryValue<
  TContext extends MachineContext,
  TEvent extends EventObject
> = Record<string, Array<StateNode<TContext, TEvent>>>;

export type AnyStateMachine = StateMachine<
  any, // context
  any, // event
  any, // children
  any, // actor
  any, // action
  any, // guard
  any, // delay
  any, // state value
  any, // tag
  any, // input
  any, // output
  any, // emitted
  any, // TMeta
  any // TStateSchema
>;

export type StateFrom<
  T extends AnyStateMachine | ((...args: any[]) => AnyStateMachine)
> = T extends AnyStateMachine
  ? ReturnType<T['transition']>
  : T extends (...args: any[]) => AnyStateMachine
    ? ReturnType<ReturnType<T>['transition']>
    : never;

export type Transitions<
  TContext extends MachineContext,
  TEvent extends EventObject
> = Array<TransitionDefinition<TContext, TEvent>>;

export type LogExpr<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject
> = (
  args: ActionArgs<TContext, TExpressionEvent, TEvent>,
  params: TParams
) => unknown;

export type SendExpr<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TSentEvent extends EventObject,
  TEvent extends EventObject
> = (
  args: ActionArgs<TContext, TExpressionEvent, TEvent>,
  params: TParams
) => TSentEvent;

export type Assigner<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject,
  TActor extends ProvidedActor
> = (
  args: AssignArgs<TContext, TExpressionEvent, TEvent, TActor>,
  params: TParams
) => Partial<TContext>;

export type PartialAssigner<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TKey extends keyof TContext
> = (
  args: AssignArgs<TContext, TExpressionEvent, TEvent, TActor>,
  params: TParams
) => TContext[TKey];

export type PropertyAssigner<
  TContext extends MachineContext,
  TExpressionEvent extends EventObject,
  TParams extends ParameterizedObject['params'] | undefined,
  TEvent extends EventObject,
  TActor extends ProvidedActor
> = {
  [K in keyof TContext]?:
    | PartialAssigner<TContext, TExpressionEvent, TParams, TEvent, TActor, K>
    | TContext[K];
};

export type Observer<T> = {
  next?: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
};

export type ActorLogicFrom<T> =
  ReturnTypeOrValue<T> extends infer R
    ? R extends StateMachine<
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any, // TMeta
        any // TStateSchema
      >
      ? R
      : R extends Promise<infer U>
        ? PromiseActorLogic<U>
        : never
    : never;

export type ActorRefFrom<T> =
  ReturnTypeOrValue<T> extends infer R
    ? R extends StateMachine<
        infer TContext,
        infer TEvent,
        infer TChildren,
        infer _TActor,
        infer _TAction,
        infer _TGuard,
        infer _TDelay,
        infer TStateValue,
        infer TTag,
        infer _TInput,
        infer TOutput,
        infer TEmitted,
        infer TMeta,
        infer TStateSchema
      >
      ? ActorRef<
          MachineSnapshot<
            TContext,
            TEvent,
            TChildren,
            TStateValue,
            TTag,
            TOutput,
            TMeta,
            TStateSchema
          >,
          TEvent,
          TEmitted
        >
      : R extends Promise<infer U>
        ? ActorRefFrom<PromiseActorLogic<U>>
        : R extends ActorLogic<
              infer TSnapshot,
              infer TEvent,
              infer _TInput,
              infer _TSystem,
              infer TEmitted
            >
          ? ActorRef<TSnapshot, TEvent, TEmitted>
          : never
    : never;

export type EventFromLogic<TLogic extends AnyActorLogic> =
  TLogic extends ActorLogic<
    infer _TSnapshot,
    infer TEvent,
    infer _TInput,
    infer _TEmitted,
    infer _TSystem
  >
    ? TEvent
    : never;

export type EmittedFrom<TLogic extends AnyActorLogic> =
  TLogic extends ActorLogic<
    infer _TSnapshot,
    infer _TEvent,
    infer _TInput,
    infer _TSystem,
    infer TEmitted
  >
    ? TEmitted
    : never;

export type ActorRefFromLogic<T extends AnyActorLogic> = ActorRef<
  SnapshotFrom<T>,
  EventFromLogic<T>,
  EmittedFrom<T>
>;

export type InterpreterFrom<
  T extends AnyStateMachine | ((...args: any[]) => AnyStateMachine)
> =
  ReturnTypeOrValue<T> extends StateMachine<
    infer TContext,
    infer TEvent,
    infer TChildren,
    infer _TActor,
    infer _TAction,
    infer _TGuard,
    infer _TDelay,
    infer TStateValue,
    infer TTag,
    infer TInput,
    infer TOutput,
    infer TEmitted,
    infer TMeta,
    infer TStateSchema
  >
    ? Actor<
        ActorLogic<
          MachineSnapshot<
            TContext,
            TEvent,
            TChildren,
            TStateValue,
            TTag,
            TOutput,
            TMeta,
            TStateSchema
          >,
          TEvent,
          TInput,
          AnyActorSystem,
          TEmitted
        >
      >
    : never;

export interface ResolvedStateMachineTypes<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TTag extends string,
  TEmitted extends EventObject = EventObject
> {
  context: TContext;
  events: TEvent;
  actors: TActor;
  actions: TAction;
  guards: TGuard;
  delays: TDelay;
  tags: TTag;
  emitted: TEmitted;
}

export type MachineImplementationsFrom<
  T extends AnyStateMachine | ((...args: any[]) => AnyStateMachine)
> =
  ReturnTypeOrValue<T> extends StateMachine<
    infer TContext,
    infer TEvent,
    infer _TChildren,
    infer TActor,
    infer TAction,
    infer TGuard,
    infer TDelay,
    infer _TStateValue,
    infer TTag,
    infer _TInput,
    infer _TOutput,
    infer TEmitted,
    infer _TMeta,
    infer _TStateSchema
  >
    ? InternalMachineImplementations<
        ResolvedStateMachineTypes<
          TContext,
          TEvent,
          TActor,
          TAction,
          TGuard,
          TDelay,
          TTag,
          TEmitted
        >
      >
    : never;

export type ResolveEventType<T> =
  ReturnTypeOrValue<T> extends infer R
    ? R extends StateMachine<
        infer _TContext,
        infer TEvent,
        infer _TChildren,
        infer _TActor,
        infer _TAction,
        infer _TGuard,
        infer _TDelay,
        infer _TStateValue,
        infer _TTag,
        infer _TInput,
        infer _TOutput,
        infer _TEmitted,
        infer _TMeta,
        infer _TStateSchema
      >
      ? TEvent
      : R extends MachineSnapshot<
            infer _TContext,
            infer TEvent,
            infer _TChildren,
            infer _TStateValue,
            infer _TTag,
            infer _TOutput,
            infer _TMeta,
            infer _TStateSchema
          >
        ? TEvent
        : R extends ActorRef<infer _TSnapshot, infer TEvent, infer _TEmitted>
          ? TEvent
          : never
    : never;

export type EventFrom<
  T,
  K extends Prop<TEvent, 'type'> = never,
  TEvent extends EventObject = ResolveEventType<T>
> = IsNever<K> extends true ? TEvent : ExtractEvent<TEvent, K>;

export type ContextFrom<T> =
  ReturnTypeOrValue<T> extends infer R
    ? R extends StateMachine<
        infer TContext,
        infer _TEvent,
        infer _TChildren,
        infer _TActor,
        infer _TAction,
        infer _TGuard,
        infer _TDelay,
        infer _TStateValue,
        infer _TTag,
        infer _TInput,
        infer _TOutput,
        infer _TEmitted,
        infer _TMeta,
        infer _TStateSchema
      >
      ? TContext
      : R extends MachineSnapshot<
            infer TContext,
            infer _TEvent,
            infer _TChildren,
            infer _TStateValue,
            infer _TTag,
            infer _TOutput,
            infer _TMeta,
            infer _TStateSchema
          >
        ? TContext
        : R extends Actor<infer TActorLogic>
          ? TActorLogic extends StateMachine<
              infer TContext,
              infer _TEvent,
              infer _TChildren,
              infer _TActor,
              infer _TAction,
              infer _TGuard,
              infer _TDelay,
              infer _TStateValue,
              infer _TTag,
              infer _TInput,
              infer _TOutput,
              infer _TEmitted,
              infer _TMeta,
              infer _TStateSchema
            >
            ? TContext
            : never
          : never
    : never;

export type InferEvent<E extends EventObject> = {
  [T in E['type']]: { type: T } & Extract<E, { type: T }>;
}[E['type']];

export type StateValueFrom<TMachine extends AnyStateMachine> = Parameters<
  StateFrom<TMachine>['matches']
>[0];

export type TagsFrom<TMachine extends AnyStateMachine> = Parameters<
  StateFrom<TMachine>['hasTag']
>[0];

export type RequiredLogicInput<TLogic extends AnyActorLogic> =
  undefined extends InputFrom<TLogic> ? never : 'input';

export type ExtractLiteralString<T extends string | undefined> = T extends string
  ? string extends T
    ? never
    : T
  : never;

export type ToConcreteChildren<TActor extends ProvidedActor> = {
  [A in TActor as ExtractLiteralString<A['id']>]?: ActorRefFromLogic<
    A['logic']
  >;
};

export type NonConcreteActors<TActor extends ProvidedActor> = TActor extends any
  ? ExtractLiteralString<TActor['id']> extends never
    ? TActor
    : never
  : never;

export type ToChildren<TActor extends ProvidedActor> =
  // only proceed further if all configured `src`s are literal strings
  string extends TActor['src']
    ? // TODO: replace `AnyActorRef` with `UnknownActorRef`~
      // or maybe even `TActor["logic"]` since it's possible to configure `{ src: string; logic: SomeConcreteLogic }`
      // TODO: consider adding `| undefined` here
      Record<string, AnyActorRef>
    : Compute<
        ToConcreteChildren<TActor> &
          {
            include: {
              [id: string]: NonConcreteActors<TActor> extends never
                ? AnyActorRef | undefined
                : NonConcreteActors<TActor> extends any
                  ?
                      | ActorRefFromLogic<NonConcreteActors<TActor>['logic']>
                      | undefined
                  : never;
            };
            exclude: unknown;
          }[NonConcreteActors<TActor> extends never ? 'exclude' : 'include']
      >;

export type StateSchemaFrom<T extends AnyStateMachine> =
  T extends StateMachine<
    infer _TContext,
    infer _TEvent,
    infer _TChildren,
    infer _TActor,
    infer _TAction,
    infer _TGuard,
    infer _TDelay,
    infer _TStateValue,
    infer _TTag,
    infer _TInput,
    infer _TOutput,
    infer _TEmitted,
    infer _TMeta,
    infer TStateSchema
  >
    ? TStateSchema
    : never;

export type StateSchema = {
  id?: string;
  route?: unknown;
  states?: Record<string, StateSchema>;

  // Other types
  // Needed because TS treats objects with all optional properties as a "weak" object
  // https://github.com/statelyai/xstate/issues/5031
  type?: unknown;
  invoke?: unknown;
  on?: unknown;
  entry?: unknown;
  exit?: unknown;
  onDone?: unknown;
  after?: unknown;
  always?: unknown;
  meta?: unknown;
  output?: unknown;
  tags?: unknown;
  description?: unknown;
};

export type StateId<
  TSchema extends StateSchema,
  TKey extends string = '(machine)',
  TParentKey extends string | null = null
> =
  | (TSchema extends { id: string }
      ? TSchema['id']
      : TParentKey extends null
        ? TKey
        : `${TParentKey}.${TKey}`)
  | (TSchema['states'] extends Record<string, any>
      ? Values<{
          [K in keyof TSchema['states'] & string]: StateId<
            TSchema['states'][K],
            K,
            TParentKey extends string
              ? `${TParentKey}.${TKey}`
              : TSchema['id'] extends string
                ? TSchema['id']
                : TKey
          >;
        }>
      : never);

export type RoutableStateId<TSchema extends StateSchema> =
  | (TSchema extends { route: any; id: string } ? `#${TSchema['id']}` : never)
  | (TSchema['states'] extends Record<string, any>
      ? Values<{
          [K in keyof TSchema['states'] & string]: RoutableStateId<
            TSchema['states'][K]
          >;
        }>
      : never);

export type _GroupStateKeys<
  T extends StateSchema,
  S extends keyof T['states']
> = S extends any
  ? T['states'][S] extends { type: 'history' }
    ? [never, never]
    : T extends { type: 'parallel' }
      ? [S, never]
      : 'states' extends keyof T['states'][S]
        ? [S, never]
        : [never, S]
  : never;

export type GroupStateKeys<T extends StateSchema, S extends keyof T['states']> = {
  nonLeaf: _GroupStateKeys<T, S & string>[0];
  leaf: _GroupStateKeys<T, S & string>[1];
};

export type ToStateValue<T extends StateSchema> = T extends {
  states: Record<infer S, any>;
}
  ? IsNever<S> extends true
    ? {}
    :
        | GroupStateKeys<T, S>['leaf']
        | (IsNever<GroupStateKeys<T, S>['nonLeaf']> extends false
            ? T extends { type: 'parallel' }
              ? {
                  [K in GroupStateKeys<T, S>['nonLeaf']]: ToStateValue<
                    T['states'][K]
                  >;
                }
              : Compute<
                  Values<{
                    [K in GroupStateKeys<T, S>['nonLeaf']]: {
                      [StateKey in K]: ToStateValue<T['states'][K]>;
                    };
                  }>
                >
            : never)
  : {};

export interface ExecutableSpawnAction extends ExecutableActionObject {
  type: 'xstate.spawnChild';
  info: ActionArgs<MachineContext, EventObject, EventObject>;
  params: {
    id: string;
    actorRef: AnyActorRef | undefined;
    src: string | AnyActorLogic;
  };
}

export type SpecialExecutableAction =
  | ExecutableSpawnAction
  | ExecutableRaiseAction
  | ExecutableSendToAction;

export interface ToExecutableAction<T extends ParameterizedObject>
  extends ExecutableActionObject {
  type: T['type'];
  params: T['params'];
  exec: undefined;
}

export type ExecutableActionsFrom<T extends AnyActorLogic> =
  T extends StateMachine<
    infer _TContext,
    infer _TEvent,
    infer _TChildren,
    infer _TActor,
    infer TAction,
    infer _TGuard,
    infer _TDelay,
    infer _TStateValue,
    infer _TTag,
    infer _TInput,
    infer _TOutput,
    infer _TEmitted,
    infer _TMeta,
    infer _TStateSchema
  >
    ?
        | SpecialExecutableAction
        | (string extends TAction['type'] ? never : ToExecutableAction<TAction>)
    : never;
