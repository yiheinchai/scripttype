/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/validator/validator.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Env<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Response<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TypedResponse<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ValidationTargets<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ValidationTargetKeysWithBody = 'form' | 'json'

export type ValidationTargetByMethod<M> = M extends 'get' | 'head' // GET and HEAD request must not have a body content.
  ? Exclude<keyof ValidationTargets, ValidationTargetKeysWithBody>
  : keyof ValidationTargets

export type ValidationFunction<
  InputType,
  OutputType,
  E extends Env = {},
  P extends string = string,
> = (
  value: InputType,
  c: Context<E, P>
) => OutputType | TypedResponse | Promise<OutputType> | Promise<TypedResponse>

export type ExtractValidationResponse<VF> = VF extends (value: any, c: any) => infer R
  ? R extends Promise<infer PR>
    ? PR extends TypedResponse<infer T, infer S, infer F>
      ? TypedResponse<T, S, F>
      : PR extends Response
        ? PR
        : PR extends undefined
          ? never // undefined → never
          : never // anything else → never
    : R extends TypedResponse<infer T, infer S, infer F>
      ? TypedResponse<T, S, F>
      : R extends Response
        ? R
        : R extends undefined
          ? never // undefined → never
          : never // anything else → never
  : never

export type ExtractValidatorOutput<VF> = VF extends (value: any, c: any) => infer R
  ? R extends Promise<infer PR>
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      PR extends Response | TypedResponse<any, any, any>
      ? never
      : PR
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      R extends Response | TypedResponse<any, any, any>
      ? never
      : R
  : never
