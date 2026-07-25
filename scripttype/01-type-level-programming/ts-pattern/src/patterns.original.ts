/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-pattern/src/patterns.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CustomP<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ExtractPreciseValue<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InvertPattern<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NoInfer<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReturnType<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type matcher<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type unstable_Matchable<
  narrowedOrFn,
  input = unknown,
  pattern = never
> = CustomP<input, pattern, narrowedOrFn>;

export type unstable_Matcher<
  narrowedOrFn,
  input = unknown,
  pattern = never
> = ReturnType<CustomP<input, pattern, narrowedOrFn>[matcher]>;

export type infer<pattern> = InvertPattern<NoInfer<pattern>, unknown>;

export type narrow<input, pattern> = ExtractPreciseValue<
  input,
  InvertPattern<pattern, input>
>;

export type UnwrapArray<xs> = xs extends readonly (infer x)[] ? x : never;

export type UnwrapSet<xs> = xs extends Set<infer x> ? x : never;

export type UnwrapMapKey<xs> = xs extends Map<infer k, any> ? k : never;

export type UnwrapMapValue<xs> = xs extends Map<any, infer v> ? v : never;

export type UnwrapRecordKey<xs> = xs extends Record<infer k, any> ? k : never;

export type UnwrapRecordValue<xs> = xs extends Record<any, infer v> ? v : never;

export type WithDefault<a, b> = [a] extends [never] ? b : a;
