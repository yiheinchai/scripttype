/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/solid-start-client/src/Hydrate.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CoreHydrationStrategy<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HydrationPrefetchFunction<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HydrationPrefetchStrategy<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type HydrationWhen<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Solid<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type HydrateWhen =
  | SolidHydrationStrategy
  | (() => SolidHydrationStrategy)

export type HydrateCommonOptions = {
  when: HydrateWhen
  fallback?: Solid.JSX.Element
  onHydrated?: () => void
}

export type HydrateOptions =
  | (HydrateCommonOptions & {
      prefetch?: never
      split?: boolean
    })
  | (HydrateCommonOptions & {
      prefetch: HydrationPrefetchStrategy
      split?: true
    })
  | (HydrateCommonOptions & {
      prefetch: HydrationPrefetchFunction
      split?: boolean
    })

export type HydrateProps = HydrateOptions & {
  children: Solid.JSX.Element
}

export type SolidHydrationStrategy<
  TWhen extends HydrationWhen = HydrationWhen,
  TCanPrefetch extends boolean = boolean,
> = CoreHydrationStrategy<TWhen, TCanPrefetch> & {
  _h: (props: HydrateProps) => Solid.JSX.Element
}

export type HydrationStrategy<
  TWhen extends HydrationWhen = HydrationWhen,
  TCanPrefetch extends boolean = boolean,
> = SolidHydrationStrategy<TWhen, TCanPrefetch>
