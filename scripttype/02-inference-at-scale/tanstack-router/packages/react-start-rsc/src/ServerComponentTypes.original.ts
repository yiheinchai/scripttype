/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-start-rsc/src/ServerComponentTypes.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ComponentProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ComponentType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constrain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseAsyncReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LooseReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Parameters<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type React<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadableStream<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlySet<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uint8Array<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ValidateSerializable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ReactSerializable =
  | number
  | string
  | bigint
  | boolean
  | null
  | undefined
  | React.ReactNode

export type ValidateReactSerializable<T> = ValidateSerializable<
  T,
  ReactSerializable
>

export type ValidateCompositeComponentProp<TProp> = TProp extends (
  ...args: Array<any>
) => any
  ? (...args: ValidateReactSerializable<Parameters<TProp>>) => React.ReactNode
  : TProp extends ComponentType<any>
    ? ComponentType<ValidateReactSerializable<ComponentProps<TProp>>>
    : TProp extends React.ReactNode
      ? TProp
      : React.ReactNode

export type ValidateCompositeComponentPropsObject<TProps> =
  unknown extends TProps
    ? TProps
    : {
        [TKey in keyof TProps]: ValidateCompositeComponentProp<TProps[TKey]>
      }

export type CompositeComponentProps<TComp> = TComp extends (
  props: infer TProps,
) => any
  ? TProps
  : unknown

export type ValidateCompositeComponentProps<TComp> = unknown extends TComp
  ? TComp
  : ValidateCompositeComponentPropsObject<CompositeComponentProps<TComp>>

export type ValidateCompositeComponentPromiseResult<TPromise> =
  TPromise extends Promise<infer T>
    ? Promise<ValidateCompositeComponentResult<T>>
    : never

export type ValidateCompositeComponentObjectResult<TObject> = {
  [TKey in keyof TObject]: ValidateCompositeComponentResult<TObject[TKey]>
}

export type ValidateServerComponentResult<TNode> =
  TNode extends Promise<any>
    ? ValidateCompositeComponentPromiseResult<TNode>
    : TNode extends React.ReactNode
      ? TNode
      : TNode extends (...args: Array<any>) => any
        ? React.ReactNode
        : TNode extends object
          ? ValidateCompositeComponentObjectResult<TNode>
          : React.ReactNode

export type ValidateCompositeComponentResult<TNode> =
  ValidateServerComponentResult<TNode>

export type ValidateCompositeComponentReturnType<TComp> = unknown extends TComp
  ? React.ReactNode
  : ValidateCompositeComponentResult<LooseReturnType<TComp>>

export type ValidateCompositeComponent<TComp> = Constrain<
  TComp,
  (
    props: ValidateCompositeComponentProps<TComp>,
  ) => ValidateCompositeComponentReturnType<TComp>
>

export interface ServerComponentStream {
  createReplayStream: () => ReadableStream<Uint8Array>
}

export type RscSlotUsageEvent = {
  slot: string
  // Raw args passed to the slot call (must be serializable by the transport)
  args?: Array<any>
}

export interface CompositeComponent<in out TComp, in out TReturn> {
  '~types': {
    props: CompositeComponentProps<TComp>
    return: TReturn
  }

  [SERVER_COMPONENT_STREAM]?: ServerComponentStream

  /**
   * Root decoded tree getter.
   */
  [RSC_PROXY_GET_TREE]?: () => unknown
  /**
   * Nested selection path (eg ['content','Stats']).
   * Used by <CompositeComponent/> to render a sub-tree.
   */
  [RSC_PROXY_PATH]?: Array<string>
  /**
   * CSS hrefs collected from the RSC stream.
   * Can be used for preloading in <head> or emitting 103 Early Hints.
   */
  [SERVER_COMPONENT_CSS_HREFS]?: ReadonlySet<string>

  /**
   * JS hrefs collected from the RSC stream.
   * Emitted as modulepreload links only if the decoded tree is rendered in SSR.
   */
  [SERVER_COMPONENT_JS_PRELOADS]?: ReadonlySet<string>

  /**
   * Dev-only: async stream of slot usage preview events.
   * Used by devtools to show slot names and previewed call args without
   * buffering/draining the Flight stream.
   */
  [RSC_SLOT_USAGES_STREAM]?: ReadableStream<RscSlotUsageEvent>
}

export type CompositeComponentBuilder<TComp, TReturn> =
  TReturn extends React.ReactNode
    ? CompositeComponent<TComp, TReturn>
    : {
        [TKey in keyof TReturn]: CompositeComponentBuilder<TComp, TReturn[TKey]>
      }

export type CompositeComponentResult<TComp> = CompositeComponentBuilder<
  TComp,
  LooseAsyncReturnType<TComp>
>

export type ValidateRenderableServerComponent<TNode> =
  ValidateServerComponentResult<TNode>

export interface RenderableServerComponentAttributes<TNode> {
  '~types': {
    node: TNode
  }
  [SERVER_COMPONENT_STREAM]: ServerComponentStream
  [RENDERABLE_RSC]: true
}

export type RenderableServerComponent<TNode extends React.ReactNode> = TNode &
  RenderableServerComponentAttributes<TNode>

export type RenderableServerComponentBuilder<T> = T extends React.ReactNode
  ? RenderableServerComponent<T>
  : { [TKey in keyof T]: RenderableServerComponentBuilder<T[TKey]> }
