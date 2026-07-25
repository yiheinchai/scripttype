/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Effect.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Covariant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Exclude<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extract<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractTag<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Generator<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Iterable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IteratorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReasonTags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Result<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Tags<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Variance<A, E, R> {
  _A: Covariant<A>
  _E: Covariant<E>
  _R: Covariant<R>
}

export interface EffectIterator<T extends Effect<any, any, any>> {
  next(
    ...args: ReadonlyArray<any>
  ): IteratorResult<T, Success<T>>
}

export interface EffectUnify<A extends { [Unify.typeSymbol]?: any }> {
  Effect?: () => A[Unify.typeSymbol] extends
    | Effect<infer A0, infer E0, infer R0>
    | infer _ ? Effect<A0, E0, R0>
    : never
}

export interface Effect<out A, out E = never, out R = never> extends Pipeable, Inspectable {
  readonly [TypeId]: Variance<A, E, R>
  [Symbol.iterator](): EffectIterator<Effect<A, E, R>>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: EffectUnify<this>
  [Unify.ignoreSymbol]?: {}
}

export type Success<T> = T extends Effect<infer _A, infer _E, infer _R> ? _A
  : never

export type Error<T> = T extends Effect<infer _A, infer _E, infer _R> ? _E
  : never

export type Services<T> = T extends Effect<infer _A, infer _E, infer _R> ? _R
  : never

export type EffectAny = Effect<any, any, any>

export type ReturnIterable<
    T extends Iterable<EffectAny>,
    Discard extends boolean,
    Mode extends boolean = false
  > = [T] extends [Iterable<Effect<infer A, infer E, infer R>>] ? Effect<
      Discard extends true ? void : Array<Mode extends true ? Result.Result<A, E> : A>,
      Mode extends true ? never : E,
      R
    >
    : never

export type ReturnTuple<
    T extends ReadonlyArray<unknown>,
    Discard extends boolean,
    Mode extends boolean = false
  > = Effect<
    Discard extends true ? void
      : T[number] extends never ? []
      : {
        -readonly [K in keyof T]: T[K] extends Effect<
          infer _A,
          infer _E,
          infer _R
        > ? Mode extends true ? Result.Result<_A, _E> : _A
          : never
      },
    Mode extends true ? never
      : T[number] extends never ? never
      : T[number] extends Effect<infer _A, infer _E, infer _R> ? _E
      : never,
    T[number] extends never ? never
      : T[number] extends Effect<infer _A, infer _E, infer _R> ? _R
      : never
  > extends infer X ? X
    : never

export type ReturnObject<T, Discard extends boolean, Mode extends boolean = false> = [T] extends [
    Record<string, EffectAny>
  ] ? Effect<
      Discard extends true ? void
        : {
          -readonly [K in keyof T]: [T[K]] extends [
            Effect<infer _A, infer _E, infer _R>
          ] ? Mode extends true ? Result.Result<_A, _E> : _A
            : never
        },
      Mode extends true ? never
        : keyof T extends never ? never
        : T[keyof T] extends Effect<infer _A, infer _E, infer _R> ? _E
        : never,
      keyof T extends never ? never
        : T[keyof T] extends Effect<infer _A, infer _E, infer _R> ? _R
        : never
    >
    : never

export type IsDiscard<A> = [Extract<A, { readonly discard: true }>] extends [
    never
  ] ? false
    : true

export type IsResult<A> = [Extract<A, { readonly mode: "result" }>] extends [never] ? false : true

export type Return<A, E = never, R = never> = Generator<Effect<any, E, R>, A, any>

export type TagsWithReason<E> = {
  [T in Tags<E>]: ReasonTags<ExtractTag<E, T>> extends never ? never : T
}[Tags<E>]

export interface Callback<E, A> {
    (err: E, a?: A): void
  }

export type ArgsWithCallback<Args extends Array<any>, E, A> = [...args: Args, cb: Callback<E, A>]

export type WithoutNull<A> = unknown extends A ? void : Exclude<A, null | undefined>

export type Effectify<T, E> = T extends {
    (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
    (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
    (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
    (...args: ArgsWithCallback<infer Args4, infer _E4, infer A4>): infer _R4
    (...args: ArgsWithCallback<infer Args5, infer _E5, infer A5>): infer _R5
    (...args: ArgsWithCallback<infer Args6, infer _E6, infer A6>): infer _R6
    (...args: ArgsWithCallback<infer Args7, infer _E7, infer A7>): infer _R7
    (...args: ArgsWithCallback<infer Args8, infer _E8, infer A8>): infer _R8
    (...args: ArgsWithCallback<infer Args9, infer _E9, infer A9>): infer _R9
    (...args: ArgsWithCallback<infer Args10, infer _E10, infer A10>): infer _R10
  } ? {
      (...args: Args1): Effect<WithoutNull<A1>, E>
      (...args: Args2): Effect<WithoutNull<A2>, E>
      (...args: Args3): Effect<WithoutNull<A3>, E>
      (...args: Args4): Effect<WithoutNull<A4>, E>
      (...args: Args5): Effect<WithoutNull<A5>, E>
      (...args: Args6): Effect<WithoutNull<A6>, E>
      (...args: Args7): Effect<WithoutNull<A7>, E>
      (...args: Args8): Effect<WithoutNull<A8>, E>
      (...args: Args9): Effect<WithoutNull<A9>, E>
      (...args: Args10): Effect<WithoutNull<A10>, E>
    }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
      (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
      (...args: ArgsWithCallback<infer Args4, infer _E4, infer A4>): infer _R4
      (...args: ArgsWithCallback<infer Args5, infer _E5, infer A5>): infer _R5
      (...args: ArgsWithCallback<infer Args6, infer _E6, infer A6>): infer _R6
      (...args: ArgsWithCallback<infer Args7, infer _E7, infer A7>): infer _R7
      (...args: ArgsWithCallback<infer Args8, infer _E8, infer A8>): infer _R8
      (...args: ArgsWithCallback<infer Args9, infer _E9, infer A9>): infer _R9
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
        (...args: Args3): Effect<WithoutNull<A3>, E>
        (...args: Args4): Effect<WithoutNull<A4>, E>
        (...args: Args5): Effect<WithoutNull<A5>, E>
        (...args: Args6): Effect<WithoutNull<A6>, E>
        (...args: Args7): Effect<WithoutNull<A7>, E>
        (...args: Args8): Effect<WithoutNull<A8>, E>
        (...args: Args9): Effect<WithoutNull<A9>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
      (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
      (...args: ArgsWithCallback<infer Args4, infer _E4, infer A4>): infer _R4
      (...args: ArgsWithCallback<infer Args5, infer _E5, infer A5>): infer _R5
      (...args: ArgsWithCallback<infer Args6, infer _E6, infer A6>): infer _R6
      (...args: ArgsWithCallback<infer Args7, infer _E7, infer A7>): infer _R7
      (...args: ArgsWithCallback<infer Args8, infer _E8, infer A8>): infer _R8
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
        (...args: Args3): Effect<WithoutNull<A3>, E>
        (...args: Args4): Effect<WithoutNull<A4>, E>
        (...args: Args5): Effect<WithoutNull<A5>, E>
        (...args: Args6): Effect<WithoutNull<A6>, E>
        (...args: Args7): Effect<WithoutNull<A7>, E>
        (...args: Args8): Effect<WithoutNull<A8>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
      (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
      (...args: ArgsWithCallback<infer Args4, infer _E4, infer A4>): infer _R4
      (...args: ArgsWithCallback<infer Args5, infer _E5, infer A5>): infer _R5
      (...args: ArgsWithCallback<infer Args6, infer _E6, infer A6>): infer _R6
      (...args: ArgsWithCallback<infer Args7, infer _E7, infer A7>): infer _R7
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
        (...args: Args3): Effect<WithoutNull<A3>, E>
        (...args: Args4): Effect<WithoutNull<A4>, E>
        (...args: Args5): Effect<WithoutNull<A5>, E>
        (...args: Args6): Effect<WithoutNull<A6>, E>
        (...args: Args7): Effect<WithoutNull<A7>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
      (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
      (...args: ArgsWithCallback<infer Args4, infer _E4, infer A4>): infer _R4
      (...args: ArgsWithCallback<infer Args5, infer _E5, infer A5>): infer _R5
      (...args: ArgsWithCallback<infer Args6, infer _E6, infer A6>): infer _R6
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
        (...args: Args3): Effect<WithoutNull<A3>, E>
        (...args: Args4): Effect<WithoutNull<A4>, E>
        (...args: Args5): Effect<WithoutNull<A5>, E>
        (...args: Args6): Effect<WithoutNull<A6>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
      (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
      (...args: ArgsWithCallback<infer Args4, infer _E4, infer A4>): infer _R4
      (...args: ArgsWithCallback<infer Args5, infer _E5, infer A5>): infer _R5
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
        (...args: Args3): Effect<WithoutNull<A3>, E>
        (...args: Args4): Effect<WithoutNull<A4>, E>
        (...args: Args5): Effect<WithoutNull<A5>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
      (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
      (...args: ArgsWithCallback<infer Args4, infer _E4, infer A4>): infer _R4
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
        (...args: Args3): Effect<WithoutNull<A3>, E>
        (...args: Args4): Effect<WithoutNull<A4>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
      (...args: ArgsWithCallback<infer Args3, infer _E3, infer A3>): infer _R3
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
        (...args: Args3): Effect<WithoutNull<A3>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
      (...args: ArgsWithCallback<infer Args2, infer _E2, infer A2>): infer _R2
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
        (...args: Args2): Effect<WithoutNull<A2>, E>
      }
    : T extends {
      (...args: ArgsWithCallback<infer Args1, infer _E1, infer A1>): infer _R1
    } ? {
        (...args: Args1): Effect<WithoutNull<A1>, E>
      }
    : never

export type EffectifyError<T> = T extends {
    (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
    (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
    (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
    (...args: ArgsWithCallback<infer _Args4, infer E4, infer _A4>): infer _R4
    (...args: ArgsWithCallback<infer _Args5, infer E5, infer _A5>): infer _R5
    (...args: ArgsWithCallback<infer _Args6, infer E6, infer _A6>): infer _R6
    (...args: ArgsWithCallback<infer _Args7, infer E7, infer _A7>): infer _R7
    (...args: ArgsWithCallback<infer _Args8, infer E8, infer _A8>): infer _R8
    (...args: ArgsWithCallback<infer _Args9, infer E9, infer _A9>): infer _R9
    (...args: ArgsWithCallback<infer _Args10, infer E10, infer _A10>): infer _R10
  } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
      (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
      (...args: ArgsWithCallback<infer _Args4, infer E4, infer _A4>): infer _R4
      (...args: ArgsWithCallback<infer _Args5, infer E5, infer _A5>): infer _R5
      (...args: ArgsWithCallback<infer _Args6, infer E6, infer _A6>): infer _R6
      (...args: ArgsWithCallback<infer _Args7, infer E7, infer _A7>): infer _R7
      (...args: ArgsWithCallback<infer _Args8, infer E8, infer _A8>): infer _R8
      (...args: ArgsWithCallback<infer _Args9, infer E9, infer _A9>): infer _R9
    } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
      (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
      (...args: ArgsWithCallback<infer _Args4, infer E4, infer _A4>): infer _R4
      (...args: ArgsWithCallback<infer _Args5, infer E5, infer _A5>): infer _R5
      (...args: ArgsWithCallback<infer _Args6, infer E6, infer _A6>): infer _R6
      (...args: ArgsWithCallback<infer _Args7, infer E7, infer _A7>): infer _R7
      (...args: ArgsWithCallback<infer _Args8, infer E8, infer _A8>): infer _R8
    } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
      (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
      (...args: ArgsWithCallback<infer _Args4, infer E4, infer _A4>): infer _R4
      (...args: ArgsWithCallback<infer _Args5, infer E5, infer _A5>): infer _R5
      (...args: ArgsWithCallback<infer _Args6, infer E6, infer _A6>): infer _R6
      (...args: ArgsWithCallback<infer _Args7, infer E7, infer _A7>): infer _R7
    } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6 | E7>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
      (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
      (...args: ArgsWithCallback<infer _Args4, infer E4, infer _A4>): infer _R4
      (...args: ArgsWithCallback<infer _Args5, infer E5, infer _A5>): infer _R5
      (...args: ArgsWithCallback<infer _Args6, infer E6, infer _A6>): infer _R6
    } ? NonNullable<E1 | E2 | E3 | E4 | E5 | E6>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
      (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
      (...args: ArgsWithCallback<infer _Args4, infer E4, infer _A4>): infer _R4
      (...args: ArgsWithCallback<infer _Args5, infer E5, infer _A5>): infer _R5
    } ? NonNullable<E1 | E2 | E3 | E4 | E5>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
      (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
      (...args: ArgsWithCallback<infer _Args4, infer E4, infer _A4>): infer _R4
    } ? NonNullable<E1 | E2 | E3 | E4>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
      (...args: ArgsWithCallback<infer _Args3, infer E3, infer _A3>): infer _R3
    } ? NonNullable<E1 | E2 | E3>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
      (...args: ArgsWithCallback<infer _Args2, infer E2, infer _A2>): infer _R2
    } ? NonNullable<E1 | E2>
    : T extends {
      (...args: ArgsWithCallback<infer _Args1, infer E1, infer _A1>): infer _R1
    } ? NonNullable<E1>
    : never
