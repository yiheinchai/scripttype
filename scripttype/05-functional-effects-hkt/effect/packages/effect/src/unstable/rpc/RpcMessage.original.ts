/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/rpc/RpcMessage.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Branded<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Headers<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonEmptyReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Rpc<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type RequestId = Branded<string | number, "~effect/rpc/RpcMessage/RequestId">

export interface Request<A extends Rpc.Any> {
  readonly _tag: "Request"
  readonly id: RequestId
  readonly tag: Rpc.Tag<A>
  readonly payload: Rpc.Payload<A>
  readonly headers: Headers
  readonly traceId?: string
  readonly spanId?: string
  readonly sampled?: boolean
}

export interface Ack {
  readonly _tag: "Ack"
  readonly requestId: RequestId
}

export interface Interrupt {
  readonly _tag: "Interrupt"
  readonly requestId: RequestId
  readonly interruptors: ReadonlyArray<number>
}

export interface Eof {
  readonly _tag: "Eof"
}

export type FromClient<A extends Rpc.Any> = Request<A> | Ack | Interrupt | Eof

export interface ResponseChunk<A extends Rpc.Any> {
  readonly _tag: "Chunk"
  readonly clientId: number
  readonly requestId: RequestId
  readonly values: NonEmptyReadonlyArray<Rpc.SuccessChunk<A>>
}

export interface ResponseExit<A extends Rpc.Any> {
  readonly _tag: "Exit"
  readonly clientId: number
  readonly requestId: RequestId
  readonly exit: Rpc.Exit<A>
}

export interface ResponseDefect {
  readonly _tag: "Defect"
  readonly clientId: number
  readonly defect: unknown
}

export interface ClientEnd {
  readonly _tag: "ClientEnd"
  readonly clientId: number
}

export type FromServer<A extends Rpc.Any> =
  | ResponseChunk<A>
  | ResponseExit<A>
  | ResponseDefect
  | ClientEnd

export type ExitEncoded<A, E> = {
  readonly _tag: "Success"
  readonly value: A
} | {
  readonly _tag: "Failure"
  readonly cause: ReadonlyArray<
    {
      readonly _tag: "Fail"
      readonly error: E
    } | {
      readonly _tag: "Die"
      readonly defect: unknown
    } | {
      readonly _tag: "Interrupt"
      readonly fiberId: number | undefined
    }
  >
}
