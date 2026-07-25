/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/setup.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActionFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyActorRef<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyEventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cast<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DelayConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GuardPredicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Invert<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MachineConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MachineContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MetaObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonReducibleUnknown<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParameterizedObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RoutableStateId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateMachine<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateNodeConfig<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StateSchema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToChildren<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToStateValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnknownActorLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Values<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type action<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type assign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type cancel<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type emit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type enqueueActions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type log<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type raise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type sendTo<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type spawnChild<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type stopChild<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ToParameterizedObject<
  TParameterizedMap extends Record<
    string,
    ParameterizedObject['params'] | undefined
  >
> = Values<{
  [K in keyof TParameterizedMap as K & string]: {
    type: K & string;
    params: TParameterizedMap[K];
  };
}>;

export type ToProvidedActor<
  TChildrenMap extends Record<string, string>,
  TActors extends Record<string, UnknownActorLogic>
> = Values<{
  [K in keyof TActors as K & string]: {
    src: K & string;
    logic: TActors[K];
    id: IsNever<TChildrenMap> extends true
      ? string | undefined
      : K extends keyof Invert<TChildrenMap>
        ? Invert<TChildrenMap>[K] & string
        : string | undefined;
  };
}>;

export type ToStateSchema<TSchema extends StateSchema> = {
  -readonly [K in keyof TSchema as K & ('id' | 'states')]: K extends 'states'
    ? {
        [SK in keyof TSchema['states']]: ToStateSchema<
          NonNullable<TSchema['states'][SK]>
        >;
      }
    : TSchema[K];
};

export type RequiredSetupKeys<TChildrenMap> =
  IsNever<keyof TChildrenMap> extends true ? never : 'actors';

export type ExtractInvokeEntry<T> = T extends {
  id: infer TId extends string;
  src: infer TSrc extends string;
}
  ? { [K in TId]: TSrc }
  : {};

export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I
) => void
  ? I
  : never;

export type ExtractInvokeChildren<T> = T extends readonly (infer E)[]
  ? UnionToIntersection<ExtractInvokeEntry<E>>
  : ExtractInvokeEntry<T>;

export type ExtractConfigChildren<TConfig> = TConfig extends {
  invoke: infer TInvoke;
}
  ? ExtractInvokeChildren<TInvoke>
  : {};

export type MergeChildrenMap<
  TExplicit extends Record<string, string>,
  TInferred extends Record<string, string>
> = IsNever<keyof TExplicit> extends true ? TInferred : TExplicit;

export type SetupReturn<
  TContext extends MachineContext,
  TEvent extends AnyEventObject,
  TActors extends Record<string, UnknownActorLogic>,
  TChildrenMap extends Record<string, string>,
  TActions extends Record<string, ParameterizedObject['params'] | undefined>,
  TGuards extends Record<string, ParameterizedObject['params'] | undefined>,
  TDelay extends string,
  TTag extends string,
  TInput,
  TOutput extends NonReducibleUnknown,
  TEmitted extends EventObject,
  TMeta extends MetaObject
> = {
  extend: <
    TExtendActions extends Record<
      string,
      ParameterizedObject['params'] | undefined
    > = {},
    TExtendGuards extends Record<
      string,
      ParameterizedObject['params'] | undefined
    > = {},
    TExtendDelays extends string = never
  >({
    actions,
    guards,
    delays
  }: {
    actions?: {
      [K in keyof TExtendActions]: ActionFunction<
        TContext,
        TEvent,
        TEvent,
        TExtendActions[K],
        ToProvidedActor<TChildrenMap, TActors>,
        ToParameterizedObject<TActions & TExtendActions>,
        ToParameterizedObject<TGuards & TExtendGuards>,
        TDelay | TExtendDelays,
        TEmitted
      >;
    };
    guards?: {
      [K in keyof TExtendGuards]: GuardPredicate<
        TContext,
        TEvent,
        TExtendGuards[K],
        ToParameterizedObject<TGuards & TExtendGuards>
      >;
    };
    delays?: {
      [K in TExtendDelays]: DelayConfig<
        TContext,
        TEvent,
        ToParameterizedObject<TActions & TExtendActions>['params'],
        TEvent
      >;
    };
  }) => SetupReturn<
    TContext,
    TEvent,
    TActors,
    TChildrenMap,
    TActions & TExtendActions,
    TGuards & TExtendGuards,
    TDelay | TExtendDelays,
    TTag,
    TInput,
    TOutput,
    TEmitted,
    TMeta
  >;
  /**
   * Creates a state config that is strongly typed. This state config can be
   * used to create a machine.
   *
   * @example
   *
   * ```ts
   * const lightMachineSetup = setup({
   *   // ...
   * });
   *
   * const green = lightMachineSetup.createStateConfig({
   *   on: {
   *     timer: {
   *       actions: 'doSomething'
   *     }
   *   }
   * });
   *
   * const machine = lightMachineSetup.createMachine({
   *   initial: 'green',
   *   states: {
   *     green,
   *     yellow,
   *     red
   *   }
   * });
   * ```
   */
  createStateConfig: <
    TStateConfig extends StateNodeConfig<
      TContext,
      TEvent,
      ToProvidedActor<TChildrenMap, TActors>,
      ToParameterizedObject<TActions>,
      ToParameterizedObject<TGuards>,
      TDelay,
      TTag,
      unknown,
      TEmitted,
      TMeta
    >
  >(
    config: TStateConfig
  ) => TStateConfig;
  /**
   * Creates a type-safe action.
   *
   * @example
   *
   * ```ts
   * const machineSetup = setup({
   *   // ...
   * });
   *
   * const action = machineSetup.createAction(({ context, event }) => {
   *   console.log(context.count, event.value);
   * });
   *
   * const incrementAction = machineSetup.createAction(
   *   assign({ count: ({ context }) => context.count + 1 })
   * );
   *
   * const machine = machineSetup.createMachine({
   *   context: { count: 0 },
   *   entry: [action, incrementAction]
   * });
   * ```
   */
  createAction: (
    action: ActionFunction<
      TContext,
      TEvent,
      TEvent,
      unknown,
      ToProvidedActor<TChildrenMap, TActors>,
      ToParameterizedObject<TActions>,
      ToParameterizedObject<TGuards>,
      TDelay,
      TEmitted
    >
  ) => typeof action;

  createMachine: <
    const TConfig extends MachineConfig<
      TContext,
      TEvent,
      ToProvidedActor<TChildrenMap, TActors>,
      ToParameterizedObject<TActions>,
      ToParameterizedObject<TGuards>,
      TDelay,
      TTag,
      TInput,
      TOutput,
      TEmitted,
      TMeta
    >,
    TResolvedChildren extends Record<string, string> = MergeChildrenMap<
      TChildrenMap,
      Cast<ExtractConfigChildren<TConfig>, Record<string, string>>
    >
  >(
    config: TConfig
  ) => StateMachine<
    TContext,
    | TEvent
    | ([RoutableStateId<TConfig>] extends [never]
        ? never
        : {
            type: 'xstate.route';
            to: RoutableStateId<TConfig>;
          }),
    Cast<
      ToChildren<ToProvidedActor<TResolvedChildren, TActors>>,
      Record<string, AnyActorRef | undefined>
    >,
    ToProvidedActor<TResolvedChildren, TActors>,
    ToParameterizedObject<TActions>,
    ToParameterizedObject<TGuards>,
    TDelay,
    ToStateValue<TConfig>,
    TTag,
    TInput,
    TOutput,
    TEmitted,
    TMeta,
    ToStateSchema<TConfig>
  >;

  assign: typeof assign<
    TContext,
    TEvent,
    undefined,
    TEvent,
    ToProvidedActor<TChildrenMap, TActors>
  >;
  sendTo: <TTargetActor extends AnyActorRef>(
    ...args: Parameters<
      typeof sendTo<
        TContext,
        TEvent,
        undefined,
        TTargetActor,
        TEvent,
        TDelay,
        TDelay
      >
    >
  ) => ReturnType<
    typeof sendTo<
      TContext,
      TEvent,
      undefined,
      TTargetActor,
      TEvent,
      TDelay,
      TDelay
    >
  >;
  raise: typeof raise<TContext, TEvent, TEvent, undefined, TDelay, TDelay>;
  log: typeof log<TContext, TEvent, undefined, TEvent>;
  cancel: typeof cancel<TContext, TEvent, undefined, TEvent>;
  stopChild: typeof stopChild<TContext, TEvent, undefined, TEvent>;
  enqueueActions: typeof enqueueActions<
    TContext,
    TEvent,
    undefined,
    TEvent,
    ToProvidedActor<TChildrenMap, TActors>,
    ToParameterizedObject<TActions>,
    ToParameterizedObject<TGuards>,
    TDelay,
    TEmitted
  >;
  emit: typeof emit<TContext, TEvent, undefined, TEvent, TEmitted>;
  spawnChild: typeof spawnChild<
    TContext,
    TEvent,
    undefined,
    TEvent,
    ToProvidedActor<TChildrenMap, TActors>
  >;
};
