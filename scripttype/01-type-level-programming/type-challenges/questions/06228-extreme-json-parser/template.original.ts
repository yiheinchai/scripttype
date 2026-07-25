/**
 * ORIGINAL TypeScript from 01-type-level-programming/type-challenges/questions/06228-extreme-json-parser/template.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type PropertyKey<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Pure<T> = {
  [P in keyof T]: T[P] extends object ? Pure<T[P]> : T[P]
}

export type SetProperty<T, K extends PropertyKey, V> = {
  [P in (keyof T) | K]: P extends K ? V : P extends keyof T ? T[P] : never
}

export type Token = any

export type ParseResult<T, K extends Token[]> = [T, K]

export type Tokenize<T extends string, S extends Token[] = []> = Token[]

export type ParseLiteral<T extends Token[]> = ParseResult<any, T>

export type Parse<T extends string> = Pure<ParseLiteral<Tokenize<T>>[0]>
