/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/String.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Concat<A extends string, B extends string> = `${A}${B}`

export type TrimEnd<A extends string> = A extends `${infer B}${" " | "\n" | "\t" | "\r"}` ? TrimEnd<B> : A

export type TrimStart<A extends string> = A extends `${" " | "\n" | "\t" | "\r"}${infer B}` ? TrimStart<B> : A

export type Trim<A extends string> = TrimEnd<TrimStart<A>>
