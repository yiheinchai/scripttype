/**
 * ORIGINAL TypeScript from 01-type-level-programming/hotscript/src/internals/core/Core.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ExcludePlaceholders<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Head<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export interface arg<Index extends number, Constraint = unknown> extends Fn {
  return: this["args"][Index] extends infer arg extends Constraint
    ? arg
    : never;
}

export type arg0<Constraint = unknown> = arg<0, Constraint>;

export type arg1<Constraint = unknown> = arg<1, Constraint>;

export type arg2<Constraint = unknown> = arg<2, Constraint>;

export type arg3<Constraint = unknown> = arg<3, Constraint>;

export type rawArgs = typeof rawArgs;

export interface Fn {
  [rawArgs]: unknown;
  args: this[rawArgs] extends infer args extends unknown[] ? args : never;
  arg0: this[rawArgs] extends [infer arg, ...any] ? arg : never;
  arg1: this[rawArgs] extends [any, infer arg, ...any] ? arg : never;
  arg2: this[rawArgs] extends [any, any, infer arg, ...any] ? arg : never;
  arg3: this[rawArgs] extends [any, any, any, infer arg, ...any] ? arg : never;
  return: unknown;
}

export type Apply<fn extends Fn, args extends unknown[]> = (fn & {
  [rawArgs]: args;
})["return"];

export type _ = typeof _;

export type Call<
  fn extends Fn,
  arg0 = _,
  arg1 = _,
  arg2 = _,
  arg3 = _
> = (fn & {
  [rawArgs]: ExcludePlaceholders<[arg0, arg1, arg2, arg3]>;
})["return"];

export type Pipe<acc, xs extends Fn[]> = xs extends [
  infer first extends Fn,
  ...infer rest extends Fn[]
]
  ? Pipe<Call<first, acc>, rest>
  : acc;

export type PipeRight<xs extends Fn[], acc> = xs extends [
  ...infer rest extends Fn[],
  infer last extends Fn
]
  ? PipeRight<rest, Call<last, acc>>
  : acc;

export type ComposeImpl<fns extends Fn[], args extends any[]> = fns extends [
  ...infer rest extends Fn[],
  infer last extends Fn
]
  ? ComposeImpl<rest, [Apply<last, args>]>
  : Head<args>;

export type ComposeLeftImpl<fns extends Fn[], args extends any[]> = fns extends [
  infer first extends Fn,
  ...infer rest extends Fn[]
]
  ? ComposeLeftImpl<rest, [Apply<first, args>]>
  : Head<args>;
