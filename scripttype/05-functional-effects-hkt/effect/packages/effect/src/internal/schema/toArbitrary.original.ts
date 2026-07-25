/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/internal/schema/toArbitrary.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type FastCheck<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Schema<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type SchemaAST<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Context = Schema.Annotations.ToArbitrary.Context

export type RecursionStack = ReadonlyArray<SchemaAST.Suspend>

export type Lazy<T> = (fc: typeof FastCheck, ctx: Context, recursionStack: RecursionStack) => FastCheck.Arbitrary<T>

export type LazyOption<T> = (
  fc: typeof FastCheck,
  ctx: Context,
  recursionStack: RecursionStack
) => FastCheck.Arbitrary<T> | undefined
