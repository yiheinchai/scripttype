/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/persistence/Persistable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Duration<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Persistable<A extends Schema.Constraint, E extends Schema.Constraint> extends PrimaryKey.PrimaryKey {
  readonly [symbol]: {
    readonly success: A
    readonly error: E
  }
}

export type Any = Persistable<Schema.Constraint, Schema.Constraint>

export type SuccessSchema<A extends Any> = A["~effect/persistence/Persistable"]["success"]

export type Success<A extends Any> = A["~effect/persistence/Persistable"]["success"]["Type"]

export type ErrorSchema<A extends Any> = A["~effect/persistence/Persistable"]["error"]

export type Error<A extends Any> = A["~effect/persistence/Persistable"]["error"]["Type"]

export type DecodingServices<A extends Any> =
  | A["~effect/persistence/Persistable"]["success"]["DecodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["DecodingServices"]

export type EncodingServices<A extends Any> =
  | A["~effect/persistence/Persistable"]["success"]["EncodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["EncodingServices"]

export type Services<A extends Any> =
  | A["~effect/persistence/Persistable"]["success"]["DecodingServices"]
  | A["~effect/persistence/Persistable"]["success"]["EncodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["DecodingServices"]
  | A["~effect/persistence/Persistable"]["error"]["EncodingServices"]

export type TimeToLiveFn<K extends Any> = (exit: Exit.Exit<Success<K>, Error<K>>, request: K) => Duration.Input
