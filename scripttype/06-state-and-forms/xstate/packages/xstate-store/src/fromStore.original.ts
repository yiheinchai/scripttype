/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/xstate-store/src/fromStore.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ActorLogic<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EnqueueObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventObject<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EventPayloadMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractEvents<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferSchemaPayloadMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NoInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveStoreContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveStoreEmittedPayloadMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardSchemaMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StandardSchemaV1<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreSchemas<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StoreSnapshot<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TransitionsFromEventPayloadMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type StoreLogic<
  TContext extends StoreContext,
  TEvent extends EventObject,
  TInput,
  TEmitted extends EventObject
> = ActorLogic<StoreSnapshot<TContext>, TEvent, TInput, any, TEmitted>;

export type FromStoreEmittedEvents<
  TEmittedPayloadMap extends EventPayloadMap,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = ExtractEvents<
  ResolveStoreEmittedPayloadMap<TEmittedPayloadMap, TEmittedSchemaMap>
>;

export type InferredEventPayloadMap<
  TTransitions extends Record<string, (...args: any[]) => any>
> = {
  [K in keyof TTransitions & string]: TTransitions[K] extends (
    context: any,
    event: infer TEvent,
    ...args: any[]
  ) => any
    ? Omit<TEvent, 'type'>
    : {};
};

export type InferredFromStoreTransitions<
  TContext extends StoreContext,
  TTransitions extends Record<string, (...args: any[]) => any>,
  TEmittedPayloadMap extends EventPayloadMap,
  TContextSchema extends StandardSchemaV1 | undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = Record<
  string,
  (
    context: NoInfer<ResolveStoreContext<TContext, TContextSchema>>,
    event: any,
    enq: EnqueueObject<
      ResolveStoreContext<TContext, TContextSchema>,
      FromStoreEmittedEvents<TEmittedPayloadMap, TEmittedSchemaMap>,
      InferredEventPayloadMap<TTransitions>
    >
  ) => ResolveStoreContext<TContext, TContextSchema> | void
>;

export type SchemaFromStoreTransitions<
  TContext extends StoreContext,
  TEventSchemaMap extends StandardSchemaMap,
  TEmittedPayloadMap extends EventPayloadMap,
  TContextSchema extends StandardSchemaV1 | undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = TransitionsFromEventPayloadMap<
  InferSchemaPayloadMap<TEventSchemaMap>,
  NoInfer<ResolveStoreContext<TContext, TContextSchema>>,
  FromStoreEmittedEvents<TEmittedPayloadMap, TEmittedSchemaMap>
>;

export type FromStoreValueConfig<
  TContext extends StoreContext,
  TTransitions extends Record<string, (...args: any[]) => any>,
  TEmittedPayloadMap extends EventPayloadMap,
  TContextSchema extends StandardSchemaV1 | undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = {
  context: ResolveStoreContext<TContext, TContextSchema>;
  schemas?: StoreSchemas<TContextSchema, undefined, TEmittedSchemaMap>;
  on: TTransitions &
    InferredFromStoreTransitions<
      TContext,
      TTransitions,
      TEmittedPayloadMap,
      TContextSchema,
      TEmittedSchemaMap
    >;
};

export type FromStoreInputConfig<
  TContext extends StoreContext,
  TTransitions extends Record<string, (...args: any[]) => any>,
  TInput,
  TEmittedPayloadMap extends EventPayloadMap,
  TContextSchema extends StandardSchemaV1 | undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = {
  context: (input: TInput) => ResolveStoreContext<TContext, TContextSchema>;
  schemas?: StoreSchemas<TContextSchema, undefined, TEmittedSchemaMap>;
  on: TTransitions &
    InferredFromStoreTransitions<
      TContext,
      TTransitions,
      TEmittedPayloadMap,
      TContextSchema,
      TEmittedSchemaMap
    >;
};

export type SchemaFromStoreValueConfig<
  TContext extends StoreContext,
  TEventSchemaMap extends StandardSchemaMap,
  TEmittedPayloadMap extends EventPayloadMap,
  TContextSchema extends StandardSchemaV1 | undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = {
  context: ResolveStoreContext<TContext, TContextSchema>;
  schemas: StoreSchemas<TContextSchema, TEventSchemaMap, TEmittedSchemaMap> & {
    events: TEventSchemaMap;
  };
  on: SchemaFromStoreTransitions<
    TContext,
    TEventSchemaMap,
    TEmittedPayloadMap,
    TContextSchema,
    TEmittedSchemaMap
  >;
};

export type SchemaFromStoreInputConfig<
  TContext extends StoreContext,
  TEventSchemaMap extends StandardSchemaMap,
  TInput,
  TEmittedPayloadMap extends EventPayloadMap,
  TContextSchema extends StandardSchemaV1 | undefined,
  TEmittedSchemaMap extends StandardSchemaMap | undefined
> = {
  context: (input: TInput) => ResolveStoreContext<TContext, TContextSchema>;
  schemas: StoreSchemas<TContextSchema, TEventSchemaMap, TEmittedSchemaMap> & {
    events: TEventSchemaMap;
  };
  on: SchemaFromStoreTransitions<
    TContext,
    TEventSchemaMap,
    TEmittedPayloadMap,
    TContextSchema,
    TEmittedSchemaMap
  >;
};
