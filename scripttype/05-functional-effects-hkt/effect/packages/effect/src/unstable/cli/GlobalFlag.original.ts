/**
 * ORIGINAL TypeScript from 05-functional-effects-hkt/effect/packages/effect/src/unstable/cli/GlobalFlag.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type BuiltIns<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Command<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Effect<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Flag<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type Identifier<Id extends string> = `effect/unstable/cli/GlobalFlag/${Id}`

export type BuiltIn = typeof BuiltIns[number]

export interface HandlerContext {
  readonly command: Command.Command.Any
  readonly commandPath: ReadonlyArray<string>
  readonly version: string
  readonly builtIns: ReadonlyArray<BuiltIn>
}

export interface Action<A> {
  readonly _tag: "Action"
  readonly flag: Flag.Flag<A>
  readonly run: (
    value: A,
    context: HandlerContext
  ) => Effect.Effect<void>
}

export interface Setting<Id extends string, A> extends Context.Service<Setting.Identifier<Id>, A> {
  readonly _tag: "Setting"
  readonly id: Id
  readonly flag: Flag.Flag<A>
}

export type GlobalFlag<A> = Action<A> | Setting<any, A>
