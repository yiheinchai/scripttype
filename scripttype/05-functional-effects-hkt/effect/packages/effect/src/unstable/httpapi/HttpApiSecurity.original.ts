/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/httpapi/HttpApiSecurity.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Covariant<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Redacted<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
