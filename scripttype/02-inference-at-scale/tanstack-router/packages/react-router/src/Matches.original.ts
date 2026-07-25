/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-router/src/Matches.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type DeepPartial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Expand<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeOptionalPathParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeOptionalSearchParams<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MakeRouteMatchUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MaskOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MatchRouteOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type React<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResolveRoute<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ToSubOptionsProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UseMatchRouteOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '',
> = ToSubOptionsProps<TRouter, TFrom, TTo> &
  DeepPartial<MakeOptionalSearchParams<TRouter, TFrom, TTo>> &
  DeepPartial<MakeOptionalPathParams<TRouter, TFrom, TTo>> &
  MaskOptions<TRouter, TMaskFrom, TMaskTo> &
  MatchRouteOptions

export type MakeMatchRouteOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '',
> = UseMatchRouteOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo> & {
  // If a function is passed as a child, it will be given the `isActive` boolean to aid in further styling on the element it returns
  children?:
    | ((
        params?: Expand<
          ResolveRoute<TRouter, TFrom, TTo>['types']['allParams']
        >,
      ) => React.ReactNode)
    | React.ReactNode
}

export type UseMatchesResult<
  TRouter extends AnyRouter,
  TSelected,
> = unknown extends TSelected ? Array<MakeRouteMatchUnion<TRouter>> : TSelected
