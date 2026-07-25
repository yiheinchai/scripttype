/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cli/Param.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type CliError<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Effect<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Environment<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Option<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Primitive<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Prompt<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type ReadonlyArray<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
type Record<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any, T6 = any, T7 = any, T8 = any, T9 = any, T10 = any, T11 = any, T12 = any, T13 = any, T14 = any, T15 = any, T16 = any> = any
export type Flags = Record<string, ReadonlyArray<string>>

export interface ParsedArgs {
  readonly flags: Flags
  readonly arguments: ReadonlyArray<string>
}

export type Parse<A> = (args: ParsedArgs) => Effect.Effect<
  readonly [leftover: ReadonlyArray<string>, value: A],
  CliError.CliError,
  Environment
>

export type FallbackPrompt<A> =
  | Prompt.Prompt<A>
  | Effect.Effect<Prompt.Prompt<A>, CliError.CliError, Environment>

export type ParamKind = "argument" | "flag"

export interface Single<Kind extends ParamKind, out A> extends Param<Kind, A> {
  readonly _tag: "Single"
  readonly kind: Kind
  readonly name: string
  readonly description: Option.Option<string>
  readonly aliases: ReadonlyArray<string>
  readonly primitiveType: Primitive.Primitive<A>
  readonly typeName?: string | undefined
  readonly hidden: boolean
}

export interface Param<Kind extends ParamKind, out A> extends Param.Variance<A> {
  readonly _tag: "Single" | "Map" | "Transform" | "Optional" | "Variadic"
  readonly kind: Kind
  readonly parse: Parse<A>
}

export interface Map<Kind extends ParamKind, in out A, out B> extends Param<Kind, B> {
  readonly _tag: "Map"
  readonly kind: Kind
  readonly param: Param<Kind, A>
  readonly f: (value: A) => B
}

export interface Transform<Kind extends ParamKind, in out A, out B> extends Param<Kind, B> {
  readonly _tag: "Transform"
  readonly kind: Kind
  readonly param: Param<Kind, A>
  readonly f: (parse: Parse<A>) => Parse<B>
}

export interface Optional<Kind extends ParamKind, A> extends Param<Kind, Option.Option<A>> {
  readonly _tag: "Optional"
  readonly kind: Kind
  readonly param: Param<Kind, A>
}

export interface Variadic<Kind extends ParamKind, A> extends Param<Kind, ReadonlyArray<A>> {
  readonly _tag: "Variadic"
  readonly kind: Kind
  readonly param: Param<Kind, A>
  readonly min: Option.Option<number>
  readonly max: Option.Option<number>
}

export type AnyParam<Kind extends ParamKind, A> =
  | Single<Kind, A>
  | Map<Kind, any, A>
  | Transform<Kind, any, A>
  | Optional<Kind, A>
  | Variadic<Kind, A>
