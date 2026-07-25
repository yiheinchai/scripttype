/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-client-core/src/createServerFn.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AbortSignal<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyFunctionMiddleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRequestMiddleware<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AssignAllServerFnContext<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Awaited<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Constrain<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Expand<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FormData<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HeadersInit<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IntersectAllValidatorInputs<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IntersectAllValidatorOutputs<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PromiseLike<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RegisteredSerializableInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ResolveValidatorInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Response<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ServerFnMeta<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValidateSerializable<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValidateSerializableInput<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Validator<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type fetch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ServerFnStrict = boolean | { input?: boolean; output?: boolean }

export type ServerFnStrictInput<TStrict extends ServerFnStrict> =
  TStrict extends false
    ? false
    : TStrict extends { input: infer TInput extends boolean }
      ? TInput
      : true

export type ServerFnStrictOutput<TStrict extends ServerFnStrict> =
  TStrict extends false
    ? false
    : TStrict extends { output: infer TOutput extends boolean }
      ? TOutput
      : true

export type Method = 'GET' | 'POST'

export interface ServerFnOptions<
  TMethod extends Method = Method,
  TStrict extends ServerFnStrict = true,
> {
  method?: TMethod
  strict?: TStrict
}

export type ValidateValidatorInput<
  TRegister,
  TMethod extends Method,
  TInputValidator,
  TStrict extends ServerFnStrict = true,
> =
  ServerFnStrictInput<TStrict> extends false
    ? ResolveValidatorInput<TInputValidator>
    : TMethod extends 'POST'
      ? ResolveValidatorInput<TInputValidator> extends FormData
        ? ResolveValidatorInput<TInputValidator>
        : ValidateSerializable<
            ResolveValidatorInput<TInputValidator>,
            RegisteredSerializableInput<TRegister>
          >
      : ValidateSerializable<
          ResolveValidatorInput<TInputValidator>,
          RegisteredSerializableInput<TRegister>
        >

export type ValidateValidator<
  TRegister,
  TMethod extends Method,
  TInputValidator,
  TStrict extends ServerFnStrict = true,
> =
  ValidateValidatorInput<
    TRegister,
    TMethod,
    TInputValidator,
    TStrict
  > extends infer TInput
    ? Validator<TInput, any>
    : never

export type ConstrainValidator<
  TRegister,
  TMethod extends Method,
  TInputValidator,
  TStrict extends ServerFnStrict = true,
> =
  | (unknown extends TInputValidator
      ? TInputValidator
      : ResolveValidatorInput<TInputValidator> extends ValidateValidator<
            TRegister,
            TMethod,
            TInputValidator,
            TStrict
          >
        ? TInputValidator
        : never)
  | ValidateValidator<TRegister, TMethod, TInputValidator, TStrict>

export type CustomFetch = typeof fetch extends (...args: infer A) => infer R
  ? (...args: A) => R
  : never

export type CompiledFetcherFnOptions = {
  method: Method
  data: unknown
  headers?: HeadersInit
  signal?: AbortSignal
  fetch?: CustomFetch
  context?: any
}

export type CompiledFetcherFn<TRegister, TResponse> = {
  (
    opts: CompiledFetcherFnOptions & ServerFnBaseOptions<TRegister, Method>,
  ): Promise<TResponse>
  url: string
  serverFnMeta: ServerFnMeta
}

export interface ServerFnCtx<
  TRegister,
  TMethod,
  TMiddlewares,
  TInputValidator,
> {
  data: Expand<IntersectAllValidatorOutputs<TMiddlewares, TInputValidator>>
  serverFnMeta: ServerFnMeta
  context: Expand<AssignAllServerFnContext<TRegister, TMiddlewares, {}>>
  method: TMethod
}

export type ServerFnReturnType<
  TRegister,
  TResponse,
  TStrict extends ServerFnStrict = true,
> =
  ServerFnStrictOutput<TStrict> extends false
    ? TResponse
    : TResponse extends PromiseLike<infer U>
      ? Promise<ServerFnReturnType<TRegister, U, TStrict>>
      : TResponse extends Response
        ? TResponse
        : ValidateSerializableInput<TRegister, TResponse>

export type ServerFn<
  TRegister,
  TMethod,
  TMiddlewares,
  TInputValidator,
  TResponse,
  TStrict extends ServerFnStrict = true,
> = (
  ctx: ServerFnCtx<TRegister, TMethod, TMiddlewares, TInputValidator>,
) => ServerFnReturnType<TRegister, TResponse, TStrict>

export type ServerFnBaseOptions<
  TRegister,
  TMethod extends Method = 'GET',
  TResponse = unknown,
  TMiddlewares = unknown,
  TInputValidator = unknown,
  TStrict extends ServerFnStrict = true,
> = {
  method: TMethod
  strict?: TStrict
  middleware?: Constrain<
    TMiddlewares,
    ReadonlyArray<AnyFunctionMiddleware | AnyRequestMiddleware>
  >
  validator?: ConstrainValidator<TRegister, TMethod, TInputValidator, TStrict>
  // TODO remove upon stable
  /** @deprecated Use `validator` instead. */
  inputValidator?: ConstrainValidator<
    TRegister,
    TMethod,
    TInputValidator,
    TStrict
  >
  extractedFn?: CompiledFetcherFn<TRegister, TResponse>
  serverFn?: ServerFn<
    TRegister,
    TMethod,
    TMiddlewares,
    TInputValidator,
    TResponse,
    TStrict
  >
}

export interface ServerFnBuilder<
  TRegister,
  TMethod extends Method = 'GET',
  TStrict extends ServerFnStrict = true,
>
  extends
    ServerFnWithTypes<
      TRegister,
      TMethod,
      undefined,
      undefined,
      undefined,
      TStrict
    >,
    ServerFnMiddleware<TRegister, TMethod, undefined, undefined, TStrict>,
    ServerFnValidator<TRegister, TMethod, undefined, TStrict>,
    ServerFnHandler<TRegister, TMethod, undefined, undefined, TStrict> {
  <
    TNewMethod extends Method = TMethod,
    TNewStrict extends ServerFnStrict = TStrict,
  >(
    options?: ServerFnOptions<TNewMethod, TNewStrict>,
  ): ServerFnBuilder<TRegister, TNewMethod, TNewStrict>
  options: ServerFnBaseOptions<
    TRegister,
    TMethod,
    unknown,
    undefined,
    undefined,
    TStrict
  >
}

export type CreateServerFn<TRegister> = <
  TMethod extends Method,
  TStrict extends ServerFnStrict = true,
  TResponse = unknown,
  TMiddlewares = undefined,
  TInputValidator = undefined,
>(
  options?: ServerFnOptions<TMethod, TStrict>,
  __opts?: ServerFnBaseOptions<
    TRegister,
    TMethod,
    TResponse,
    TMiddlewares,
    TInputValidator,
    TStrict
  >,
) => ServerFnBuilder<TRegister, TMethod, TStrict>

export interface OptionalFetcherDataOptions<
  TMiddlewares,
  TInputValidator,
> extends FetcherBaseOptions {
  data?: Expand<IntersectAllValidatorInputs<TMiddlewares, TInputValidator>>
}

export interface OptionalFetcher<
  TMiddlewares,
  TInputValidator,
  TResponse,
> extends FetcherBase {
  (
    options?: OptionalFetcherDataOptions<TMiddlewares, TInputValidator>,
  ): Promise<Awaited<TResponse>>
}

export interface RequiredFetcherDataOptions<
  TMiddlewares,
  TInputValidator,
> extends FetcherBaseOptions {
  data: Expand<IntersectAllValidatorInputs<TMiddlewares, TInputValidator>>
}

export interface RequiredFetcher<
  TMiddlewares,
  TInputValidator,
  TResponse,
> extends FetcherBase {
  (
    opts: RequiredFetcherDataOptions<TMiddlewares, TInputValidator>,
  ): Promise<Awaited<TResponse>>
}

export type Fetcher<TMiddlewares, TInputValidator, TResponse> =
  undefined extends IntersectAllValidatorInputs<TMiddlewares, TInputValidator>
    ? OptionalFetcher<TMiddlewares, TInputValidator, TResponse>
    : RequiredFetcher<TMiddlewares, TInputValidator, TResponse>

export type RscStream<T> = {
  __cacheState: T
}

export type AppendMiddlewares<TMiddlewares, TNewMiddlewares> =
  TMiddlewares extends ReadonlyArray<any>
    ? TNewMiddlewares extends ReadonlyArray<any>
      ? readonly [...TMiddlewares, ...TNewMiddlewares]
      : TMiddlewares
    : TNewMiddlewares

export interface ServerFnAfterValidator<
  TRegister,
  TMethod extends Method,
  TMiddlewares,
  TInputValidator,
  TStrict extends ServerFnStrict,
>
  extends
    ServerFnWithTypes<
      TRegister,
      TMethod,
      TMiddlewares,
      TInputValidator,
      undefined,
      TStrict
    >,
    ServerFnMiddleware<
      TRegister,
      TMethod,
      TMiddlewares,
      TInputValidator,
      TStrict
    >,
    ServerFnHandler<
      TRegister,
      TMethod,
      TMiddlewares,
      TInputValidator,
      TStrict
    > {}

export type ValidatorFn<
  TRegister,
  TMethod extends Method,
  TMiddlewares,
  TStrict extends ServerFnStrict,
> = <TInputValidator>(
  validator: ConstrainValidator<TRegister, TMethod, TInputValidator, TStrict>,
) => ServerFnAfterValidator<
  TRegister,
  TMethod,
  TMiddlewares,
  TInputValidator,
  TStrict
>
