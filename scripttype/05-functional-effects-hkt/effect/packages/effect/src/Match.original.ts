/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Match.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Generator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Predicate<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface When {
  readonly _tag: "When"
  guard(u: unknown): boolean
  evaluate(input: unknown): any
}

export interface Not {
  readonly _tag: "Not"
  guard(u: unknown): boolean
  evaluate(input: unknown): any
}

export type Case = When | Not

export interface TypeMatcher<in Input, out Filters, out Remaining, out Result, out Return = any> extends Pipeable {
  readonly _tag: "TypeMatcher"
  readonly [TypeId]: {
    readonly _input: T.Contravariant<Input>
    readonly _filters: T.Covariant<Filters>
    readonly _remaining: T.Covariant<Remaining>
    readonly _result: T.Covariant<Result>
    readonly _return: T.Covariant<Return>
  }
  readonly cases: ReadonlyArray<Case>
  add<I, R, RA, A>(_case: Case): TypeMatcher<I, R, RA, A>
}

export interface ValueMatcher<in Input, Filters, out Remaining, out Result, Provided, out Return = any>
  extends Pipeable
{
  readonly _tag: "ValueMatcher"
  readonly [TypeId]: {
    readonly _input: T.Contravariant<Input>
    readonly _filters: T.Covariant<Filters>
    readonly _result: T.Covariant<Result>
    readonly _return: T.Covariant<Return>
  }
  readonly provided: Provided
  readonly value: Result.Result<Provided, Remaining>
  add<I, R, RA, A, Pr>(_case: Case): ValueMatcher<I, R, RA, A, Pr>
}

export type Matcher<Input, Filters, RemainingApplied, Result, Provided, Return = any> =
  | TypeMatcher<Input, Filters, RemainingApplied, Result, Return>
  | ValueMatcher<Input, Filters, RemainingApplied, Result, Provided, Return>

export interface SafeRefinement<in A, out R = A> {
  readonly [SafeRefinementId]: (a: A) => R
}

export type ResolvePred<A, Input = any> = A extends never ? never
    : A extends SafeRefinement<infer _A, infer _R> ? _A
    : A extends Predicate.Refinement<Input, infer P> ? P
    : A extends Predicate.Predicate<infer P> ? P
    : A extends Record<string, any> ? { [K in keyof A]: ResolvePred<A[K]> }
    : A

export type PredicateA<A> = Predicate.Predicate<A> | Predicate.Refinement<A, A>

export type Fail = typeof Fail

export type BuiltInObjects =
    | Function
    | Date
    | RegExp
    | Generator
    | { readonly [Symbol.toStringTag]: string }

export type IsPlainObject<T> = T extends BuiltInObjects ? false
    : T extends Record<string, any> ? true
    : false

export type Simplify<A> = { [K in keyof A]: A[K] } & {}

export type NonFailKeys<A> = keyof A & {} extends infer K ? K extends keyof A ? A[K] extends Fail ? never : K
    : never :
    never

export type Replace<A, B> = A extends Function ? A
    : A extends Record<string | number, any> ? { [K in keyof A]: K extends keyof B ? Replace<A[K], B[K]> : A[K] }
    : [B] extends [A] ? B
    : A

export type MaybeReplace<I, P> = [P] extends [I] ? P
    : [I] extends [P] ? Replace<I, P>
    : Fail

export type ExtractAndNarrow<Input, P> = P extends Predicate.Refinement<infer _In, infer _Out> ?
    _Out extends Input ? Extract<_Out, Input>
    : Extract<Input, _Out> :
    P extends SafeRefinement<infer _In, infer _R> ? [0] extends [1 & _R] ? Input
      : _In extends Input ? Extract<_In, Input>
      : Extract<Input, _In>
    : P extends Predicate.Predicate<infer _In> ? Extract<Input, _In>
    : Input extends infer I ? Exclude<
        I extends ReadonlyArray<any> ? P extends ReadonlyArray<any> ? {
              readonly [K in keyof I]: K extends keyof P ? ExtractAndNarrow<I[K], P[K]>
                : I[K]
            } extends infer R ? Fail extends R[keyof R] ? never
              : R
            : never
          : never
          : IsPlainObject<I> extends true ? string extends keyof I ? I extends P ? I
              : never
            : symbol extends keyof I ? I extends P ? I
              : never
            : Simplify<
              & { [RK in Extract<keyof I, keyof P>]-?: ExtractAndNarrow<I[RK], P[RK]> }
              & Omit<I, keyof P>
            > extends infer R ? keyof P extends NonFailKeys<R> ? R
              : never
            : never
          : MaybeReplace<I, P> extends infer R ? [I] extends [R] ? I
            : R
          : never,
        Fail
      > :
    never

export type ExtractMatch<I, P> = [ExtractAndNarrow<I, P>] extends [infer EI] ? EI
    : never

export type WhenMatch<R, P> =
    // check for any
    [0] extends [1 & R] ? ResolvePred<P> :
      P extends SafeRefinement<infer SP, never> ? SP
      : P extends Predicate.Refinement<infer _R, infer RP>
      // try to narrow refinement
        ? [Extract<R, RP>] extends [infer X] ? [X] extends [never]
            // fallback to original refinement
            ? RP
          : X
        : never
      : P extends PredicateA<infer PP> ? PP
      : ExtractMatch<R, P>

export type NonLiteralsTo<A, T> = [A] extends [string | number | boolean | bigint] ? [string] extends [A] ? T
    : [number] extends [A] ? T
    : [boolean] extends [A] ? T
    : [bigint] extends [A] ? T
    : A
    : A

export type ToInvertedRefinement<A> = A extends never ? never
    : A extends Predicate.Refinement<any, infer P> ? SafeRefinement<P>
    : A extends Predicate.Predicate<infer _P> ? SafeRefinement<never>
    : A extends SafeRefinement<infer _A, infer _R> ? SafeRefinement<_R>
    : A extends Record<string, any> ? { [K in keyof A]: ToInvertedRefinement<A[K]> }
    : NonLiteralsTo<A, never>

export type PForNotMatch<P> = [ToInvertedRefinement<P>] extends [infer X] ? X
    : never

export type NotMatch<R, P> = Exclude<R, ExtractMatch<R, PForNotMatch<P>>>

export type PForMatch<P> = [ResolvePred<P>] extends [infer X] ? X
    : never

export type SafeRefinementR<A> = A extends never ? never
    : A extends SafeRefinement<infer _, infer R> ? R
    : A extends Function ? A
    : A extends Record<string, any> ? { [K in keyof A]: SafeRefinementR<A[K]> }
    : A

export type ToSafeRefinement<A> = A extends never ? never
    : A extends Predicate.Refinement<any, infer P> ? SafeRefinement<P, P>
    : A extends Predicate.Predicate<infer P> ? SafeRefinement<P, never>
    : A extends SafeRefinement<any> ? A
    : A extends Record<string, any> ? { [K in keyof A]: ToSafeRefinement<A[K]> }
    : NonLiteralsTo<A, never>

export type PForExclude<P> = [SafeRefinementR<ToSafeRefinement<P>>] extends [infer X] ? X
    : never

export type PatternPrimitive<A> = PredicateA<A> | A | SafeRefinement<any>

export type PatternBase<A> = A extends ReadonlyArray<infer _T> ? ReadonlyArray<any> | PatternPrimitive<A>
    : A extends Record<string, any> ? Partial<
        { [K in keyof A]: PatternPrimitive<A[K] & {}> | PatternBase<A[K] & {}> }
      >
    : never

export interface Without<out X> {
    readonly _tag: "Without"
    readonly _X: X
  }

export interface Only<out X> {
    readonly _tag: "Only"
    readonly _X: X
  }

export type AddWithout<A, X> = [A] extends [Without<infer WX>] ? Without<X | WX>
    : [A] extends [Only<infer OX>] ? Only<Exclude<OX, X>>
    : never

export type AddOnly<A, X> = [A] extends [Without<infer WX>] ? [X] extends [WX] ? never
    : Only<X>
    : [A] extends [Only<infer OX>] ? [X] extends [OX] ? Only<X>
      : never
    : never

export type ApplyFilters<I, A> = A extends Only<infer X> ? X
    : A extends Without<infer X> ? Exclude<I, X>
    : never

export type Tags<D extends string, P> = P extends Record<D, infer X> ? X : never

export type ArrayToIntersection<A extends ReadonlyArray<any>> = T.UnionToIntersection<
    A[number]
  >
