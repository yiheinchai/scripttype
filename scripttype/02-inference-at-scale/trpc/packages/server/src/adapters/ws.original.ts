/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/adapters/ws.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type BaseHandlerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type CreateContextCallback<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Encoder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IncomingMessage<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaybePromise<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NodeHTTPCreateContextFnOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type inferRouterContext<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ws<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CreateWSSContextFnOptions = NodeHTTPCreateContextFnOptions<
  IncomingMessage,
  ws.WebSocket
>;

export type CreateWSSContextFn<TRouter extends AnyRouter> = (
  opts: CreateWSSContextFnOptions,
) => MaybePromise<inferRouterContext<TRouter>>;

export type WSConnectionHandlerOptions<TRouter extends AnyRouter> =
  BaseHandlerOptions<TRouter, IncomingMessage> &
    CreateContextCallback<
      inferRouterContext<TRouter>,
      CreateWSSContextFn<TRouter>
    >;

export type WSSHandlerOptions<TRouter extends AnyRouter> =
  WSConnectionHandlerOptions<TRouter> & {
    wss: ws.WebSocketServer;
    prefix?: string;
    keepAlive?: {
      /**
       * Enable heartbeat messages
       * @default false
       */
      enabled: boolean;
      /**
       * Heartbeat interval in milliseconds
       * @default 30_000
       */
      pingMs?: number;
      /**
       * Terminate the WebSocket if no pong is received after this many milliseconds
       * @default 5_000
       */
      pongWaitMs?: number;
    };
    /**
     * Disable responding to ping messages from the client
     * **Not recommended** - this is mainly used for testing
     * @default false
     */
    dangerouslyDisablePong?: boolean;
    /**
     * Custom encoder for wire encoding (e.g. custom binary formats)
     * @default jsonEncoder
     */
    experimental_encoder?: Encoder;
  };
