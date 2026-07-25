/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/redirect.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HeadersInit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NavigateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ParsedLocation<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Response<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Redirect<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '.',
> = Response & {
  options: NavigateOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo> & {
    /**
     * @internal
     * A **trusted** built location that can be used to redirect to.
     */
    _builtLocation?: ParsedLocation
  }
  redirectHandled?: boolean
}

export type RedirectOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '.',
> = {
  href?: string
  /**
   * @deprecated Use `statusCode` instead
   **/
  code?: number
  /**
   * The HTTP status code to use when redirecting.
   * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RedirectType#statuscode-property)
   */
  statusCode?: number
  /**
   * If provided, will throw the redirect object instead of returning it. This can be useful in places where `throwing` in a function might cause it to have a return type of `never`. In that case, you can use `redirect({ throw: true })` to throw the redirect object instead of returning it.
   * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RedirectType#throw-property)
   */
  throw?: any
  /**
   * The HTTP headers to use when redirecting.
   * @link [API Docs](https://tanstack.com/router/latest/docs/framework/react/api/router/RedirectType#headers-property)
   */
  headers?: HeadersInit
  /**
   * @internal
   * A **trusted** built location that can be used to redirect to.
   */
  _builtLocation?: ParsedLocation
} & NavigateOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>

export type ResolvedRedirect<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string = '',
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '',
> = Redirect<TRouter, TFrom, TTo, TMaskFrom, TMaskTo>

export type RedirectOptionsRoute<
  TDefaultFrom extends string = string,
  TRouter extends AnyRouter = RegisteredRouter,
  TTo extends string | undefined = undefined,
  TMaskTo extends string = '',
> = Omit<
  RedirectOptions<TRouter, TDefaultFrom, TTo, TDefaultFrom, TMaskTo>,
  'from'
>
