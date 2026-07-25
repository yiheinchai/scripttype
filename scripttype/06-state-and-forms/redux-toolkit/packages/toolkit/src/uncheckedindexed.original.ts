/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/toolkit/src/uncheckedindexed.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type testAccess<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IfMaybeUndefined<T, True, False> = [undefined] extends [T] ? True : False

export type IfUncheckedIndexedAccess<True, False> = IfMaybeUndefined<
  typeof testAccess,
  True,
  False
>

export type UncheckedIndexedAccess<T> = IfUncheckedIndexedAccess<
  T | undefined,
  T
>
