/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/jsx/base.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type HtmlEscapedString<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Readonly<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Props = Record<string, any>

export type FC<P = Props> = {
  (props: P): HtmlEscapedString | Promise<HtmlEscapedString> | null
  defaultProps?: Partial<P> | undefined
  displayName?: string | undefined
}

export type MemorableFC<T> = FC<T> & {
  [DOM_MEMO]: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean
}
