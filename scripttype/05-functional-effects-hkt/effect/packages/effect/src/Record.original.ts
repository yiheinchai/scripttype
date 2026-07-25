/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Record.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type ReadonlyRecord<in out K extends string | symbol, out A> = {
  readonly [P in K]: A
}

export type IsFiniteString<T extends string> = T extends "" ? true :
    [T] extends [`${infer Head}${infer Rest}`]
      ? string extends Head ? false : `${number}` extends Head ? false : Rest extends "" ? true : IsFiniteString<Rest>
    : false

export type NonLiteralKey<K extends string | symbol> = K extends string ? IsFiniteString<K> extends true ? string : K
    : symbol

export type IntersectKeys<K1 extends string, K2 extends string> = [string] extends [K1 | K2] ?
    NonLiteralKey<K1> & NonLiteralKey<K2>
    : K1 & K2
