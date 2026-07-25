/**
 * ORIGINAL TypeScript from 01-type-level-programming/ts-toolbelt/sources/Community/IsLiteral.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type And<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Extends<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Or<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type IsStringLiteral<A extends any> =
    A extends string
    ? string extends A
      ? 0
      : 1
    : 0

export type IsNumberLiteral<A extends any> =
    A extends number
    ? number extends A
      ? 0
      : 1
    : 0

export type Kind = string | number

export type IsLiteral<A extends any, kind extends Kind = Kind> =
    And<Or<IsStringLiteral<A>, IsNumberLiteral<A>>, Extends<A, kind>>
