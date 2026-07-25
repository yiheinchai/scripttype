/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/platform-bun/src/BunHttpServer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Bun<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Deferred<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ServerWebSocket<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Socket<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uint8Array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface WebSocketContext {
  readonly deferred: Deferred.Deferred<ServerWebSocket<WebSocketContext>>
  readonly closeDeferred: Deferred.Deferred<void, Socket.SocketError>
  readonly buffer: Array<Uint8Array | string>
  run: (_: Uint8Array | string) => void
}

export type ServeOptions<R extends string> =
  & (
    | Bun.Serve.UnixServeOptions<WebSocketContext>
    | Bun.Serve.HostnamePortServeOptions<WebSocketContext>
  )
  & { readonly routes?: Bun.Serve.Routes<WebSocketContext, R> }
