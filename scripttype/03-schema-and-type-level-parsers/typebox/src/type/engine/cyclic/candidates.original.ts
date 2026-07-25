/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/candidates.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCyclicCheck<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TProperties<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TPropertyKeys<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TResolveCandidateKeys<Context extends TProperties, Keys extends (keyof Context)[], Result extends (keyof Context)[] = []> = (
  Keys extends [infer Left extends keyof Context, ...infer Right extends (keyof Context)[]]
    ? TCyclicCheck<[Left], Context, Context[Left]> extends true
      ? TResolveCandidateKeys<Context, Right, [...Result, Left]>
      : TResolveCandidateKeys<Context, Right, Result>
  : Result
)

export type TCyclicCandidates<Context extends TProperties,
  Keys extends (keyof Context)[] = TPropertyKeys<Context>,
  Result extends (keyof Context)[] = TResolveCandidateKeys<Context, Keys>
> = Result
