/**
 * ORIGINAL TypeScript from 06-state-and-forms/redux-toolkit/packages/rtk-query-codegen-openapi/src/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Omit<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Partial<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Pick<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Require<T, K extends keyof T> = { [k in K]-?: NonNullable<T[k]> } & Omit<T, K>;

export type Optional<T, K extends keyof T> = { [k in K]?: NonNullable<T[k]> } & Omit<T, K>;

export type Id<T> = { [K in keyof T]: T[K] } & {};

export type AtLeastOneKey<T> = {
  [K in keyof T]-?: Pick<T, K> & Partial<T>;
}[keyof T];
