/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Blob<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type CustomHeader<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type File<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HonoBase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IfAnyThenEmptyObject<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type IsAny<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type JSONValue<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Lowercase<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RemoveBlankRecord<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RequestHeader<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Response<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Simplify<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type StatusCode<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UnionToIntersection<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type KnownResponseFormat = 'json' | 'text' | 'redirect'

export type ResponseFormat = KnownResponseFormat | string

export type Input = {
  in?: {}
  out?: {}
  outputFormat?: ResponseFormat
}

export type ExtractInput<I extends Input | Input['in']> = I extends Input
  ? unknown extends I['in']
    ? {}
    : I['in']
  : I

export type TypedResponse<
  T = unknown,
  U extends StatusCode = StatusCode,
  F extends ResponseFormat = T extends string
    ? 'text'
    : T extends JSONValue
      ? 'json'
      : ResponseFormat,
> = {
  _data: T
  _status: U
  _format: F
}

export type HandlerResponse<O> =
  | Response
  | TypedResponse<O>
  | Promise<Response | TypedResponse<O>>
  | Promise<void>

export type Bindings = object

export type Variables = object

export type Env = {
  Bindings?: Bindings
  Variables?: Variables
}

export type BlankInput = {}

export type Next = () => Promise<void>

export type Handler<
  E extends Env = any,
  P extends string = any,
  I extends Input = BlankInput,
  R extends HandlerResponse<any> = any,
> = (c: Context<E, P, I>, next: Next) => R

export type MiddlewareHandler<
  E extends Env = any,
  P extends string = string,
  I extends Input = {},
  R extends HandlerResponse<any> = Response,
> = (c: Context<E, P, I>, next: Next) => Promise<R | void>

export type H<
  E extends Env = any,
  P extends string = any,
  I extends Input = BlankInput,
  R extends HandlerResponse<any> = any,
> = Handler<E, P, I, R> | MiddlewareHandler<E, P, I, R>

export interface NotFoundResponse {}

export type NotFoundHandler<E extends Env = any> = (
  c: Context<E>
) => NotFoundResponse extends Response
  ? NotFoundResponse | Promise<NotFoundResponse>
  : Response | Promise<Response>

export interface HTTPResponseError extends Error {
  getResponse: () => Response
}

export type ErrorHandler<E extends Env = any> = (
  err: Error | HTTPResponseError,
  c: Context<E>
) => Response | Promise<Response>

export type ToSchemaOutput<RorO, I extends Input | Input['in']> =
  RorO extends TypedResponse<infer T, infer U, infer F>
    ? {
        output: unknown extends T ? {} : T
        outputFormat: I extends { outputFormat: string } ? I['outputFormat'] : F
        status: U
      }
    : {
        output: unknown extends RorO ? {} : RorO
        outputFormat: unknown extends RorO
          ? 'json'
          : I extends { outputFormat: string }
            ? I['outputFormat']
            : 'json'
        status: StatusCode
      }

export type AddDollar<T extends string> = `$${Lowercase<T>}`

export type ParamKey<Component> = Component extends `:${infer NameWithPattern}`
  ? NameWithPattern extends `${infer Name}{${infer Rest}`
    ? Rest extends `${infer _Pattern}?`
      ? `${Name}?`
      : Name
    : NameWithPattern
  : never

export type ParamKeys<Path> = Path extends `${infer Component}/${infer Rest}`
  ? ParamKey<Component> | ParamKeys<Rest>
  : ParamKey<Path>

export type ParamKeyToRecord<T extends string> = T extends `${infer R}?`
  ? Record<R, string | undefined>
  : { [K in T]: string }

export type AddParam<I, P extends string> =
  ParamKeys<P> extends never
    ? I
    : I extends { param: infer _ }
      ? I
      : I & { param: UnionToIntersection<ParamKeyToRecord<ParamKeys<P>>> }

export type ToSchema<
  M extends string,
  P extends string,
  I extends Input | Input['in'],
  RorO, // Response or Output
> =
  IsAny<RorO> extends true
    ? {
        [K in P]: {
          [K2 in M as AddDollar<K2>]: {
            input: AddParam<ExtractInput<I>, P>
            output: {}
            outputFormat: ResponseFormat
            status: StatusCode
          }
        }
      }
    : [RorO] extends [never]
      ? {}
      : [RorO] extends [Promise<void>]
        ? {}
        : {
            [K in P]: {
              [K2 in M as AddDollar<K2>]: Simplify<
                {
                  input: AddParam<ExtractInput<I>, P>
                } & ToSchemaOutput<RorO, I>
              >
            }
          }

export type Endpoint = {
  input: any
  output: any
  outputFormat: ResponseFormat
  status: StatusCode
}

export type Schema = {
  [Path: string]: {
    [Method: `$${Lowercase<string>}`]: Endpoint
  }
}

export type MergePath<A extends string, B extends string> = B extends ''
  ? MergePath<A, '/'>
  : A extends ''
    ? B
    : A extends '/'
      ? B
      : A extends `${infer P}/`
        ? B extends `/${infer Q}`
          ? `${P}/${Q}`
          : `${P}/${B}`
        : B extends `/${infer Q}`
          ? Q extends ''
            ? A
            : `${A}/${Q}`
          : `${A}/${B}`

export type AddSchemaIfHasResponse<
  Merged,
  S extends Schema,
  M extends string,
  P extends string,
  I extends Input | Input['in'],
  BasePath extends string,
> = [Merged] extends [Promise<void>] ? S : S & ToSchema<M, MergePath<BasePath, P>, I, Merged>

export type ExtractParams<Path extends string> = string extends Path
  ? Record<string, string>
  : Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
    : Path extends `${infer _Start}:${infer Param}`
      ? { [K in Param]: string }
      : never

export type FlattenIfIntersect<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type MergeEndpointParamsWithPath<T extends Endpoint, SubPath extends string> = T extends unknown
  ? {
      input: T['input'] extends { param: infer _ }
        ? ExtractParams<SubPath> extends never
          ? T['input']
          : FlattenIfIntersect<
              T['input'] & {
                param: {
                  // Maps extracted keys, stripping braces, to a string-typed record.
                  [K in keyof ExtractParams<SubPath> as K extends `${infer Prefix}{${infer _}}`
                    ? Prefix
                    : K]: string
                }
              }
            >
        : RemoveBlankRecord<ExtractParams<SubPath>> extends never
          ? T['input']
          : T['input'] & {
              // Maps extracted keys, stripping braces, to a string-typed record.
              param: {
                [K in keyof ExtractParams<SubPath> as K extends `${infer Prefix}{${infer _}}`
                  ? Prefix
                  : K]: string
              }
            }
      output: T['output']
      outputFormat: T['outputFormat']
      status: T['status']
    }
  : never

export type MergeSchemaPath<OrigSchema extends Schema, SubPath extends string> = {
  [P in keyof OrigSchema as MergePath<SubPath, P & string>]: [OrigSchema[P]] extends [
    Record<string, Endpoint>,
  ]
    ? { [M in keyof OrigSchema[P]]: MergeEndpointParamsWithPath<OrigSchema[P][M], SubPath> }
    : never
}

export type MergeTypedResponse<T> =
  T extends Promise<void>
    ? T
    : T extends Promise<infer T2>
      ? T2 extends TypedResponse
        ? T2
        : TypedResponse
      : T extends TypedResponse
        ? T
        : TypedResponse

export type ExtractTypedResponseOnly<T> = T extends TypedResponse ? T : never

export type MergeMiddlewareResponse<T> = T extends (c: any, next: any) => Promise<infer R>
  ? Exclude<R, void> extends never
    ? never
    : Exclude<R, void> extends Response | TypedResponse<any, any, any>
      ? ExtractTypedResponseOnly<Exclude<R, void>>
      : never
  : T extends (c: any, next: any) => infer R
    ? R extends Response | TypedResponse<any, any, any>
      ? ExtractTypedResponseOnly<R>
      : never
    : never

export type FormValue = string | Blob

export type ParsedFormValue = string | File

export type ValidationTargets<T extends FormValue = ParsedFormValue, P extends string = string> = {
  json: any
  form: Record<string, T | T[]>
  query: Record<string, string | string[]>
  param: Record<P, P extends `${infer _}?` ? string | undefined : string>
  header: Record<RequestHeader | CustomHeader, string>
  cookie: Record<string, string>
}

export type InputToDataByTarget<
  T extends Input['out'],
  Target extends keyof ValidationTargets,
> = T extends {
  [K in Target]: infer R
}
  ? R
  : never

export type RemoveQuestion<T> = T extends `${infer R}?` ? R : T

export type ExtractSchema<T> = UnionToIntersection<
  T extends HonoBase<infer _, infer S, any, any> ? S : never
>

export type ExtractSchemaForStatusCode<T, Status extends number> = {
  [Path in keyof ExtractSchema<T>]: {
    [Method in keyof ExtractSchema<T>[Path]]: Extract<
      ExtractSchema<T>[Path][Method],
      { status: Status }
    >
  }
}

export type ExtractHandlerResponse<T> = T extends (c: any, next: any) => Promise<infer R>
  ? Exclude<R, void> extends never
    ? never // Only void in the type → filter out
    : Exclude<R, void> extends Response | TypedResponse<any, any, any>
      ? Exclude<R, void> // Return the response type without void
      : never // Invalid response type → filter out
  : T extends (c: any, next: any) => infer R
    ? R extends Response | TypedResponse<any, any, any>
      ? R
      : never
    : never

export type ProcessHead<T> = IfAnyThenEmptyObject<T extends Env ? (Env extends T ? {} : T) : T>

export type IntersectNonAnyTypes<T extends any[]> = T extends [infer Head, ...infer Rest]
  ? ProcessHead<Head> & IntersectNonAnyTypes<Rest>
  : {}
