/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-start-client/src/Hydrate.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CoreHydrationStrategy<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HydrationPrefetchFunction<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HydrationPrefetchStrategy<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HydrationWhen<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type React<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type HydrateWhen =
  | ReactHydrationStrategy
  | (() => ReactHydrationStrategy)

export type HydrateCommonOptions = {
  when: HydrateWhen
  fallback?: React.ReactNode
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
  children: React.ReactNode
}

export type ReactHydrationStrategy<
  TWhen extends HydrationWhen = HydrationWhen,
  TCanPrefetch extends boolean = boolean,
> = CoreHydrationStrategy<TWhen, TCanPrefetch> & {
  _h: (this: ReactHydrationStrategy, props: HydrateProps) => React.JSX.Element
}

export type HydrationStrategy<
  TWhen extends HydrationWhen = HydrationWhen,
  TCanPrefetch extends boolean = boolean,
> = ReactHydrationStrategy<TWhen, TCanPrefetch>
