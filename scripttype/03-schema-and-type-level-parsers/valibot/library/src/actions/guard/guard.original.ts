/**
 * ORIGINAL TypeScript from 03-schema-and-type-level-parsers/valibot/library/src/actions/guard/guard.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type GuardFunction<TInput> = (
  input: TInput
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => input is any;

export type InferGuardOutput<TGuard extends GuardFunction<any>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TGuard extends (input: any) => input is infer TOutput ? TOutput : unknown;
