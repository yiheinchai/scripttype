/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/ai/Tool.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AiError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Prompt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ProviderDefinedTypeId<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Types<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface NeedsApprovalContext {
  /**
   * The unique identifier of the tool call.
   */
  readonly toolCallId: string
  /**
   * The conversation messages leading up to this tool call.
   */
  readonly messages: ReadonlyArray<Prompt.Message>
}

export type NeedsApprovalFunction<Params extends Schema.Constraint> = (
  params: Params["Type"],
  context: NeedsApprovalContext
) => boolean | Effect.Effect<boolean>

export type NeedsApproval<Params extends Schema.Constraint> =
  | boolean
  | NeedsApprovalFunction<Params>

export type FailureMode = "error" | "return"

export interface Tool<
  out Name extends string,
  out Config extends {
    readonly parameters: Schema.Constraint
    readonly success: Schema.Constraint
    readonly failure: Schema.Constraint
    readonly failureMode: FailureMode
  },
  out Requirements = never
> {
  readonly [TypeId]: {
    readonly _Requirements: Types.Covariant<Requirements>
  }

  /**
   * The tool identifier which is used to uniquely identify the tool.
   */
  readonly id: string

  /**
   * The name of the tool.
   */
  readonly name: Name

  /**
   * The optional description of the tool.
   */
  readonly description?: string | undefined

  /**
   * The strategy used for handling errors returned from tool call handler
   * execution.
   *
   * **Details**
   *
   * If set to `"error"` (the default), errors that occur during tool call
   * handler execution will be returned in the error channel of the calling
   * effect.
   *
   * If set to `"return"`, errors that occur during tool call handler execution
   * will be captured and returned as part of the tool call result.
   */
  readonly failureMode: FailureMode

  /**
   * A `Schema` representing the parameters that a tool must be called with.
   */
  readonly parametersSchema: Config["parameters"]

  /**
   * A `Schema` representing the value that a tool must return when called if
   * the tool call is successful.
   */
  readonly successSchema: Config["success"]

  /**
   * A `Schema` representing the value that a tool must return when called if
   * it fails.
   */
  readonly failureSchema: Config["failure"]

  /**
   * A `Context` containing tool annotations which can store metadata about
   * the tool.
   */
  readonly annotations: Context.Context<never>

  /**
   * Specifies whether user approval is required before executing this tool.
   *
   * **Details**
   *
   * - If `undefined` or `false`, the tool executes immediately.
   * - If `true`, the tool always requires approval.
   * - If a function, it is called with the tool parameters and context to
   *   dynamically determine if approval is needed. The function can return
   *   a boolean or an Effect that resolves to a boolean.
   */
  readonly needsApproval?: boolean | NeedsApprovalFunction<any> | undefined

  /**
   * Adds a _request-level_ dependency which must be provided before the tool
   * call handler can be executed.
   *
   * **Details**
   *
   * This can be useful when you want to enforce that a particular dependency
   * **MUST** be provided to each request to the large language model provider
   * instead of being provided when creating the tool call handler layer.
   */
  addDependency<Identifier, Service>(
    tag: Context.Key<Identifier, Service>
  ): Tool<Name, Config, Identifier | Requirements>

  /**
   * Set the schema to use to validate the result of a tool call when successful.
   */
  setSuccess<SuccessSchema extends Schema.Constraint>(
    schema: SuccessSchema
  ): Tool<
    Name,
    {
      readonly parameters: Config["parameters"]
      readonly success: SuccessSchema
      readonly failure: Config["failure"]
      readonly failureMode: Config["failureMode"]
    },
    Requirements
  >

  /**
   * Set the schema to use to validate the result of a tool call when it fails.
   */
  setFailure<FailureSchema extends Schema.Constraint>(
    schema: FailureSchema
  ): Tool<
    Name,
    {
      readonly parameters: Config["parameters"]
      readonly success: Config["success"]
      readonly failure: FailureSchema
      readonly failureMode: Config["failureMode"]
    },
    Requirements
  >

  /**
   * Set the schema to use to validate the parameters of a tool call.
   */
  setParameters<ParametersSchema extends Schema.Constraint>(
    schema: ParametersSchema
  ): Tool<
    Name,
    {
      readonly parameters: ParametersSchema
      readonly success: Config["success"]
      readonly failure: Config["failure"]
      readonly failureMode: Config["failureMode"]
    },
    Requirements
  >

  /**
   * Add an annotation to the tool.
   */
  annotate<I, S>(tag: Context.Key<I, S>, value: S): Tool<Name, Config, Requirements>

  /**
   * Add many annotations to the tool.
   */
  annotateMerge<I>(context: Context.Context<I>): Tool<Name, Config, Requirements>
}

export type Name<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Name
  : never

export type Parameters<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["parameters"]["Type"]
  : never

export type ParametersEncoded<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["parameters"]["Encoded"]
  : never

export type ParametersSchema<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["parameters"]
  : never

export type Success<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["success"]["Type"]
  : never

export type SuccessEncoded<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["success"]["Encoded"]
  : never

export type SuccessSchema<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["success"]
  : never

export type Failure<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["failure"]["Type"]
  : never

export type FailureEncoded<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["failure"]["Encoded"]
  : never

export type FailureResult<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["failureMode"] extends "return" ? _Config["failure"]["Type"] | AiError.AiError
  : _Config["failure"]["Type"]
  : never

export type FailureResultEncoded<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["failureMode"] extends "return" ? _Config["failure"]["Encoded"] | AiError.AiErrorEncoded
  : _Config["failure"]["Encoded"]
  : never

export type Result<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["failureMode"] extends "return" ? Success<T> | Failure<T> | AiError.AiError
  : Success<T> | Failure<T>
  : never

export type ResultEncoded<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["failureMode"] extends "return" ? SuccessEncoded<T> | FailureEncoded<T> | AiError.AiErrorEncoded
  : SuccessEncoded<T> | FailureEncoded<T>
  : never

export type ResultEncodingServices<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["success"]["EncodingServices"] | _Config["failure"]["EncodingServices"]
  : never

export type HandlerServices<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? // Parameters must be decoded when received from a model
    | _Config["parameters"]["DecodingServices"]
    // A tool call `result`, whether success or failure, is encoded and returned
    // as the `encodedResult` along with the `result`
    | ResultEncodingServices<T>
    // Per-request requirements
    | _Requirements
  : never

export type ResultDecodingServices<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["success"]["DecodingServices"] | _Config["failure"]["DecodingServices"]
  : never

export type HandlerOutput<Success> =
  | { readonly _tag: "Preliminary"; readonly value: Success }
  | { readonly _tag: "Final"; readonly value: Success }

export type HandlerError<T> = T extends Tool<
  infer _Name,
  infer _Config,
  infer _Requirements
> ? _Config["failureMode"] extends "error" ? _Config["failure"]["Type"] | AiError.AiError
  : never
  : never

export interface Any extends
  Tool<any, {
    readonly parameters: Schema.Top
    readonly success: Schema.Top
    readonly failure: Schema.Top
    readonly failureMode: FailureMode
  }, any>
{}

export interface ProviderDefined<
  out Identifier extends `${string}.${string}`,
  out Name extends string,
  out Config extends {
    readonly args: Schema.Constraint
    readonly parameters: Schema.Constraint
    readonly success: Schema.Constraint
    readonly failure: Schema.Constraint
    readonly failureMode: FailureMode
  },
  out RequiresHandler extends boolean = false
> extends
  Tool<
    Name,
    {
      readonly parameters: Config["parameters"]
      readonly success: Config["success"]
      readonly failure: Config["failure"]
      readonly failureMode: Config["failureMode"]
    }
  >
{
  readonly [ProviderDefinedTypeId]: typeof ProviderDefinedTypeId

  /**
   * the identifier which is used to uniquely identify the provider-defined tool.
   */
  readonly id: Identifier

  /**
   * The arguments passed to the provider-defined tool.
   */
  readonly args: Config["args"]["Encoded"]

  /**
   * A `Schema` representing the arguments provided by the end-user which will
   * be used to configure the behavior of the provider-defined tool.
   */
  readonly argsSchema: Config["args"]

  /**
   * Name of the tool as recognized by the large language model provider.
   */
  readonly providerName: string

  /**
   * If set to `true`, this provider-defined tool will require a user-defined
   * tool call handler to be provided when converting the `Toolkit` containing
   * this tool into a `Layer`.
   */
  readonly requiresHandler: RequiresHandler
}

export type RequiresHandler<Tool extends Any> = Tool extends ProviderDefined<
  infer _Name,
  infer _Config,
  infer _RequiresHandler
> ? _RequiresHandler
  : true

export interface Handler<Name extends string> {
  readonly _: unique symbol
  readonly name: Name
  readonly context: Context.Context<never>
  readonly handler: (params: any, ctx: any) => Effect.Effect<any, any>
}

export type HandlersFor<Tools extends Record<string, Any>> = {
  [Name in keyof Tools]: RequiresHandler<Tools[Name]> extends true ? Handler<Tools[Name]["name"]>
    : never
}[keyof Tools]
