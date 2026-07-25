/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cluster/Message.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type IncomingEnvelope<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IncomingRequest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IncomingRequestLocal<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutgoingEnvelope<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type OutgoingRequest<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Rpc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Incoming<R extends Rpc.Any> = IncomingRequest<R> | IncomingEnvelope

export type IncomingLocal<R extends Rpc.Any> = IncomingRequestLocal<R> | IncomingEnvelope

export type Outgoing<R extends Rpc.Any> = OutgoingRequest<R> | OutgoingEnvelope
