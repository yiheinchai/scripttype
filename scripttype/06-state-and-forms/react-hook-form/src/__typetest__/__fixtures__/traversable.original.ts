/**
 * ORIGINAL TypeScript from 06-state-and-forms/react-hook-form/src/__typetest__/__fixtures__/traversable.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
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
