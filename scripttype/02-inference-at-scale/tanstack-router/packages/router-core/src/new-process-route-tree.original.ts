/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/router-core/src/new-process-route-tree.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Extract<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type LRUCache<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReturnType<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SEGMENT_TYPE_INDEX<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SEGMENT_TYPE_OPTIONAL_PARAM<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SEGMENT_TYPE_PARAM<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SEGMENT_TYPE_PATHLESS<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SEGMENT_TYPE_PATHNAME<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type SEGMENT_TYPE_WILDCARD<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type findMatch<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type RouteLike = {
  id?: string
  path?: string // relative path from the parent,
  children?: Array<RouteLike> // child routes,
  parentRoute?: RouteLike // parent route,
  isRoot?: boolean
  options?: {
    caseSensitive?: boolean
    parseParams?: (params: Record<string, string>) => unknown
    params?: {
      parse?: (params: Record<string, string>) => unknown
      priority?: number
    }
  }
} &
  // router tree
  (| { fullPath: string; from?: never } // full path from the root
    // flat route masks list
    | { fullPath?: never; from: string } // full path from the root
  )

export type SegmentKind =
  | typeof SEGMENT_TYPE_PATHNAME
  | typeof SEGMENT_TYPE_PARAM
  | typeof SEGMENT_TYPE_WILDCARD
  | typeof SEGMENT_TYPE_OPTIONAL_PARAM

export type ExtendedSegmentKind =
  | SegmentKind
  | typeof SEGMENT_TYPE_INDEX
  | typeof SEGMENT_TYPE_PATHLESS

export type DynamicSegmentNode<T extends RouteLike> = SegmentNode<T> & {
  kind:
    | typeof SEGMENT_TYPE_PARAM
    | typeof SEGMENT_TYPE_WILDCARD
    | typeof SEGMENT_TYPE_OPTIONAL_PARAM
  prefix?: string
  suffix?: string
  caseSensitive: boolean
}

export type AnySegmentNode<T extends RouteLike> =
  | StaticSegmentNode<T>
  | DynamicSegmentNode<T>

export type SegmentNode<T extends RouteLike> = {
  kind: ExtendedSegmentKind

  pathless: Array<StaticSegmentNode<T>> | null

  /** Exact index segment (highest priority) */
  index: StaticSegmentNode<T> | null

  /** Static segments (2nd priority) */
  static: Map<string, StaticSegmentNode<T>> | null

  /** Case insensitive static segments (3rd highest priority) */
  staticInsensitive: Map<string, StaticSegmentNode<T>> | null

  /** Dynamic segments ($param) */
  dynamic: Array<DynamicSegmentNode<T>> | null

  /** Optional dynamic segments ({-$param}) */
  optional: Array<DynamicSegmentNode<T>> | null

  /** Wildcard segments ($ - lowest priority) */
  wildcard: Array<DynamicSegmentNode<T>> | null

  /** Terminal route (if this path can end here) */
  route: T | null

  /** The full path for this segment node (will only be valid on leaf nodes) */
  fullPath: string

  parent: AnySegmentNode<T> | null

  depth: number

  /** route.options.params.parse function, set on the last node of the route */
  parse: null | ((params: Record<string, string>) => unknown)

  /** route.options.params.priority ?? 0 */
  priority: number
}

export type StaticSegmentNode<T extends RouteLike> = SegmentNode<T> & {
  kind:
    | typeof SEGMENT_TYPE_PATHNAME
    | typeof SEGMENT_TYPE_PATHLESS
    | typeof SEGMENT_TYPE_INDEX
}

export type RouteMatch<T extends Extract<RouteLike, { fullPath: string }>> = {
  route: T
  rawParams: Record<string, string>
  branch: ReadonlyArray<T>
}

export type ProcessedTree<
  TTree extends Extract<RouteLike, { fullPath: string }>,
  TFlat extends Extract<RouteLike, { from: string }>,
  TSingle extends Extract<RouteLike, { from: string }>,
> = {
  /** a representation of the `routeTree` as a segment tree */
  segmentTree: AnySegmentNode<TTree>
  /** a mini route tree generated from the flat `routeMasks` list */
  masksTree: AnySegmentNode<TFlat> | null
  /** @deprecated keep until v2 so that `router.matchRoute` can keep not caring about the actual route tree */
  singleCache: LRUCache<string, AnySegmentNode<TSingle>>
  /** a cache of route matches from the `segmentTree` */
  matchCache: LRUCache<string, RouteMatch<TTree> | null>
  /** a cache of route matches from the `masksTree` */
  flatCache: LRUCache<string, ReturnType<typeof findMatch<TFlat>>> | null
}

export type ParamExtractionState = {
  part: number
  node: number
  path: number
  segment: number
}

export type MatchStackFrame<T extends RouteLike> = {
  node: AnySegmentNode<T>
  /** index of the segment of path */
  index: number
  /** how many nodes between `node` and the root of the segment tree */
  depth: number
  /**
   * Bitmask of skipped optional segments.
   *
   * This is a very performant way of storing an "array of booleans", but it means beyond 32 segments we can't track skipped optionals.
   * If we really really need to support more than 32 segments we can switch to using a `BigInt` here. It's about 2x slower in worst case scenarios.
   */
  skipped: number
  /** Positional bitmasks tracking which consumed URL segments matched each segment kind. */
  statics: number
  dynamics: number
  optionals: number
  /** intermediary state for param extraction */
  extract?: ParamExtractionState
  /** intermediary params from param extraction */
  rawParams?: Record<string, string>
}
