/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/fp-ts/src/internal.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}

export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly In: In
      readonly Out2: Out2
      readonly Out1: Out1
      readonly Target: Target
    })['type']
  : {
      readonly F: F
      readonly In: (_: In) => void
      readonly Out2: () => Out2
      readonly Out1: () => Out1
      readonly Target: (_: Target) => Target
    }
