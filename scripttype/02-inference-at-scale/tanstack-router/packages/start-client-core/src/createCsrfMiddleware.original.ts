/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-client-core/src/createCsrfMiddleware.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Register<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RequestServerOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CsrfMatcher<TValue, TRegister = Register, TMiddlewares = unknown> =
  | TValue
  | Array<TValue>
  | ((
      value: TValue | (string & {}),
      ctx: RequestServerOptions<TRegister, TMiddlewares>,
    ) => boolean | Promise<boolean>)
