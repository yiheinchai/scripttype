/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/__typetest__/__fixtures__/pathString.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type ConcatTenTimes<T extends string> =
  `${T}.${T}.${T}.${T}.${T}.${T}.${T}.${T}.${T}.${T}`;

export type HundredPathString<T extends string> = ConcatTenTimes<
  ConcatTenTimes<T>
>;
