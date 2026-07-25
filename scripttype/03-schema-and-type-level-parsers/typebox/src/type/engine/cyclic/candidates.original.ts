/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/typebox/src/type/engine/cyclic/candidates.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type TCyclicCheck<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TProperties<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type TPropertyKeys<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
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
