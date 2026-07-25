/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/unstable-core-do-not-import/procedureBuilder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyMiddlewareFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AsyncIterable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type GetRawInputFn<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LegacyObservableSubscriptionProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MaybePromise<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MiddlewareBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MiddlewareFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type MutationProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Observable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Overwrite<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Parser<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ProcedureType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type QueryProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SubscriptionProcedure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypeError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnsetMarker<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferObservableValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferParser<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type inferTrackedOutput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type IntersectIfDefined<TType, TWith> = TType extends UnsetMarker
  ? TWith
  : TWith extends UnsetMarker
    ? TType
    : Simplify<TType & TWith>;

export type DefaultValue<TValue, TFallback> = TValue extends UnsetMarker
  ? TFallback
  : TValue;

export type inferAsyncIterable<TOutput> =
  TOutput extends AsyncIterable<infer $Yield, infer $Return, infer $Next>
    ? {
        yield: $Yield;
        return: $Return;
        next: $Next;
      }
    : never;

export type inferSubscriptionOutput<TOutput> =
  TOutput extends AsyncIterable<any>
    ? AsyncIterable<
        inferTrackedOutput<inferAsyncIterable<TOutput>['yield']>,
        inferAsyncIterable<TOutput>['return'],
        inferAsyncIterable<TOutput>['next']
      >
    : TypeError<'Subscription output could not be inferred'>;

export interface ProcedureCallOptions<TContext> {
  ctx: TContext;
  getRawInput: GetRawInputFn;
  input?: unknown;
  path: string;
  type: ProcedureType;
  signal: AbortSignal | undefined;
  /**
   * The index of this call in a batch request.
   */
  batchIndex: number;
}

export type CallerOverride<TContext> = (opts: {
  args: unknown[];
  invoke: (opts: ProcedureCallOptions<TContext>) => Promise<unknown>;
  _def: AnyProcedure['_def'];
}) => Promise<unknown>;

export interface ProcedureResolverOptions<
  TContext,
  _TMeta,
  TContextOverridesIn,
  TInputOut,
> {
  ctx: Simplify<Overwrite<TContext, TContextOverridesIn>>;
  input: TInputOut extends UnsetMarker ? undefined : TInputOut;
  /**
   * The AbortSignal of the request
   */
  signal: AbortSignal | undefined;
  /**
   * The path of the procedure
   */
  path: string;
  /**
   * The index of this call in a batch request.
   * Will be set when the procedure is called as part of a batch.
   */
  batchIndex?: number;
}

export type ProcedureBuilderResolver = (
  opts: ProcedureResolverOptions<any, any, any, any>,
) => Promise<unknown>;

export type ProcedureBuilderDef<TMeta> = {
  procedure: true;
  inputs: Parser[];
  output?: Parser;
  meta?: TMeta;
  resolver?: ProcedureBuilderResolver;
  middlewares: AnyMiddlewareFunction[];
  /**
   * @deprecated use `type` instead
   */
  mutation?: boolean;
  /**
   * @deprecated use `type` instead
   */
  query?: boolean;
  /**
   * @deprecated use `type` instead
   */
  subscription?: boolean;
  type?: ProcedureType;
  caller?: CallerOverride<unknown>;
};

export type ProcedureResolver<
  TContext,
  TMeta,
  TContextOverrides,
  TInputOut,
  TOutputParserIn,
  $Output,
> = (
  opts: ProcedureResolverOptions<TContext, TMeta, TContextOverrides, TInputOut>,
) => MaybePromise<
  // If an output parser is defined, we need to return what the parser expects, otherwise we return the inferred type
  DefaultValue<TOutputParserIn, $Output>
>;

export interface ProcedureBuilder<
  TContext,
  TMeta,
  TContextOverrides,
  TInputIn,
  TInputOut,
  TOutputIn,
  TOutputOut,
  TCaller extends boolean,
> {
  /**
   * Add an input parser to the procedure.
   * @see https://trpc.io/docs/v11/server/validators
   */
  input<$Parser extends Parser>(
    schema: TInputOut extends UnsetMarker
      ? $Parser
      : inferParser<$Parser>['out'] extends Record<string, unknown> | undefined
        ? TInputOut extends Record<string, unknown> | undefined
          ? undefined extends inferParser<$Parser>['out'] // if current is optional the previous must be too
            ? undefined extends TInputOut
              ? $Parser
              : TypeError<'Cannot chain an optional parser to a required parser'>
            : $Parser
          : TypeError<'All input parsers did not resolve to an object'>
        : TypeError<'All input parsers did not resolve to an object'>,
  ): ProcedureBuilder<
    TContext,
    TMeta,
    TContextOverrides,
    IntersectIfDefined<TInputIn, inferParser<$Parser>['in']>,
    IntersectIfDefined<TInputOut, inferParser<$Parser>['out']>,
    TOutputIn,
    TOutputOut,
    TCaller
  >;
  /**
   * Add an output parser to the procedure.
   * @see https://trpc.io/docs/v11/server/validators
   */
  output<$Parser extends Parser>(
    schema: $Parser,
  ): ProcedureBuilder<
    TContext,
    TMeta,
    TContextOverrides,
    TInputIn,
    TInputOut,
    IntersectIfDefined<TOutputIn, inferParser<$Parser>['in']>,
    IntersectIfDefined<TOutputOut, inferParser<$Parser>['out']>,
    TCaller
  >;
  /**
   * Add a meta data to the procedure.
   * @see https://trpc.io/docs/v11/server/metadata
   */
  meta(
    meta: TMeta,
  ): ProcedureBuilder<
    TContext,
    TMeta,
    TContextOverrides,
    TInputIn,
    TInputOut,
    TOutputIn,
    TOutputOut,
    TCaller
  >;
  /**
   * Add a middleware to the procedure.
   * @see https://trpc.io/docs/v11/server/middlewares
   */
  use<$ContextOverridesOut>(
    fn:
      | MiddlewareBuilder<
          Overwrite<TContext, TContextOverrides>,
          TMeta,
          $ContextOverridesOut,
          TInputOut
        >
      | MiddlewareFunction<
          TContext,
          TMeta,
          TContextOverrides,
          $ContextOverridesOut,
          TInputOut
        >,
  ): ProcedureBuilder<
    TContext,
    TMeta,
    Overwrite<TContextOverrides, $ContextOverridesOut>,
    TInputIn,
    TInputOut,
    TOutputIn,
    TOutputOut,
    TCaller
  >;

  /**
   * @deprecated use {@link concat} instead
   */
  unstable_concat<
    $Context,
    $Meta,
    $ContextOverrides,
    $InputIn,
    $InputOut,
    $OutputIn,
    $OutputOut,
  >(
    builder: Overwrite<TContext, TContextOverrides> extends $Context
      ? TMeta extends $Meta
        ? ProcedureBuilder<
            $Context,
            $Meta,
            $ContextOverrides,
            $InputIn,
            $InputOut,
            $OutputIn,
            $OutputOut,
            TCaller
          >
        : TypeError<'Meta mismatch'>
      : TypeError<'Context mismatch'>,
  ): ProcedureBuilder<
    TContext,
    TMeta,
    Overwrite<TContextOverrides, $ContextOverrides>,
    IntersectIfDefined<TInputIn, $InputIn>,
    IntersectIfDefined<TInputOut, $InputOut>,
    IntersectIfDefined<TOutputIn, $OutputIn>,
    IntersectIfDefined<TOutputOut, $OutputOut>,
    TCaller
  >;

  /**
   * Combine two procedure builders
   */
  concat<
    $Context,
    $Meta,
    $ContextOverrides,
    $InputIn,
    $InputOut,
    $OutputIn,
    $OutputOut,
  >(
    builder: Overwrite<TContext, TContextOverrides> extends $Context
      ? TMeta extends $Meta
        ? ProcedureBuilder<
            $Context,
            $Meta,
            $ContextOverrides,
            $InputIn,
            $InputOut,
            $OutputIn,
            $OutputOut,
            TCaller
          >
        : TypeError<'Meta mismatch'>
      : TypeError<'Context mismatch'>,
  ): ProcedureBuilder<
    TContext,
    TMeta,
    Overwrite<TContextOverrides, $ContextOverrides>,
    IntersectIfDefined<TInputIn, $InputIn>,
    IntersectIfDefined<TInputOut, $InputOut>,
    IntersectIfDefined<TOutputIn, $OutputIn>,
    IntersectIfDefined<TOutputOut, $OutputOut>,
    TCaller
  >;
  /**
   * Query procedure
   * @see https://trpc.io/docs/v11/concepts#vocabulary
   */
  query<$Output>(
    resolver: ProcedureResolver<
      TContext,
      TMeta,
      TContextOverrides,
      TInputOut,
      TOutputIn,
      $Output
    >,
  ): TCaller extends true
    ? (
        input: DefaultValue<TInputIn, void>,
      ) => Promise<DefaultValue<TOutputOut, $Output>>
    : QueryProcedure<{
        input: DefaultValue<TInputIn, void>;
        output: DefaultValue<TOutputOut, $Output>;
        meta: TMeta;
      }>;

  /**
   * Mutation procedure
   * @see https://trpc.io/docs/v11/concepts#vocabulary
   */
  mutation<$Output>(
    resolver: ProcedureResolver<
      TContext,
      TMeta,
      TContextOverrides,
      TInputOut,
      TOutputIn,
      $Output
    >,
  ): TCaller extends true
    ? (
        input: DefaultValue<TInputIn, void>,
      ) => Promise<DefaultValue<TOutputOut, $Output>>
    : MutationProcedure<{
        input: DefaultValue<TInputIn, void>;
        output: DefaultValue<TOutputOut, $Output>;
        meta: TMeta;
      }>;

  /**
   * Subscription procedure
   * @see https://trpc.io/docs/v11/server/subscriptions
   */
  subscription<$Output extends AsyncIterable<any, void, any>>(
    resolver: ProcedureResolver<
      TContext,
      TMeta,
      TContextOverrides,
      TInputOut,
      TOutputIn,
      $Output
    >,
  ): TCaller extends true
    ? TypeError<'Not implemented'>
    : SubscriptionProcedure<{
        input: DefaultValue<TInputIn, void>;
        output: inferSubscriptionOutput<DefaultValue<TOutputOut, $Output>>;
        meta: TMeta;
      }>;
  /**
   * @deprecated Using subscriptions with an observable is deprecated. Use an async generator instead.
   * This feature will be removed in v12 of tRPC.
   * @see https://trpc.io/docs/v11/server/subscriptions
   */
  subscription<$Output extends Observable<any, any>>(
    resolver: ProcedureResolver<
      TContext,
      TMeta,
      TContextOverrides,
      TInputOut,
      TOutputIn,
      $Output
    >,
  ): TCaller extends true
    ? TypeError<'Not implemented'>
    : LegacyObservableSubscriptionProcedure<{
        input: DefaultValue<TInputIn, void>;
        output: inferObservableValue<DefaultValue<TOutputOut, $Output>>;
        meta: TMeta;
      }>;
  /**
   * Overrides the way a procedure is invoked
   * Do not use this unless you know what you're doing - this is an experimental API
   */
  experimental_caller(
    caller: CallerOverride<TContext>,
  ): ProcedureBuilder<
    TContext,
    TMeta,
    TContextOverrides,
    TInputIn,
    TInputOut,
    TOutputIn,
    TOutputOut,
    true
  >;
  /**
   * @internal
   */
  _def: ProcedureBuilderDef<TMeta>;
}

export type AnyProcedureBuilder = ProcedureBuilder<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

export type inferProcedureBuilderResolverOptions<
  TProcedureBuilder extends AnyProcedureBuilder,
> =
  TProcedureBuilder extends ProcedureBuilder<
    infer TContext,
    infer TMeta,
    infer TContextOverrides,
    infer _TInputIn,
    infer TInputOut,
    infer _TOutputIn,
    infer _TOutputOut,
    infer _TCaller
  >
    ? ProcedureResolverOptions<
        TContext,
        TMeta,
        TContextOverrides,
        TInputOut extends UnsetMarker
          ? // if input is not set, we don't want to infer it as `undefined` since a procedure further down the chain might have set an input
            unknown
          : TInputOut extends object
            ? Simplify<
                TInputOut & {
                  /**
                   * Extra input params might have been added by a `.input()` further down the chain
                   */
                  [keyAddedByInputCallFurtherDown: string]: unknown;
                }
              >
            : TInputOut
      >
    : never;
