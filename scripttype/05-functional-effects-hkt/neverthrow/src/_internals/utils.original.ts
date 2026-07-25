/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/neverthrow/src/_internals/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Result<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ResultAsync<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ExtractOkTypes<T extends readonly Result<unknown, unknown>[]> = {
  [idx in keyof T]: T[idx] extends Result<infer U, unknown> ? U : never
}

export type ExtractOkAsyncTypes<T extends readonly ResultAsync<unknown, unknown>[]> = {
  [idx in keyof T]: T[idx] extends ResultAsync<infer U, unknown> ? U : never
}

export type ExtractErrTypes<T extends readonly Result<unknown, unknown>[]> = {
  [idx in keyof T]: T[idx] extends Result<unknown, infer E> ? E : never
}

export type ExtractErrAsyncTypes<T extends readonly ResultAsync<unknown, unknown>[]> = {
  [idx in keyof T]: T[idx] extends ResultAsync<unknown, infer E> ? E : never
}

export type InferOkTypes<R> = R extends Result<infer T, unknown> ? T : never

export type InferErrTypes<R> = R extends Result<unknown, infer E> ? E : never

export type InferAsyncOkTypes<R> = R extends ResultAsync<infer T, unknown> ? T : never

export type InferAsyncErrTypes<R> = R extends ResultAsync<unknown, infer E> ? E : never
