/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/__typetest__/__fixtures__/traversable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Partial<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface Base<T, V> {
  foo: T;
  bar: [T];
  baz: Array<T>;
  value: V;
}

export type InfiniteType<T> = Base<InfiniteType<T>, T>;

export type NullableInfiniteType<T> =
  | null
  | undefined
  | Partial<Base<NullableInfiniteType<T>, T>>;

export type Depth3Type<T> = Base<Base<Base<never, T>, T>, T>;
