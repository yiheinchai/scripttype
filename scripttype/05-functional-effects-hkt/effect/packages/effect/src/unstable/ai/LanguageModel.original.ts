/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/ai/LanguageModel.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AiError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tool<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ToolChoice<ToolName extends string> =
  | "auto"
  | "none"
  | "required"
  | {
    readonly tool: ToolName
  }
  | {
    readonly mode?: "auto" | "required"
    readonly oneOf: ReadonlyArray<ToolName>
  }

export type ToolkitOption<
  Tools extends Record<string, Tool.Any>,
  E = never,
  R = any
> = Tools extends any ? (
    | Toolkit.WithHandler<Tools>
    | Effect.Effect<
      Toolkit.WithHandler<Tools>,
      E,
      R
    >
  )
  : never

export type ToolkitInput<
  Tools extends Record<string, Tool.Any>,
  E = never,
  R = any
> =
  | ToolkitOption<Tools, E, R>
  | Toolkit.WithHandler<Tools>
  | Effect.Effect<
    Toolkit.WithHandler<Tools>,
    E,
    R
  >

export type ExtractToolsFromToolkitOption<ToolkitValue> = ToolkitValue extends Toolkit.WithHandler<infer Tools> ? Tools
  : ToolkitValue extends Effect.Effect<
    Toolkit.WithHandler<infer _Tools>,
    infer _E,
    infer _R
  > ? _Tools
  : never

export type ExtractTools<Options> = Options extends {
  readonly toolkit: infer ToolkitValue
} ? ExtractToolsFromToolkitOption<Exclude<ToolkitValue, undefined>>
  : {}

export type ExtractErrorFromToolkitOption<ToolkitValue, DisableToolCallResolution extends boolean> = ToolkitValue extends
  Toolkit.WithHandler<infer Tools> ?
    | AiError.AiError
    | (DisableToolCallResolution extends true ? never : Tool.HandlerError<Tools[keyof Tools]>)
  : ToolkitValue extends Effect.Effect<
    Toolkit.WithHandler<infer _Tools>,
    infer E,
    infer _R
  > ? AiError.AiError | E | (DisableToolCallResolution extends true ? never : Tool.HandlerError<_Tools[keyof _Tools]>)
  : AiError.AiError

export type ExtractServicesFromToolkitOption<ToolkitValue> = ToolkitValue extends Toolkit.WithHandler<infer Tools> ?
    | Tool.HandlerServices<Tools[keyof Tools]>
    | Tool.ResultDecodingServices<Tools[keyof Tools]>
  : ToolkitValue extends Effect.Effect<
    Toolkit.WithHandler<infer Tools>,
    infer _E,
    infer R
  > ?
      | Tool.HandlerServices<Tools[keyof Tools]>
      | Tool.ResultDecodingServices<Tools[keyof Tools]>
      | R
  : never

export type ExtractToolkitResolutionError<ToolkitValue> = ToolkitValue extends Effect.Effect<
  Toolkit.WithHandler<infer _Tools>,
  infer E,
  infer _R
> ? E
  : never

export type ExtractToolkitResolutionServices<ToolkitValue> = ToolkitValue extends Effect.Effect<
  Toolkit.WithHandler<infer _Tools>,
  infer _E,
  infer R
> ? R
  : never

export type ExtractError<Options> = Options extends {
  readonly disableToolCallResolution: true
  readonly toolkit: infer ToolkitValue
} ? ExtractErrorFromToolkitOption<Exclude<ToolkitValue, undefined>, true>
  : Options extends {
    readonly toolkit: infer ToolkitValue
  } ? ExtractErrorFromToolkitOption<Exclude<ToolkitValue, undefined>, false>
  : Options extends {
    readonly disableToolCallResolution: true
  } ? AiError.AiError
  : AiError.AiError

export type ExtractServices<Options> = Options extends {
  readonly disableToolCallResolution: true
} ? never
  : Options extends {
    readonly toolkit: infer Toolkit
  } ? ExtractServicesFromToolkitOption<Exclude<Toolkit, undefined>>
  : never

export type ToolResolutionResult<Tools extends Record<string, Tool.Any>> =
  | Response.ToolResultPart<
    Tool.Name<Tools[keyof Tools]>,
    Tool.Success<Tools[keyof Tools]>,
    Tool.Failure<Tools[keyof Tools]>
  >
  | Response.ToolApprovalRequestPart
