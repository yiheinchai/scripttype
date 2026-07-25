/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Context.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type ServiceTypeId = "~effect/Context/Service"

export interface Key<out Identifier, out Shape> extends Effect<Shape, never, Identifier> {
  readonly [ServiceTypeId]: ServiceTypeId
  readonly Service: Shape
  readonly Identifier: Identifier
  readonly key: string
  readonly stack?: string | undefined
}

export type Shape<T> = T extends Key<infer _I, infer S> ? S : never

export type Identifier<T> = T extends Key<infer I, infer _S> ? I : never
