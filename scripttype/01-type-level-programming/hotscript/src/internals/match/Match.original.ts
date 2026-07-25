/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/match/Match.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Impl<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PartialApply<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type _<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type unset<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface MatchFn extends Fn {
  return: Impl.Match<this["arg0"], this["arg1"]>;
}

export type Match<
  valueOrWithClauses = unset,
  withClauses extends Impl.With<any, any>[] | unset | _ = unset
> = PartialApply<
  MatchFn,
  withClauses extends unset
    ? [unset, valueOrWithClauses]
    : [valueOrWithClauses, withClauses]
>;

export type With<pattern, handler> = Impl.With<pattern, handler>;
