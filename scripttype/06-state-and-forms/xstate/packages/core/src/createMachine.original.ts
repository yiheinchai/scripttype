/**
 * ORIGINAL TypeScript from 06-state-and-forms/xstate/packages/core/src/createMachine.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type TestValue =
  | string
  | {
      [k: string]: TestValue | undefined;
    };

export type _GroupTestValues<TTestValue extends string | TestValue> =
  TTestValue extends string
    ? TTestValue extends `${string}.${string}`
      ? [never, never]
      : [TTestValue, never]
    : [never, TTestValue];
