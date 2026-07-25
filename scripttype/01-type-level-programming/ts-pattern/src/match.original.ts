/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-pattern/src/match.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type MatchState<output> =
  | { matched: true; value: output }
  | { matched: false; value: undefined };
