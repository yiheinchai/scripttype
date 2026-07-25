/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-server-core/src/session.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type EncryptionAlgorithm = 'aes-128-ctr' | 'aes-256-cbc'

export type IntegrityAlgorithm = 'sha256'

export type _Algorithm = EncryptionAlgorithm | IntegrityAlgorithm

export type SealOptionsSub<TAlgorithm extends _Algorithm = _Algorithm> = Readonly<{
  /** The length of the salt (random buffer used to ensure that two identical objects will generate a different encrypted result). Defaults to 256. */
  saltBits: number
  /** The algorithm used. Defaults to 'aes-256-cbc' for encryption and 'sha256' for integrity. */
  algorithm: TAlgorithm
  /** The number of iterations used to derive a key from the password. Defaults to 1. */
  iterations: number
  /** Minimum password size. Defaults to 32. */
  minPasswordlength: number
}>

export type SessionDataT = Record<string, any>

export type SessionData<T extends SessionDataT = SessionDataT> = Partial<T>

export type SessionUpdate<T extends SessionData = SessionData> =
  | Partial<SessionData<T>>
  | ((oldData: SessionData<T>) => Partial<SessionData<T>> | undefined)
