/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/ai/McpServer.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Param<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ValidateCompletions<Completions, Keys extends string> =
  & Completions
  & {
    readonly [K in keyof Completions]: K extends Keys ? (input: string) => any : never
  }

export type ResourceCompletions<Schemas extends ReadonlyArray<Schema.Constraint>> = {
  readonly [
    K in Extract<keyof Schemas, `${number}`> as Schemas[K] extends Param<infer Id, infer _S> ? Id
      : `param${K}`
  ]: (input: string) => Effect.Effect<Array<Schemas[K]["Type"]>, any, any>
}
