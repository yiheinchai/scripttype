/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/__typetest__/__fixtures__/tuple.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type ConcatTupleTenTimes<T extends unknown[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
];

export type HundredTuple<T> = ConcatTupleTenTimes<ConcatTupleTenTimes<[T]>>;
