/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-client-core/src/createMiddleware.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyServerFn<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Assign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Awaited<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ClientFnMeta<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constrain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConstrainValidator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CustomFetch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Expand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HeadersInit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IntersectAssign<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Method<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Register<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Request<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveValidatorInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveValidatorOutput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ServerFnMeta<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type StartInstanceOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateSerializableInput<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MiddlewareType = 'request' | 'function'

export type IntersectAllValidatorOutputs<TMiddlewares, TInputValidator> =
  unknown extends TInputValidator
    ? TInputValidator
    : TInputValidator extends undefined
      ? IntersectAllMiddleware<TMiddlewares, 'allOutput'>
      : IntersectAssign<
          IntersectAllMiddleware<TMiddlewares, 'allOutput'>,
          Awaited<ResolveValidatorOutput<TInputValidator>>
        >

export type GlobalFetchRequestContext = Register extends {
  server: { requestContext: infer TRequestContext }
}
  ? TRequestContext
  : AnyContext

export type GlobalServerRequestContext<TRegister> = TRegister extends {
  config: StartInstanceOptions<any, any, infer TRequestMiddlewares, any>
}
  ? AssignAllMiddleware<TRequestMiddlewares, 'allServerContext'>
  : AnyContext

export type __AssignAllServerRequestContext<
  TMiddlewares,
  TSendContext = undefined,
  TServerContext = undefined,
> = unknown extends TSendContext
  ? Assign<TSendContext, TServerContext>
  : Assign<
      AssignAllMiddleware<TMiddlewares, 'allServerContext'>,
      Assign<TSendContext, TServerContext>
    >

export type AssignAllServerRequestContext<
  TRegister,
  TMiddlewares,
  TSendContext = undefined,
  TServerContext = undefined,
> = Assign<
  // Fetch Request Context
  GlobalFetchRequestContext,
  Assign<
    GlobalServerRequestContext<TRegister>,
    __AssignAllServerRequestContext<TMiddlewares, TSendContext, TServerContext>
  >
>

export interface RequestMiddlewareTypes<
  TRegister,
  TMiddlewares,
  TServerContext,
> {
  type: 'request'
  // this only exists so we can use request middlewares in server functions
  allInput: undefined
  // this only exists so we can use request middlewares in server functions
  allOutput: undefined
  middlewares: TMiddlewares
  serverContext: TServerContext
  allServerContext: AssignAllServerRequestContext<
    TRegister,
    TMiddlewares,
    undefined,
    TServerContext
  >
}

export interface RequestServerNextFnOptions<TServerContext> {
  context?: TServerContext
}

export interface RequestServerResult<TRegister, TMiddlewares, TServerContext> {
  request: Request
  pathname: string
  context: Expand<
    AssignAllServerRequestContext<
      TRegister,
      TMiddlewares,
      undefined,
      TServerContext
    >
  >
  response: Response
}

export type RequestServerNextFnResult<TRegister, TMiddlewares, TServerContext> =
  | Promise<RequestServerResult<TRegister, TMiddlewares, TServerContext>>
  | RequestServerResult<TRegister, TMiddlewares, TServerContext>

export type RequestServerNextFn<TRegister, TMiddlewares> = <
  TServerContext = undefined,
>(
  options?: RequestServerNextFnOptions<TServerContext>,
) => RequestServerNextFnResult<TRegister, TMiddlewares, TServerContext>

export interface RequestServerOptions<TRegister, TMiddlewares> {
  request: Request
  pathname: string
  context: Expand<AssignAllServerRequestContext<TRegister, TMiddlewares>>
  next: RequestServerNextFn<TRegister, TMiddlewares>
  /**
   * Type of Start handler currently processing this request.
   */
  handlerType: 'serverFn' | 'router'
  /**
   * Metadata about the server function being invoked.
   * This is only present when the request is handling a server function call.
   * For regular page requests, this will be undefined.
   */
  serverFnMeta?: ServerFnMeta
}

export type RequestMiddlewareServerFnResult<
  TRegister,
  TMiddlewares,
  TServerContext,
> =
  | Promise<
      RequestServerResult<TRegister, TMiddlewares, TServerContext> | Response
    >
  | RequestServerResult<TRegister, TMiddlewares, TServerContext>
  | Response

export type RequestServerFn<TRegister, TMiddlewares, TServerContext> = (
  options: RequestServerOptions<TRegister, TMiddlewares>,
) => RequestMiddlewareServerFnResult<TRegister, TMiddlewares, TServerContext>

export interface RequestMiddlewareOptions<
  in out TRegister,
  in out TMiddlewares,
  in out TServerContext,
> {
  middleware?: TMiddlewares
  server?: RequestServerFn<TRegister, TMiddlewares, TServerContext>
}

export interface RequestMiddlewareWithTypes<
  TRegister,
  TMiddlewares,
  TServerContext,
> {
  '~types': RequestMiddlewareTypes<TRegister, TMiddlewares, TServerContext>
  options: RequestMiddlewareOptions<TRegister, TMiddlewares, TServerContext>
}

export type AnyRequestMiddleware = RequestMiddlewareWithTypes<any, any, any>

export type AssignAllMiddleware<
  TMiddlewares,
  TType extends
    | keyof AnyFunctionMiddleware['~types']
    | keyof AnyRequestMiddleware['~types']
    | keyof AnyServerFn['~types'],
  TAcc = undefined,
> = TMiddlewares extends readonly [infer TMiddleware, ...infer TRest]
  ? TMiddleware extends
      | AnyFunctionMiddleware
      | AnyRequestMiddleware
      | AnyServerFn
    ? AssignAllMiddleware<
        TRest,
        TType,
        Assign<TAcc, TMiddleware['~types'][TType & keyof TMiddleware['~types']]>
      >
    : TAcc
  : TAcc

export type AssignAllClientContextBeforeNext<
  TMiddlewares,
  TClientContext = undefined,
> = unknown extends TClientContext
  ? TClientContext
  : Assign<
      AssignAllMiddleware<TMiddlewares, 'allClientContextBeforeNext'>,
      TClientContext
    >

export type AssignAllClientContextAfterNext<
  TMiddlewares,
  TClientContext = undefined,
  TSendContext = undefined,
> = unknown extends TClientContext
  ? Assign<TClientContext, TSendContext>
  : Assign<
      AssignAllMiddleware<TMiddlewares, 'allClientContextAfterNext'>,
      Assign<TClientContext, TSendContext>
    >

export type AssignAllServerSendContext<
  TMiddlewares,
  TSendContext = undefined,
> = unknown extends TSendContext
  ? TSendContext
  : Assign<
      AssignAllMiddleware<TMiddlewares, 'allServerSendContext'>,
      TSendContext
    >

export type GlobalServerFnContext<TRegister> = TRegister extends {
  config: StartInstanceOptions<any, any, any, infer TFunctionMiddlewares>
}
  ? AssignAllMiddleware<TFunctionMiddlewares, 'allServerContext'>
  : AnyContext

export type __AssignAllServerFnContext<
  TMiddlewares,
  TSendContext = undefined,
  TServerContext = undefined,
> = unknown extends TSendContext
  ? Assign<TSendContext, TServerContext>
  : Assign<
      AssignAllMiddleware<TMiddlewares, 'allServerContext'>,
      Assign<TSendContext, TServerContext>
    >

export type AssignAllServerFnContext<
  TRegister,
  TMiddlewares,
  TSendContext = undefined,
  TServerContext = undefined,
> = Assign<
  GlobalFetchRequestContext,
  Assign<
    GlobalServerRequestContext<TRegister>, // TODO: This enabled global middleware
    // type inference, but creates a circular types issue. No idea how to fix this.
    // AnyContext,
    Assign<
      GlobalServerFnContext<TRegister>, // TODO: This enabled global middleware
      // type inference, but creates a circular types issue. No idea how to fix this.
      // AnyContext,/
      __AssignAllServerFnContext<TMiddlewares, TSendContext, TServerContext>
    >
  >
>

export type AssignAllClientSendContext<
  TMiddlewares,
  TSendContext = undefined,
> = unknown extends TSendContext
  ? TSendContext
  : Assign<
      AssignAllMiddleware<TMiddlewares, 'allClientSendContext'>,
      TSendContext
    >

export interface FunctionMiddlewareTypes<
  in out TRegister,
  in out TMiddlewares,
  in out TInputValidator,
  in out TServerContext,
  in out TServerSendContext,
  in out TClientContext,
  in out TClientSendContext,
> {
  type: 'function'
  middlewares: TMiddlewares
  input: ResolveValidatorInput<TInputValidator>
  allInput: IntersectAllValidatorInputs<TMiddlewares, TInputValidator>
  output: ResolveValidatorOutput<TInputValidator>
  allOutput: IntersectAllValidatorOutputs<TMiddlewares, TInputValidator>
  clientContext: TClientContext
  allClientContextBeforeNext: AssignAllClientContextBeforeNext<
    TMiddlewares,
    TClientContext
  >
  allClientContextAfterNext: AssignAllClientContextAfterNext<
    TMiddlewares,
    TClientContext,
    TClientSendContext
  >
  serverContext: TServerContext
  serverSendContext: TServerSendContext
  allServerSendContext: AssignAllServerSendContext<
    TMiddlewares,
    TServerSendContext
  >
  allServerContext: AssignAllServerFnContext<
    TRegister,
    TMiddlewares,
    TServerSendContext,
    TServerContext
  >
  clientSendContext: TClientSendContext
  allClientSendContext: AssignAllClientSendContext<
    TMiddlewares,
    TClientSendContext
  >
  validator: TInputValidator
  // TODO remove upon stable
  /** @deprecated Use `validator` instead. */
  inputValidator: TInputValidator
}

export interface FunctionMiddlewareWithTypes<
  TRegister,
  TMiddlewares,
  TInputValidator,
  TServerContext,
  TServerSendContext,
  TClientContext,
  TClientSendContext,
> {
  '~types': FunctionMiddlewareTypes<
    TRegister,
    TMiddlewares,
    TInputValidator,
    TServerContext,
    TServerSendContext,
    TClientContext,
    TClientSendContext
  >
  options: FunctionMiddlewareOptions<
    TRegister,
    TMiddlewares,
    TInputValidator,
    TServerContext,
    TClientContext
  >
}

export type AnyFunctionMiddleware = FunctionMiddlewareWithTypes<
  any,
  any,
  any,
  any,
  any,
  any,
  any
>

export type IntersectAllMiddleware<
  TMiddlewares,
  TType extends
    | keyof AnyFunctionMiddleware['~types']
    | keyof AnyRequestMiddleware['~types']
    | keyof AnyServerFn['~types'],
  TAcc = undefined,
> = TMiddlewares extends readonly [infer TMiddleware, ...infer TRest]
  ? TMiddleware extends
      | AnyFunctionMiddleware
      | AnyRequestMiddleware
      | AnyServerFn
    ? IntersectAllMiddleware<
        TRest,
        TType,
        IntersectAssign<
          TAcc,
          TMiddleware['~types'][TType & keyof TMiddleware['~types']]
        >
      >
    : TAcc
  : TAcc

export type IntersectAllValidatorInputs<TMiddlewares, TInputValidator> =
  unknown extends TInputValidator
    ? TInputValidator
    : TInputValidator extends undefined
      ? IntersectAllMiddleware<TMiddlewares, 'allInput'>
      : IntersectAssign<
          IntersectAllMiddleware<TMiddlewares, 'allInput'>,
          ResolveValidatorInput<TInputValidator>
        >

export type FunctionClientResultWithContext<
  in out TMiddlewares,
  in out TSendContext,
  in out TClientContext,
> = {
  'use functions must return the result of next()': true
  context: Expand<AssignAllClientContextAfterNext<TMiddlewares, TClientContext>>
  sendContext: Expand<AssignAllServerSendContext<TMiddlewares, TSendContext>>
  headers: HeadersInit
  fetch?: CustomFetch
}

export type FunctionMiddlewareClientNextFn<TRegister, TMiddlewares> = <
  TSendContext = undefined,
  TNewClientContext = undefined,
>(ctx?: {
  context?: TNewClientContext
  sendContext?: ValidateSerializableInput<TRegister, TSendContext>
  headers?: HeadersInit
  fetch?: CustomFetch
}) => Promise<
  FunctionClientResultWithContext<TMiddlewares, TSendContext, TNewClientContext>
>

export interface FunctionMiddlewareClientFnOptions<
  in out TRegister,
  in out TMiddlewares,
  in out TInputValidator,
> {
  data: Expand<IntersectAllValidatorInputs<TMiddlewares, TInputValidator>>
  context: Expand<AssignAllClientContextBeforeNext<TMiddlewares>>
  sendContext: Expand<AssignAllServerSendContext<TMiddlewares>>
  method: Method
  signal: AbortSignal
  serverFnMeta: ClientFnMeta
  next: FunctionMiddlewareClientNextFn<TRegister, TMiddlewares>
  filename: string
  fetch?: CustomFetch
}

export type FunctionMiddlewareClientFnResult<
  TMiddlewares,
  TSendContext,
  TClientContext,
> =
  | Promise<
      FunctionClientResultWithContext<
        TMiddlewares,
        TSendContext,
        TClientContext
      >
    >
  | FunctionClientResultWithContext<TMiddlewares, TSendContext, TClientContext>

export type FunctionMiddlewareClientFn<
  TRegister,
  TMiddlewares,
  TInputValidator,
  TSendContext,
  TClientContext,
> = (
  options: FunctionMiddlewareClientFnOptions<
    TRegister,
    TMiddlewares,
    TInputValidator
  >,
) => FunctionMiddlewareClientFnResult<
  TMiddlewares,
  TSendContext,
  TClientContext
>

export type FunctionServerResultWithContext<
  in out TRegister,
  in out TMiddlewares,
  in out TServerSendContext,
  in out TServerContext,
  in out TSendContext,
> = {
  'use functions must return the result of next()': true
  '~types': {
    context: TServerContext
    sendContext: TSendContext
  }
  context: Expand<
    AssignAllServerFnContext<
      TRegister,
      TMiddlewares,
      TServerSendContext,
      TServerContext
    >
  >
  sendContext: Expand<AssignAllClientSendContext<TMiddlewares, TSendContext>>
}

export type FunctionMiddlewareServerNextFn<
  TRegister,
  TMiddlewares,
  TServerSendContext,
> = <TNewServerContext = undefined, TSendContext = undefined>(ctx?: {
  context?: TNewServerContext
  sendContext?: ValidateSerializableInput<TRegister, TSendContext>
}) => Promise<
  FunctionServerResultWithContext<
    TRegister,
    TMiddlewares,
    TServerSendContext,
    TNewServerContext,
    TSendContext
  >
>

export interface FunctionMiddlewareServerFnOptions<
  in out TRegister,
  in out TMiddlewares,
  in out TInputValidator,
  in out TServerSendContext,
> {
  data: Expand<IntersectAllValidatorOutputs<TMiddlewares, TInputValidator>>
  context: Expand<
    AssignAllServerFnContext<TRegister, TMiddlewares, TServerSendContext>
  >
  next: FunctionMiddlewareServerNextFn<
    TRegister,
    TMiddlewares,
    TServerSendContext
  >
  method: Method
  serverFnMeta: ServerFnMeta
  signal: AbortSignal
}

export type FunctionMiddlewareServerFnResult<
  TRegister,
  TMiddlewares,
  TServerSendContext,
  TServerContext,
  TSendContext,
> =
  | Promise<
      FunctionServerResultWithContext<
        TRegister,
        TMiddlewares,
        TServerSendContext,
        TServerContext,
        TSendContext
      >
    >
  | FunctionServerResultWithContext<
      TRegister,
      TMiddlewares,
      TServerSendContext,
      TServerContext,
      TSendContext
    >

export type FunctionMiddlewareServerFn<
  TRegister,
  TMiddlewares,
  TInputValidator,
  TServerSendContext,
  TNewServerContext,
  TSendContext,
> = (
  options: FunctionMiddlewareServerFnOptions<
    TRegister,
    TMiddlewares,
    TInputValidator,
    TServerSendContext
  >,
) => FunctionMiddlewareServerFnResult<
  TRegister,
  TMiddlewares,
  TServerSendContext,
  TNewServerContext,
  TSendContext
>

export interface FunctionMiddlewareOptions<
  in out TRegister,
  in out TMiddlewares,
  in out TInputValidator,
  in out TServerContext,
  in out TClientContext,
> {
  middleware?: TMiddlewares
  validator?: ConstrainValidator<TRegister, 'GET', TInputValidator>
  // TODO remove upon stable
  /** @deprecated Use `validator` instead. */
  inputValidator?: ConstrainValidator<TRegister, 'GET', TInputValidator>
  client?: FunctionMiddlewareClientFn<
    TRegister,
    TMiddlewares,
    TInputValidator,
    TServerContext,
    TClientContext
  >
  server?: FunctionMiddlewareServerFn<
    TRegister,
    TMiddlewares,
    TInputValidator,
    TServerContext,
    unknown,
    unknown
  >
}

export interface RequestMiddlewareAfterMiddleware<TRegister, TMiddlewares>
  extends
    RequestMiddlewareWithTypes<TRegister, TMiddlewares, undefined>,
    RequestMiddlewareServer<TRegister, TMiddlewares> {}

export interface RequestMiddleware<
  TRegister,
> extends RequestMiddlewareAfterMiddleware<TRegister, undefined> {
  middleware: <const TMiddlewares = undefined>(
    middlewares: Constrain<TMiddlewares, ReadonlyArray<AnyRequestMiddleware>>,
  ) => RequestMiddlewareAfterMiddleware<TRegister, TMiddlewares>
}

export interface FunctionMiddlewareAfterMiddleware<TRegister, TMiddlewares>
  extends
    FunctionMiddlewareWithTypes<
      TRegister,
      TMiddlewares,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    >,
    FunctionMiddlewareServer<
      TRegister,
      TMiddlewares,
      undefined,
      undefined,
      undefined
    >,
    FunctionMiddlewareClient<TRegister, TMiddlewares, undefined>,
    FunctionMiddlewareValidator<TRegister, TMiddlewares> {}

export interface FunctionMiddleware<
  TRegister,
> extends FunctionMiddlewareAfterMiddleware<TRegister, unknown> {
  middleware: <const TNewMiddlewares = undefined>(
    middlewares: Constrain<
      TNewMiddlewares,
      ReadonlyArray<AnyRequestMiddleware | AnyFunctionMiddleware>
    >,
  ) => FunctionMiddlewareAfterMiddleware<TRegister, TNewMiddlewares>
}

export type CreateMiddlewareResult<
  TRegister,
  TType extends MiddlewareType,
> = 'request' extends TType
  ? RequestMiddleware<TRegister>
  : FunctionMiddleware<TRegister>

export type CreateMiddlewareFn<TRegister> = <TType extends MiddlewareType>(
  options?: {
    type?: TType
  },
  __opts?: FunctionMiddlewareOptions<
    TRegister,
    unknown,
    undefined,
    undefined,
    undefined
  >,
) => CreateMiddlewareResult<TRegister, TType>
