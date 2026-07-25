/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/types/_refine.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TSchema<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type TRefineCheckCallback<Value extends unknown = unknown> = (value: Value) => boolean

export type TRefineErrorCallback<Value extends unknown = unknown> = (value: Value) => string

export interface TRefinement<Value extends unknown = unknown> {
  check: TRefineCheckCallback<Value>
  error: TRefineErrorCallback<Value>
}

export type TRefine<Type extends TSchema = TSchema> = (
  Type & { '~refine': TRefinement<unknown>[] }
)

export type TRefineAdd<Type extends TSchema = TSchema> = (
  '~refine' extends keyof Type ? Type : TRefine<Type>
)
