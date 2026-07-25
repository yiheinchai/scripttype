/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/typetest/schema/Schema.tst.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Make<In, Out> = (input: In, options?: Schema.MakeOptions | undefined) => Out

export type MakeEffect<In, Out> = (
  input: In,
  options?: Schema.MakeOptions | undefined
) => Effect.Effect<Out, Schema.SchemaError>
