/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/ai/Telemetry.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Lowercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Uppercase<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type FormatAttributeName<T extends string | number | symbol> = T extends string ?
  T extends `${infer First}${infer Rest}`
    ? `${First extends Uppercase<First> ? "_" : ""}${Lowercase<First>}${FormatAttributeName<Rest>}`
  : T :
  never

export type AttributesWithPrefix<Attributes extends Record<string, any>, Prefix extends string> = {
  [Name in keyof Attributes as `${Prefix}.${FormatAttributeName<Name>}`]: Attributes[Name]
}
