/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/validator/validator.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Env<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypedResponse<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidationTargets<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
