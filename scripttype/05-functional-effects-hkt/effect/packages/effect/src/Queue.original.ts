/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Queue.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Failure<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type OfferEntry<A> =
    | {
      readonly _tag: "Array"
      readonly remaining: Array<A>
      offset: number
      readonly resume: (_: Effect<Array<A>>) => void
    }
    | {
      readonly _tag: "Single"
      readonly message: A
      readonly resume: (_: Effect<boolean>) => void
    }

export type State<A, E> =
    | {
      readonly _tag: "Open"
      readonly takers: Set<(_: Effect<void, E>) => void>
      readonly offers: Set<OfferEntry<A>>
      readonly awaiters: Set<(_: Effect<void, E>) => void>
    }
    | {
      readonly _tag: "Closing"
      readonly takers: Set<(_: Effect<void, E>) => void>
      readonly offers: Set<OfferEntry<A>>
      readonly awaiters: Set<(_: Effect<void, E>) => void>
      readonly exit: Failure<never, E>
    }
    | {
      readonly _tag: "Done"
      readonly exit: Failure<never, E>
    }
