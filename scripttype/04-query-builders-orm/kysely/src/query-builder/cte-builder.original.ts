/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/query-builder/cte-builder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CTEBuilder<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type CTEBuilderCallback<N extends string> = (
  // N2 is needed for proper inference. Don't remove it.
  cte: <N2 extends string>(name: N2) => CTEBuilder<N2>,
) => CTEBuilder<N>
