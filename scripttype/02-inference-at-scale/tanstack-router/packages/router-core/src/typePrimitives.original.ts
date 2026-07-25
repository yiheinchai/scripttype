/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/typePrimitives.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Constrain<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ConstrainLiteral<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type FromPathOption<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type NavigateOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type PathParamOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RedirectOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RegisteredRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RouteIds<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SearchParamOptions<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ToPathOption<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseParamsResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type UseSearchResult<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
