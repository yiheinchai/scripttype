/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/typePrimitives.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constrain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConstrainLiteral<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type FromPathOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NavigateOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PathParamOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RedirectOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RouteIds<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SearchParamOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToPathOption<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseParamsResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSearchResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ValidateFromPath<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom = string,
> = FromPathOption<TRouter, TFrom>

export type ValidateToPath<
  TRouter extends AnyRouter = RegisteredRouter,
  TTo extends string | undefined = undefined,
  TFrom extends string = string,
> = ToPathOption<TRouter, TFrom, TTo>

export type ValidateSearch<
  TRouter extends AnyRouter = RegisteredRouter,
  TTo extends string | undefined = undefined,
  TFrom extends string = string,
> = SearchParamOptions<TRouter, TFrom, TTo>

export type ValidateParams<
  TRouter extends AnyRouter = RegisteredRouter,
  TTo extends string | undefined = undefined,
  TFrom extends string = string,
> = PathParamOptions<TRouter, TFrom, TTo>

export type InferFrom<
  TOptions,
  TDefaultFrom extends string = string,
> = TOptions extends {
  from: infer TFrom extends string
}
  ? TFrom
  : TDefaultFrom

export type InferTo<TOptions> = TOptions extends {
  to: infer TTo extends string
}
  ? TTo
  : undefined

export type InferMaskTo<TOptions> = TOptions extends {
  mask: { to: infer TTo extends string }
}
  ? TTo
  : ''

export type InferMaskFrom<TOptions> = TOptions extends {
  mask: { from: infer TFrom extends string }
}
  ? TFrom
  : string

export type ValidateNavigateOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TOptions = unknown,
  TDefaultFrom extends string = string,
> = Constrain<
  TOptions,
  NavigateOptions<
    TRouter,
    InferFrom<TOptions, TDefaultFrom>,
    InferTo<TOptions>,
    InferMaskFrom<TOptions>,
    InferMaskTo<TOptions>
  >
>

export type ValidateNavigateOptionsArray<
  TRouter extends AnyRouter = RegisteredRouter,
  TOptions extends ReadonlyArray<any> = ReadonlyArray<unknown>,
  TDefaultFrom extends string = string,
> = {
  [K in keyof TOptions]: ValidateNavigateOptions<
    TRouter,
    TOptions[K],
    TDefaultFrom
  >
}

export type ValidateRedirectOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TOptions = unknown,
  TDefaultFrom extends string = string,
> = Constrain<
  TOptions,
  RedirectOptions<
    TRouter,
    InferFrom<TOptions, TDefaultFrom>,
    InferTo<TOptions>,
    InferMaskFrom<TOptions>,
    InferMaskTo<TOptions>
  >
>

export type ValidateRedirectOptionsArray<
  TRouter extends AnyRouter = RegisteredRouter,
  TOptions extends ReadonlyArray<any> = ReadonlyArray<unknown>,
  TDefaultFrom extends string = string,
> = {
  [K in keyof TOptions]: ValidateRedirectOptions<
    TRouter,
    TOptions[K],
    TDefaultFrom
  >
}

export type ValidateId<
  TRouter extends AnyRouter = RegisteredRouter,
  TId extends string = string,
> = ConstrainLiteral<TId, RouteIds<TRouter['routeTree']>>

export type InferStrict<TOptions> = TOptions extends {
  strict: infer TStrict extends boolean
}
  ? TStrict
  : true

export type InferShouldThrow<TOptions> = TOptions extends {
  shouldThrow: infer TShouldThrow extends boolean
}
  ? TShouldThrow
  : true

export type InferSelected<TOptions> = TOptions extends {
  select: (...args: Array<any>) => infer TSelected
}
  ? TSelected
  : unknown

export type ValidateUseSearchResult<
  TOptions,
  TRouter extends AnyRouter = RegisteredRouter,
> = UseSearchResult<
  TRouter,
  InferFrom<TOptions>,
  InferStrict<TOptions>,
  InferSelected<TOptions>
>

export type ValidateUseParamsResult<
  TOptions,
  TRouter extends AnyRouter = RegisteredRouter,
> = Constrain<
  TOptions,
  UseParamsResult<
    TRouter,
    InferFrom<TOptions>,
    InferStrict<TOptions>,
    InferSelected<TOptions>
  >
>
