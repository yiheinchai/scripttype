/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/vue-router/src/link.tsx, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnchorHTMLAttributes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Event<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type HTMLElementTagNameMap<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LinkOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MouseEvent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReservedProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RoutePaths<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TouchEvent<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateLinkOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateLinkOptionsArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Vue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type EventHandler<TEvent = Event> = (e: TEvent) => void

export type PropsOfComponent<TComp> =
  // Functional components
  TComp extends (props: infer P, ...args: Array<unknown>) => any
    ? P
    : // Vue components (defineComponent, class components, etc)
      TComp extends Vue.Component<infer P>
      ? P
      : Record<string, unknown>

export type DataAttributes = {
  [K in `data-${string}`]?: unknown
}

export type LinkHTMLAttributes = AnchorHTMLAttributes &
  ReservedProps &
  DataAttributes & {
    // Vue's runtime-dom types use lowercase event names.
    // Also accept camelCase versions for external API compatibility.
    onMouseEnter?: EventHandler<MouseEvent>
    onMouseLeave?: EventHandler<MouseEvent>
    onMouseOver?: EventHandler<MouseEvent>
    onMouseOut?: EventHandler<MouseEvent>
    onTouchStart?: EventHandler<TouchEvent>

    // `disabled` is not a valid <a> attribute, but is useful when using `asChild`.
    disabled?: boolean
  }

export type ActiveLinkProps<TComp> = Partial<
  (TComp extends keyof HTMLElementTagNameMap
    ? LinkHTMLAttributes
    : PropsOfComponent<TComp>) & {
    [key: `data-${string}`]: unknown
  }
>

export interface ActiveLinkOptionProps<TComp = 'a'> {
  /**
   * A function that returns additional props for the `active` state of this link.
   * These props override other props passed to the link (`style`'s are merged, `class`'s are concatenated)
   */
  activeProps?: ActiveLinkProps<TComp> | (() => ActiveLinkProps<TComp>)
  /**
   * A function that returns additional props for the `inactive` state of this link.
   * These props override other props passed to the link (`style`'s are merged, `class`'s are concatenated)
   */
  inactiveProps?: ActiveLinkProps<TComp> | (() => ActiveLinkProps<TComp>)
}

export type ActiveLinkOptions<
  TComp = 'a',
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = '.',
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '.',
> = LinkOptions<TRouter, TFrom, TTo, TMaskFrom, TMaskTo> &
  ActiveLinkOptionProps<TComp>

export type UseLinkPropsOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends RoutePaths<TRouter['routeTree']> | string = string,
  TTo extends string | undefined = '.',
  TMaskFrom extends RoutePaths<TRouter['routeTree']> | string = TFrom,
  TMaskTo extends string = '.',
> = ActiveLinkOptions<'a', TRouter, TFrom, TTo, TMaskFrom, TMaskTo> &
  LinkHTMLAttributes

export interface LinkPropsChildren {
  // If a function is passed as a child, it will be given the `isActive` boolean to aid in further styling on the element it returns
  children?:
    | Vue.VNodeChild
    | ((state: {
        isActive: boolean
        isTransitioning: boolean
      }) => Vue.VNodeChild)
}

export type LinkProps<
  TComp = 'a',
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = '.',
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '.',
> = ActiveLinkOptions<TComp, TRouter, TFrom, TTo, TMaskFrom, TMaskTo> &
  LinkPropsChildren

export type CreateLinkProps = LinkProps<
  any,
  any,
  string,
  string,
  string,
  string
>

export type LinkComponentVueProps<TComp> = TComp extends keyof HTMLElementTagNameMap
  ? Omit<LinkHTMLAttributes, keyof CreateLinkProps>
  : Omit<PropsOfComponent<TComp>, keyof CreateLinkProps>

export type LinkComponentProps<
  TComp = 'a',
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = '.',
  TMaskFrom extends string = TFrom,
  TMaskTo extends string = '.',
> = LinkComponentVueProps<TComp> &
  LinkProps<TComp, TRouter, TFrom, TTo, TMaskFrom, TMaskTo>

export type LinkComponent<
  in out TComp,
  in out TDefaultFrom extends string = string,
> = <
  TRouter extends AnyRouter = RegisteredRouter,
  const TFrom extends string = TDefaultFrom,
  const TTo extends string | undefined = undefined,
  const TMaskFrom extends string = TFrom,
  const TMaskTo extends string = '',
>(
  props: LinkComponentProps<TComp, TRouter, TFrom, TTo, TMaskFrom, TMaskTo>,
) => Vue.VNode

export type LinkOptionsFnOptions<
  TOptions,
  TComp,
  TRouter extends AnyRouter = RegisteredRouter,
> =
  TOptions extends ReadonlyArray<any>
    ? ValidateLinkOptionsArray<TRouter, TOptions, string, TComp>
    : ValidateLinkOptions<TRouter, TOptions, string, TComp>

export type LinkOptionsFn<TComp> = <
  const TOptions,
  TRouter extends AnyRouter = RegisteredRouter,
>(
  options: LinkOptionsFnOptions<TOptions, TComp, TRouter>,
) => TOptions
