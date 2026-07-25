/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Channel.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Types<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TagsWithReason<E> = {
  [T in Types.Tags<E>]: Types.ReasonTags<Types.ExtractTag<E, T>> extends never ? never : T
}[Types.Tags<E>]
