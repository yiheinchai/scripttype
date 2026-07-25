/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/start-client-core/src/hydration/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Element<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Exclude<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type HydrationWhen =
  | 'load'
  | 'idle'
  | 'visible'
  | 'media'
  | 'interaction'
  | 'condition'
  | 'never'
  | 'dynamic'

export type HydrationStrategyTypes<
  TWhen extends HydrationWhen = HydrationWhen,
  TCanPrefetch extends boolean = boolean,
> = {
  when: TWhen
  canPrefetch: TCanPrefetch
}

export type HydrationRuntimeGate = {
  id?: string
  when?: HydrationWhen
  resolved: boolean
  resolve: () => void
}

export type HydrationRuntimeContext = {
  element: Element | null
  gate?: HydrationRuntimeGate
  prefetch?: () => void
  delegated?: boolean
}

export type HydrationMarkerAttributes = Record<string, string | undefined>

export type HydrationStrategy<
  TWhen extends HydrationWhen = HydrationWhen,
  TCanPrefetch extends boolean = boolean,
> = {
  _t?: TWhen
  readonly '~types'?: HydrationStrategyTypes<TWhen, TCanPrefetch>
  _d?: () => boolean
  _s?: (context: HydrationRuntimeContext) => void | (() => void)
  _o?: (id: string) => void
  _a?: () => HydrationMarkerAttributes | undefined
}

export type HydrationPrefetchWhen = Exclude<
  HydrationWhen,
  'condition' | 'never' | 'dynamic'
>

export type HydrationPrefetchStrategy<
  TWhen extends HydrationPrefetchWhen = HydrationPrefetchWhen,
> = HydrationStrategy<TWhen, true>
