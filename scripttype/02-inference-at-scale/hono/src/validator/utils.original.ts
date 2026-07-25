/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/validator/utils.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FormValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParsedFormValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UnionToIntersection<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidationTargets<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsLiteralUnion<T, Base> = [Exclude<T, undefined>] extends [Base]
  ? [Exclude<T, undefined>] extends [UnionToIntersection<Exclude<T, undefined>>]
    ? false
    : true
  : false

export type IsOptionalUnion<T> = [unknown] extends [T]
  ? false // unknown or any
  : undefined extends T
    ? true
    : false

export type SimplifyDeep<T> = { [K in keyof T]: T[K] } & {}

export type InferInputInner<
  Output,
  Target extends keyof ValidationTargets,
  T extends FormValue,
> = SimplifyDeep<{
  [K in keyof Output]: IsLiteralUnion<Output[K], string> extends true
    ? Output[K]
    : IsOptionalUnion<Output[K]> extends true
      ? Output[K]
      : Target extends 'form'
        ? T | T[]
        : Target extends 'query'
          ? string | string[]
          : Target extends 'param'
            ? string
            : Target extends 'header'
              ? string
              : Target extends 'cookie'
                ? string
                : unknown
}>

export type InferInput<
  Output,
  Target extends keyof ValidationTargets,
  T extends FormValue = ParsedFormValue,
> = [Exclude<Output, undefined>] extends [never]
  ? {}
  : [Exclude<Output, undefined>] extends [object]
    ? undefined extends Output
      ? SimplifyDeep<InferInputInner<Exclude<Output, undefined>, Target, T>> | undefined
      : SimplifyDeep<InferInputInner<Output, Target, T>>
    : {}
