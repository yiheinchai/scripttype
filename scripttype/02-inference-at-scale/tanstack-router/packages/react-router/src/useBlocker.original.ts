/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-router/src/useBlocker.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRoute<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type AnyRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HistoryAction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ParseRoute<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type React<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type RegisteredRouter<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type ShouldBlockFnLocation<
  out TRouteId,
  out TFullPath,
  out TAllParams,
  out TFullSearchSchema,
> = {
  routeId: TRouteId
  fullPath: TFullPath
  pathname: string
  params: TAllParams
  search: TFullSearchSchema
}

export type MakeShouldBlockFnLocationUnion<
  TRouter extends AnyRouter = RegisteredRouter,
  TRoute extends AnyRoute = ParseRoute<TRouter['routeTree']>,
> = TRoute extends any
  ? ShouldBlockFnLocation<
      TRoute['id'],
      TRoute['fullPath'],
      TRoute['types']['allParams'],
      TRoute['types']['fullSearchSchema']
    >
  : never

export type BlockerResolver<TRouter extends AnyRouter = RegisteredRouter> =
  | {
      status: 'blocked'
      current: MakeShouldBlockFnLocationUnion<TRouter>
      next: MakeShouldBlockFnLocationUnion<TRouter>
      action: HistoryAction
      proceed: () => void
      reset: () => void
    }
  | {
      status: 'idle'
      current: undefined
      next: undefined
      action: undefined
      proceed: undefined
      reset: undefined
    }

export type ShouldBlockFnArgs<TRouter extends AnyRouter = RegisteredRouter> = {
  current: MakeShouldBlockFnLocationUnion<TRouter>
  next: MakeShouldBlockFnLocationUnion<TRouter>
  action: HistoryAction
}

export type ShouldBlockFn<TRouter extends AnyRouter = RegisteredRouter> = (
  args: ShouldBlockFnArgs<TRouter>,
) => boolean | Promise<boolean>

export type UseBlockerOpts<
  TRouter extends AnyRouter = RegisteredRouter,
  TWithResolver extends boolean = boolean,
> = {
  shouldBlockFn: ShouldBlockFn<TRouter>
  enableBeforeUnload?: boolean | (() => boolean)
  disabled?: boolean
  withResolver?: TWithResolver
}

export type PromptProps<
  TRouter extends AnyRouter = RegisteredRouter,
  TWithResolver extends boolean = boolean,
  TParams = TWithResolver extends true ? BlockerResolver<TRouter> : void,
> = UseBlockerOpts<TRouter, TWithResolver> & {
  children?: React.ReactNode | ((params: TParams) => React.ReactNode)
}
