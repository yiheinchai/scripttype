/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cluster/Envelope.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AckChunk<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EntityAddress<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Headers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Interrupt<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Snowflake<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Request<in out Rpc extends Rpc.Any> {
  readonly [TypeId]: typeof TypeId
  readonly _tag: "Request"
  readonly requestId: Snowflake
  readonly address: EntityAddress
  readonly tag: Rpc.Tag<Rpc>
  readonly payload: Rpc.Payload<Rpc>
  readonly headers: Headers.Headers
  readonly traceId?: string
  readonly spanId?: string
  readonly sampled?: boolean
}

export type Envelope<R extends Rpc.Any> = Request<R> | AckChunk | Interrupt
