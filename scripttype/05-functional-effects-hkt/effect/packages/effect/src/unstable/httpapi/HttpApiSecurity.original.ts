/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiSecurity.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Covariant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Redacted<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Http extends HttpApiSecurity.Proto<Redacted> {
  readonly _tag: "Http"
  readonly scheme: string
  /** @internal */
  readonly schemeLength: number
}

export interface ApiKey extends HttpApiSecurity.Proto<Redacted> {
  readonly _tag: "ApiKey"
  readonly in: "header" | "query" | "cookie"
  readonly key: string
}

export interface Credentials {
  readonly username: string
  readonly password: Redacted
}

export interface Basic extends HttpApiSecurity.Proto<Credentials> {
  readonly _tag: "Basic"
}

export type HttpApiSecurity = Http | ApiKey | Basic

export interface Proto<out A> extends Pipeable {
    readonly [TypeId]: {
      readonly _A: Covariant<A>
    }
    readonly annotations: Context.Context<never>
  }

export type Type<A extends HttpApiSecurity> = A extends Proto<infer Out> ? Out : never
