/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/neverthrow/src/result-async.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Combine<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Dedup<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type EmptyArrayToNever<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractErrAsyncTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractOkAsyncTypes<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IsLiteralArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MemberListOf<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type MembersToUnion<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Ok<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type PromiseLike<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ResultAsync<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TraverseAsync<T, Depth extends number = 5> = IsLiteralArray<T> extends 1
  ? Combine<T, Depth> extends [infer Oks, infer Errs]
    ? ResultAsync<EmptyArrayToNever<Oks>, MembersToUnion<Errs>>
    : never
  : // The following check is important if we somehow reach to the point of
  // checking something similar to ResultAsync<X, Y>[]. In this case we don't
  // know the length of the elements, therefore we need to traverse the X and Y
  // in a way that the result should contain X[] and Y[].
  T extends Array<infer I>
  ? // The MemberListOf<I> here is to include all possible types. Therefore
    // if we face (ResultAsync<X, Y> | ResultAsync<A, B>)[] this type should
    // handle the case.
    Combine<MemberListOf<I>, Depth> extends [infer Oks, infer Errs]
    ? // The following `extends unknown[]` checks are just to satisfy the TS.
      // we already expect them to be an array.
      Oks extends unknown[]
      ? Errs extends unknown[]
        ? ResultAsync<EmptyArrayToNever<Oks[number][]>, MembersToUnion<Errs[number][]>>
        : ResultAsync<EmptyArrayToNever<Oks[number][]>, Errs>
      : // The rest of the conditions are to satisfy the TS and support
      // the edge cases which are not really expected to happen.
      Errs extends unknown[]
      ? ResultAsync<Oks, MembersToUnion<Errs[number][]>>
      : ResultAsync<Oks, Errs>
    : never
  : never

export type Writable<T> = T extends ReadonlyArray<unknown> ? [...T] : T

export type UnwrapAsync<T> = IsLiteralArray<T> extends 1
  ? Writable<T> extends [infer H, ...infer Rest]
    ? H extends PromiseLike<infer HI>
      ? HI extends Result<unknown, unknown>
        ? [Dedup<HI>, ...UnwrapAsync<Rest>]
        : never
      : never
    : []
  : // If we got something too general such as ResultAsync<X, Y>[] then we
  // simply need to map it to ResultAsync<X[], Y[]>. Yet `ResultAsync`
  // itself is a union therefore it would be enough to cast it to Ok.
  T extends Array<infer A>
  ? A extends PromiseLike<infer HI>
    ? HI extends Result<infer L, infer R>
      ? Ok<L, R>[]
      : never
    : never
  : never

export type CombineResultAsyncs<
  T extends readonly ResultAsync<unknown, unknown>[]
> = IsLiteralArray<T> extends 1
  ? TraverseAsync<UnwrapAsync<T>>
  : ResultAsync<ExtractOkAsyncTypes<T>, ExtractErrAsyncTypes<T>[number]>

export type TraverseWithAllErrorsAsync<T, Depth extends number = 5> = TraverseAsync<
  T,
  Depth
> extends ResultAsync<infer Oks, infer Errs>
  ? ResultAsync<Oks, Errs[]>
  : never

export type CombineResultsWithAllErrorsArrayAsync<
  T extends readonly ResultAsync<unknown, unknown>[]
> = IsLiteralArray<T> extends 1
  ? TraverseWithAllErrorsAsync<UnwrapAsync<T>>
  : ResultAsync<ExtractOkAsyncTypes<T>, ExtractErrAsyncTypes<T>[number][]>
