/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Take.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonEmptyReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Take<A, E = never, Done = void> = NonEmptyReadonlyArray<A> | Exit.Exit<Done, E>
