/**
 * ORIGINAL TypeScript from 02-inference-at-scale/tanstack-router/packages/react-router/src/typePrimitives.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type AnyRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Constrain<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferMaskFrom<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferMaskTo<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferSelected<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferShouldThrow<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferStrict<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type InferTo<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type LinkComponentProps<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type ReadonlyArray<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type RegisteredRouter<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseParamsOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type UseSearchOptions<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type ValidateLinkOptions<
  TRouter extends AnyRouter = RegisteredRouter,
  TOptions = unknown,
  TDefaultFrom extends string = string,
  TComp = 'a',
> = Constrain<
  TOptions,
  LinkComponentProps<
    TComp,
    TRouter,
    InferFrom<TOptions, TDefaultFrom>,
    InferTo<TOptions>,
    InferMaskFrom<TOptions>,
    InferMaskTo<TOptions>
  >
>

export type InferStructuralSharing<TOptions> = TOptions extends {
  structuralSharing: infer TStructuralSharing
}
  ? TStructuralSharing
  : unknown

export type ValidateUseSearchOptions<
  TOptions,
  TRouter extends AnyRouter = RegisteredRouter,
> = Constrain<
  TOptions,
  UseSearchOptions<
    TRouter,
    InferFrom<TOptions>,
    InferStrict<TOptions>,
    InferShouldThrow<TOptions>,
    InferSelected<TOptions>,
    InferStructuralSharing<TOptions>
  >
>

export type ValidateUseParamsOptions<
  TOptions,
  TRouter extends AnyRouter = RegisteredRouter,
> = Constrain<
  TOptions,
  UseParamsOptions<
    TRouter,
    InferFrom<TOptions>,
    InferStrict<TOptions>,
    InferShouldThrow<TOptions>,
    InferSelected<TOptions>,
    InferSelected<TOptions>
  >
>

export type ValidateLinkOptionsArray<
  TRouter extends AnyRouter = RegisteredRouter,
  TOptions extends ReadonlyArray<any> = ReadonlyArray<unknown>,
  TDefaultFrom extends string = string,
  TComp = 'a',
> = {
  [K in keyof TOptions]: ValidateLinkOptions<
    TRouter,
    TOptions[K],
    TDefaultFrom,
    TComp
  >
}
