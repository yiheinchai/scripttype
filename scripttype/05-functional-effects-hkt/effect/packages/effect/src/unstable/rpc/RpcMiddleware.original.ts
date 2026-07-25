/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/rpc/RpcMiddleware.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Schema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Provides<A> = A extends { readonly [TypeId]: { readonly provides: infer P } } ? P : never

export type Requires<A> = A extends { readonly [TypeId]: { readonly requires: infer R } } ? R : never

export type ApplyServices<A, R> = Exclude<R, Provides<A>> | Requires<A>

export type ErrorSchema<A> = A extends { readonly [TypeId]: { readonly error: infer E } }
  ? E extends Schema.Constraint ? E : never
  : never

export type Error<A> = ErrorSchema<A>["Type"]

export type ErrorServicesEncode<A> = ErrorSchema<A>["EncodingServices"]

export type ErrorServicesDecode<A> = ErrorSchema<A>["DecodingServices"]
