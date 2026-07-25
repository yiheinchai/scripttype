/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cli/Command.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type GlobalFlag<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type NonEmptyReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Param<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Simplify<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export interface Config {
    readonly [key: string]:
      | Param.Param<Param.ParamKind, any>
      | ReadonlyArray<Param.Param<Param.ParamKind, any> | Config>
      | Config
  }

export type InferValue<A> = A extends ReadonlyArray<any> ? { readonly [Key in keyof A]: InferValue<A[Key]> }
      : A extends Param.Param<infer _Kind, infer _Value> ? _Value
      : A extends Config ? Infer<A>
      : never

export type Infer<A extends Config> = Simplify<
      { readonly [Key in keyof A]: InferValue<A[Key]> }
    >

export interface CommandContext<Name extends string> {
  readonly _: unique symbol
  readonly name: Name
}

export interface Command<in out Name extends string, in Input, out ContextInput = {}, out E = never, out R = never>
  extends
    Effect.Effect<
      ContextInput,
      never,
      CommandContext<Name>
    >
{
  readonly [TypeId]: Command.Variance<Input, E, R>

  /**
   * The name of the command.
   */
  readonly name: Name

  /**
   * An optional description of the command.
   */
  readonly description: string | undefined

  /**
   * An optional short description used when listing subcommands.
   */
  readonly shortDescription: string | undefined

  /**
   * An optional alias that can be used as a shorter command name.
   */
  readonly alias: string | undefined

  /**
   * Optional usage examples for the command.
   */
  readonly examples: ReadonlyArray<Command.Example>

  /**
   * The subcommands available under this command.
   */
  readonly subcommands: ReadonlyArray<{
    readonly group: string | undefined
    readonly commands: NonEmptyReadonlyArray<Command.Any>
  }>

  /**
   * Custom annotations associated with this command.
   */
  readonly annotations: Context.Context<never>

  /**
   * Whether this command is hidden from parent help output, shell
   * completions, and unknown-subcommand suggestions. Hidden commands still
   * parse and execute normally when invoked by exact name.
   */
  readonly hidden: boolean
}

export type Error<C> = C extends Command<
  infer _Name,
  infer _Input,
  infer _ContextInput,
  infer _Error,
  infer _Requirements
> ? _Error :
  never

export type Services<C> = C extends Command<
  infer _Name,
  infer _Input,
  infer _ContextInput,
  infer _Error,
  infer _Requirements
> ? _Requirements :
  never

export type ExtractGlobalFlagContext<T extends ReadonlyArray<GlobalFlag.GlobalFlag<any>>> = T[number] extends infer F
  ? F extends GlobalFlag.Setting<infer Id, infer _A> ? GlobalFlag.Setting.Identifier<Id>
  : never
  : never

export type ExtractSubcommand<T> = T extends Command<infer _Name, infer _Input, infer _CI, infer _E, infer _R> ? T
  : T extends Command.SubcommandGroup<infer Commands> ? Commands[number]
  : never

export type ExtractSubcommandErrors<T extends ReadonlyArray<Command.SubcommandEntry>> = Error<ExtractSubcommand<T[number]>>

export type ExtractSubcommandContext<T extends ReadonlyArray<Command.SubcommandEntry>> = Services<ExtractSubcommand<T[number]>>
