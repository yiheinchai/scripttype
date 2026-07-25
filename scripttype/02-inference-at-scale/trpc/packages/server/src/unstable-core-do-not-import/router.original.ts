/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/router.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRootTypes<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ErrorHandlerOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LegacyObservableSubscriptionProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MaybePromise<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Observable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RootConfig<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TRPCError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferProcedureInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferProcedureOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type DecorateProcedure<TProcedure extends AnyProcedure> = (
  input: inferProcedureInput<TProcedure>,
) => Promise<
  TProcedure['_def']['type'] extends 'subscription'
    ? TProcedure extends LegacyObservableSubscriptionProcedure<any>
      ? Observable<inferProcedureOutput<TProcedure>, TRPCError>
      : inferProcedureOutput<TProcedure>
    : inferProcedureOutput<TProcedure>
>;

export interface RouterRecord {
  [key: string]: AnyProcedure | RouterRecord;
}

export type DecorateRouterRecord<TRecord extends RouterRecord> = {
  [TKey in keyof TRecord]: TRecord[TKey] extends infer $Value
    ? $Value extends AnyProcedure
      ? DecorateProcedure<$Value>
      : $Value extends RouterRecord
        ? DecorateRouterRecord<$Value>
        : never
    : never;
};

export type RouterCallerErrorHandler<TContext> = (
  opts: ErrorHandlerOptions<TContext>,
) => void;

export type RouterCaller<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = (
  /**
   * @note
   * If passing a function, we recommend it's a cached function
   * e.g. wrapped in `React.cache` to avoid unnecessary computations
   */
  ctx: TRoot['ctx'] | (() => MaybePromise<TRoot['ctx']>),
  options?: {
    onError?: RouterCallerErrorHandler<TRoot['ctx']>;
    signal?: AbortSignal;
  },
) => DecorateRouterRecord<TRecord>;

export type Lazy<TAny> = (() => Promise<TAny>) & { [lazyMarker]: true };

export type LazyLoader<TAny> = {
  load: () => Promise<void>;
  ref: Lazy<TAny>;
};

export type AnyRouter = Router<any, any>;

export interface RouterDef<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> {
  _config: RootConfig<TRoot>;
  router: true;
  procedure?: never;
  procedures: TRecord;
  record: TRecord;
  lazy: Record<string, LazyLoader<AnyRouter>>;
}

export interface Router<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> {
  _def: RouterDef<TRoot, TRecord>;
  /**
   * @see https://trpc.io/docs/v11/server/server-side-calls
   */
  createCaller: RouterCaller<TRoot, TRecord>;
}

export type BuiltRouter<
  TRoot extends AnyRootTypes,
  TRecord extends RouterRecord,
> = Router<TRoot, TRecord> & TRecord;

export type inferRouterRootTypes<TRouter extends AnyRouter> =
  TRouter['_def']['_config']['$types'];

export type inferRouterContext<TRouter extends AnyRouter> =
  inferRouterRootTypes<TRouter>['ctx'];

export type inferRouterError<TRouter extends AnyRouter> =
  inferRouterRootTypes<TRouter>['errorShape'];

export type inferRouterMeta<TRouter extends AnyRouter> =
  inferRouterRootTypes<TRouter>['meta'];

export type CreateRouterOptions = {
  [key: string]:
    | AnyProcedure
    | AnyRouter
    | CreateRouterOptions
    | Lazy<AnyRouter>;
};

export type DecorateCreateRouterOptions<
  TRouterOptions extends CreateRouterOptions,
> = {
  [K in keyof TRouterOptions]: TRouterOptions[K] extends infer $Value
    ? $Value extends AnyProcedure
      ? $Value
      : $Value extends Router<any, infer TRecord>
        ? TRecord
        : $Value extends Lazy<Router<any, infer TRecord>>
          ? TRecord
          : $Value extends CreateRouterOptions
            ? DecorateCreateRouterOptions<$Value>
            : never
    : never;
};

export type MergeRouters<
  TRouters extends AnyRouter[],
  TRoot extends AnyRootTypes = TRouters[0]['_def']['_config']['$types'],
  TRecord extends RouterRecord = {},
> = TRouters extends [
  infer Head extends AnyRouter,
  ...infer Tail extends AnyRouter[],
]
  ? MergeRouters<Tail, TRoot, Head['_def']['record'] & TRecord>
  : BuiltRouter<TRoot, TRecord>;
