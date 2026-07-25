/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/ai/Prompt.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type MessageTypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PartTypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type URL<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uint8Array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface TextPartOptions extends ProviderOptions {}

export interface TextPart extends BasePart<"text", TextPartOptions> {
  /**
   * The text content.
   */
  readonly text: string
}

export interface ReasoningPartOptions extends ProviderOptions {}

export interface ReasoningPart extends BasePart<"reasoning", ReasoningPartOptions> {
  /**
   * The reasoning or thought process text.
   */
  readonly text: string
}

export interface FilePartOptions extends ProviderOptions {}

export interface FilePart extends BasePart<"file", FilePartOptions> {
  /**
   * MIME type of the file (e.g., "image/jpeg", "application/pdf").
   */
  readonly mediaType: string
  /**
   * Optional filename for the file.
   */
  readonly fileName?: string | undefined
  /**
   * File data as base64 string of data, a byte array, or a URL.
   */
  readonly data: string | Uint8Array | URL
}

export interface ToolCallPartOptions extends ProviderOptions {}

export interface ToolCallPart extends BasePart<"tool-call", ToolCallPartOptions> {
  /**
   * Unique identifier for this tool call.
   */
  readonly id: string
  /**
   * Name of the tool to invoke.
   */
  readonly name: string
  /**
   * Parameters to pass to the tool.
   */
  readonly params: unknown
  /**
   * Whether the tool was executed by the provider (true) or framework (false).
   */
  readonly providerExecuted: boolean
}

export interface ToolResultPartOptions extends ProviderOptions {}

export interface ToolResultPart extends BasePart<"tool-result", ToolResultPartOptions> {
  /**
   * Unique identifier matching the original tool call.
   */
  readonly id: string
  /**
   * Name of the tool that was executed.
   */
  readonly name: string
  /**
   * Whether or not the result of executing the tool call handler was an error.
   */
  readonly isFailure: boolean
  /**
   * The result returned by the tool execution.
   */
  readonly result: unknown
}

export interface ToolApprovalResponsePartOptions extends ProviderOptions {}

export interface ToolApprovalResponsePart extends BasePart<"tool-approval-response", ToolApprovalResponsePartOptions> {
  /**
   * References the original approval request.
   */
  readonly approvalId: string
  /**
   * User's decision to approve or deny the tool execution.
   */
  readonly approved: boolean
  /**
   * Optional justification for the decision.
   */
  readonly reason?: string | undefined
}

export interface ToolApprovalRequestPartOptions extends ProviderOptions {}

export interface ToolApprovalRequestPart extends BasePart<"tool-approval-request", ToolApprovalRequestPartOptions> {
  /**
   * Unique identifier for this approval flow.
   */
  readonly approvalId: string
  /**
   * The tool call ID requiring approval.
   */
  readonly toolCallId: string
}

export type Part =
  | TextPart
  | ReasoningPart
  | FilePart
  | ToolCallPart
  | ToolResultPart
  | ToolApprovalResponsePart
  | ToolApprovalRequestPart

export type PartConstructorParams<P extends Part> = Omit<P, typeof PartTypeId | "type" | "options"> & {
  /**
   * Optional provider-specific options for this part.
   */
  readonly options?: Part["options"] | undefined
}

export interface SystemMessageOptions extends ProviderOptions {}

export interface SystemMessage extends BaseMessage<"system", SystemMessageOptions> {
  /**
   * The system instruction or context as plain text.
   */
  readonly content: string
}

export interface UserMessageOptions extends ProviderOptions {}

export type UserMessagePart = TextPart | FilePart

export interface UserMessage extends BaseMessage<"user", UserMessageOptions> {
  /**
   * Array of content parts that make up the user's message.
   */
  readonly content: ReadonlyArray<UserMessagePart>
}

export interface AssistantMessageOptions extends ProviderOptions {}

export type AssistantMessagePart =
  | TextPart
  | FilePart
  | ReasoningPart
  | ToolCallPart
  | ToolResultPart
  | ToolApprovalRequestPart

export interface AssistantMessage extends BaseMessage<"assistant", AssistantMessageOptions> {
  /**
   * Array of content parts that make up the assistant's response.
   */
  readonly content: ReadonlyArray<AssistantMessagePart>
}

export interface ToolMessageOptions extends ProviderOptions {}

export type ToolMessagePart = ToolResultPart | ToolApprovalResponsePart

export interface ToolMessage extends BaseMessage<"tool", ToolMessageOptions> {
  /**
   * Array of tool result parts.
   */
  readonly content: ReadonlyArray<ToolMessagePart>
}

export type Message =
  | SystemMessage
  | UserMessage
  | AssistantMessage
  | ToolMessage

export type MessageConstructorParams<M extends Message> = Omit<M, typeof MessageTypeId | "role" | "options"> & {
  /**
   * Optional provider-specific options for this message.
   */
  readonly options?: Part["options"] | undefined
}
