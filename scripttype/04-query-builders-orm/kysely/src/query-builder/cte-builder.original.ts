/**
 * ORIGINAL TypeScript from 04-query-builders-orm/kysely/src/query-builder/cte-builder.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CTEBuilder<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type CTEBuilderCallback<N extends string> = (
  // N2 is needed for proper inference. Don't remove it.
  cte: <N2 extends string>(name: N2) => CTEBuilder<N2>,
) => CTEBuilder<N>
