/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/reactivity/Atom.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Arr<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type AsyncResult<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Cause<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Option<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Registry<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Stream<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type TypeId = "~effect/reactivity/Atom"

export type WritableTypeId = "~effect/reactivity/Atom/Writable"

export interface WriteContext<A> {
  get<T>(this: WriteContext<A>, atom: Atom<T>): T
  refreshSelf(this: WriteContext<A>): void
  setSelf(this: WriteContext<A>, a: A): void
  set<R, W>(this: WriteContext<A>, atom: Writable<R, W>, value: W): void
}

export interface Writable<R, W = R> extends Atom<R> {
  readonly [WritableTypeId]: WritableTypeId
  readonly write: (ctx: WriteContext<R>, value: W) => void
}

export interface AtomContext {
  <A>(atom: Atom<A>): A
  get<A>(this: AtomContext, atom: Atom<A>): A
  result<A, E>(this: AtomContext, atom: Atom<AsyncResult.AsyncResult<A, E>>, options?: {
    readonly suspendOnWaiting?: boolean | undefined
  }): Effect.Effect<A, E>
  resultOnce<A, E>(this: AtomContext, atom: Atom<AsyncResult.AsyncResult<A, E>>, options?: {
    readonly suspendOnWaiting?: boolean | undefined
  }): Effect.Effect<A, E>
  once<A>(this: AtomContext, atom: Atom<A>): A
  addFinalizer(this: AtomContext, f: () => void): void
  mount<A>(this: AtomContext, atom: Atom<A>): void
  refresh<A>(this: AtomContext, atom: Atom<A>): void
  refreshSelf(this: AtomContext): void
  self<A>(this: AtomContext): Option.Option<A>
  setSelf<A>(this: AtomContext, a: A): void
  set<R, W>(this: AtomContext, atom: Writable<R, W>, value: W): void
  setResult<A, E, W>(this: AtomContext, atom: Writable<AsyncResult.AsyncResult<A, E>, W>, value: W): Effect.Effect<A, E>
  some<A>(this: AtomContext, atom: Atom<Option.Option<A>>): Effect.Effect<A>
  someOnce<A>(this: AtomContext, atom: Atom<Option.Option<A>>): Effect.Effect<A>
  stream<A>(this: AtomContext, atom: Atom<A>, options?: {
    readonly withoutInitialValue?: boolean
    readonly bufferSize?: number
  }): Stream.Stream<A>
  streamResult<A, E>(this: AtomContext, atom: Atom<AsyncResult.AsyncResult<A, E>>, options?: {
    readonly withoutInitialValue?: boolean
    readonly bufferSize?: number
  }): Stream.Stream<A, E>
  subscribe<A>(this: AtomContext, atom: Atom<A>, f: (_: A) => void, options?: {
    readonly immediate?: boolean
  }): void
  readonly registry: Registry.AtomRegistry
}

export interface Atom<A> extends Pipeable, Inspectable.Inspectable {
  readonly [TypeId]: TypeId
  readonly keepAlive: boolean
  readonly lazy: boolean
  readonly read: (get: AtomContext) => A
  equals(value: A, next: A): boolean
  readonly refresh?: (f: <A>(atom: Atom<A>) => void) => void
  readonly label?: readonly [name: string, stack: string]
  readonly idleTTL?: number
  readonly initialValueTarget?: Atom<A>
}

export type Type<T extends Atom<any>> = T extends Atom<infer A> ? A : never

export type Success<T extends Atom<any>> = T extends Atom<AsyncResult.AsyncResult<infer A, infer _>> ? A : never

export type PullResult<A, E = never> = AsyncResult.AsyncResult<{
  readonly done: boolean
  readonly items: Arr.NonEmptyArray<A>
}, E | Cause.NoSuchElementError>

export type PullSuccess<T extends Atom<any>> = T extends Atom<PullResult<infer A, infer _>> ? A : never

export type Failure<T extends Atom<any>> = T extends Atom<AsyncResult.AsyncResult<infer _, infer E>> ? E : never

export type WithoutSerializable<T extends Atom<any>> = T extends Writable<infer R, infer W> ? Writable<R, W>
  : Atom<Type<T>>
