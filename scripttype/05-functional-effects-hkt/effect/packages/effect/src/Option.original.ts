/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Option.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Covariant<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type IteratorResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Unify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface OptionIterator<T extends Option<any>> {
  next(
    ...args: ReadonlyArray<any>
  ): IteratorResult<T, Option.Value<T>>
}

export interface OptionUnify<A extends { [Unify.typeSymbol]?: any }> {
  Option?: () => A[Unify.typeSymbol] extends Option<infer A0> | infer _ ? Option<A0> : never
}

export interface OptionUnifyIgnore {}

export interface None<out A> extends Pipeable, Inspectable {
  readonly _tag: "None"
  readonly _op: "None"
  readonly valueOrUndefined: undefined
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  [Symbol.iterator](): OptionIterator<Option<A>>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: OptionUnify<this>
  [Unify.ignoreSymbol]?: OptionUnifyIgnore
}

export interface Some<out A> extends Pipeable, Inspectable {
  readonly _tag: "Some"
  readonly _op: "Some"
  readonly value: A
  readonly valueOrUndefined: A
  readonly [TypeId]: {
    readonly _A: Covariant<A>
  }
  [Symbol.iterator](): OptionIterator<Option<A>>
  [Unify.typeSymbol]?: unknown
  [Unify.unifySymbol]?: OptionUnify<this>
  [Unify.ignoreSymbol]?: OptionUnifyIgnore
}

export type Option<A> = None<A> | Some<A>

export type Value<T extends Option<any>> = [T] extends [Option<infer _A>] ? _A : never
