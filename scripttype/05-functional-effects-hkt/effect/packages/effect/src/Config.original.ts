/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/Config.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type ConfigError<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ConfigProvider<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonNullable<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Path<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Record<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type TypeId<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Config<out T> extends Effect.Effect<T, ConfigError> {
  readonly [TypeId]: typeof TypeId
  readonly parse: (
    provider: ConfigProvider.ConfigProvider,
    pathPrefix?: Path
  ) => Effect.Effect<T, ConfigError>
}

export type Success<T> = [T] extends [Config<infer A>] ? A : never

export type IsPlainObject<A> = [A] extends [Record<string, any>]
  ? [keyof A] extends [never] ? false : [keyof A] extends [string] ? true : false
  : false

export type Wrap<A> = [NonNullable<A>] extends [infer T] ? [IsPlainObject<T>] extends [true] ?
      | { readonly [K in keyof A]: Wrap<A[K]> }
      | Config<A>
  : Config<A>
  : Config<A>
