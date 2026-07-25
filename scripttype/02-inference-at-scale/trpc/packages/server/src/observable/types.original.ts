/**
 * ORIGINAL TypeScript from 02-inference-at-scale/trpc/packages/server/src/observable/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type UnaryFunction<TSource, TReturn> = (source: TSource) => TReturn;

export interface Observer<TValue, TError> {
  next: (value: TValue) => void;
  error: (err: TError) => void;
  complete: () => void;
}

export interface Unsubscribable {
  unsubscribe(): void;
}

export interface Subscribable<TValue, TError> {
  subscribe(observer: Partial<Observer<TValue, TError>>): Unsubscribable;
}

export type OperatorFunction<
  TValueBefore,
  TErrorBefore,
  TValueAfter,
  TErrorAfter,
> = UnaryFunction<
  Subscribable<TValueBefore, TErrorBefore>,
  Subscribable<TValueAfter, TErrorAfter>
>;

export type MonoTypeOperatorFunction<TValue, TError> = OperatorFunction<
  TValue,
  TError,
  TValue,
  TError
>;
