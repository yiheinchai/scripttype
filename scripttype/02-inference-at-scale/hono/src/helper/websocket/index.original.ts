/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/helper/websocket/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ArrayBufferLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Blob<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CloseEvent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Event<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MessageEvent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type WSContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type WSMessageReceive = string | Blob | ArrayBufferLike

export interface WSEvents<T = unknown> {
  onOpen?: (evt: Event, ws: WSContext<T>) => void
  onMessage?: (evt: MessageEvent<WSMessageReceive>, ws: WSContext<T>) => void
  onClose?: (evt: CloseEvent, ws: WSContext<T>) => void
  onError?: (evt: Event, ws: WSContext<T>) => void
}

export type WebSocketHelperDefineHandler<T, U> = (
  c: Context,
  events: WSEvents<T>,
  options?: U
) => Promise<Response | void> | Response | void
