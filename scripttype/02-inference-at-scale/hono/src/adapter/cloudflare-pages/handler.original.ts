/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/adapter/cloudflare-pages/handler.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Request<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequestInit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type fetch<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Params<P extends string = any> = Record<P, string | string[]>

export type EventContext<Env = {}, P extends string = any, Data = Record<string, unknown>> = {
  request: Request
  functionPath: string
  waitUntil: (promise: Promise<unknown>) => void
  passThroughOnException: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>
  env: Env & { ASSETS: { fetch: typeof fetch } }
  params: Params<P>
  data: Data
}

export declare type PagesFunction<
  Env = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = (context: EventContext<Env, Params, Data>) => Response | Promise<Response>
