/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/jsx/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Child<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type JSXNode<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type PropsWithChildren<P = unknown> = P & { children?: Child | undefined }

export type ReactElement<P = any, T = string | Function> = JSXNode & {
  type: T
  props: P
  key: string | null
}

export type ComponentClass<_P = {}, _S = {}> = unknown
